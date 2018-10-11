/*
 * Create a Progressive JPEG thumbnail for user experience.
 */
import { firestore, storage } from "firebase-admin";
import * as functions from "firebase-functions";
import fs from "fs";
import gm from "gm";
import mkdirp from "mkdirp-promise";
import { dirname } from "path";

import "../bootstrap/initializeFirebase";

import { BUCKET_NAME } from "../constants";
import { sizes } from "../shared/size";
import { IImage, IProgressiveThumbnails, IUser } from "../shared/types";

const im = gm.subClass({ imageMagick: true });

function isValid(name: string) {
  const size = sizes.filter(w => w.name === name)[0].size;
  return size * size * 4 <= 1024 * 1024 * 10; // smaller than 10MB
}

async function convert(src: string, dest: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    im(src).interlace("line").setFormat("JPEG").write(dest, err => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    });
  });
}

export const createProgJpeg = functions.firestore.document("images/{imageId}").onCreate(async doc => {
  const data = await doc.data() as IImage;
  const { id } = data;
  const user = (await (data.user as firestore.DocumentReference).get()).data() as IUser;

  // Prepare
  const basePath = `${user.id}/private/${id}/`;

  for (const thumbnail of sizes.filter(w => w.post)) {
    if (!isValid(thumbnail.name)) {
      return; // skip master
    }

    try {
      const path = `${basePath}${thumbnail.name}`;
      const src = `/tmp/${path}`;
      const dest = `${src}_pr0`;
      await mkdirp(dirname(src));

      const ref = storage().bucket(BUCKET_NAME).file(path);
      const buffer = await ref.download();
      fs.writeFileSync(src, buffer[0]);

      await convert(src, dest);

      await storage().bucket(BUCKET_NAME).upload(dest, {
        destination: `/${path}_pr0`,
        contentType: "image/jpeg"
      });

      const pts: IProgressiveThumbnails = {};
      (pts as any)[thumbnail.name] = true;

      fs.unlinkSync(src);
    } catch (err) {
      console.warn(err);
      throw new Error(err);
    }

    await doc.ref.update({
      thumbnails: {
        small: true,
        xlarge: true
      }
    } as IImage);
  }
});
