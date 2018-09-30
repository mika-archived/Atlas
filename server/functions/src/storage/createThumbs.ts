import { storage } from "firebase-admin";
import * as functions from "firebase-functions";
import * as fs from "fs";
import * as gm from "gm";
import * as path from "path";

import { BUCKET_NAME } from "../shared/constants";
import "../shared/initializeFirebase";

interface Size {
  width: number;
  height: number;
}

interface Thumbnail {
  size: Size;
  suffix: string;
}

const im = gm.subClass({ imageMagick: true });
const thumbnails: Thumbnail[] = [
  { size: { width: 350, height: 350 }, suffix: "square350" },
];

function resize(src: Buffer, dest: string, size: Size): Promise<void> {
  return new Promise((resolve, reject) => {
    im(src)
      .limit("memory", "192MB")
      .limit("disk", "0")
      .autoOrient()
      .resize(size.width, size.height)
      .write(dest, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });
}

export const createThumbs = functions.storage.bucket(BUCKET_NAME).object().onFinalize(async obj => {
  // Validate
  if (!obj.contentType || !obj.name) {
    return;
  }

  // Is this a image?
  if (!obj.contentType.startsWith("image/")) {
    return;
  }

  // Generated thumbnails?
  if (!obj.name.endsWith("master")) {
    return;
  }

  const masterName = obj.name; // this is a "master" file.
  const bucketName = path.dirname(masterName);
  const objectName = path.basename(masterName);

  // Download master file
  const buffer = await storage().bucket(BUCKET_NAME).file(masterName).download();

  for (const thumb of thumbnails) {
    const dest = path.normalize(`/tmp/${objectName}_${thumb.suffix}`);
    await resize(buffer[0], `/tmp/${objectName}_${thumb.suffix}`, thumb.size);

    await storage().bucket(BUCKET_NAME).upload(dest, {
      destination: path.normalize(`/${bucketName}/${objectName}_${thumb.suffix}`),
      contentType: obj.contentType,
    });
    fs.unlinkSync(dest);
  }
});
