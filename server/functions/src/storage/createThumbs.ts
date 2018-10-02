import { firestore, storage } from "firebase-admin";
import * as functions from "firebase-functions";
import * as fs from "fs";
import * as gm from "gm";
import * as path from "path";

import "../bootstrap/initializeFirebase";

import { BUCKET_NAME } from "../shared/constants";
import { error, skip } from "../shared/logger";
import { IImage } from "../shared/types";
import { retrieveImageIdFromBucket, retrieveUserIdFromBucket } from "../shared/utils";

interface Size {
  width: number;
  height: number;
}

interface Thumbnail {
  size: Size;
  name: string;
}

const im = gm.subClass({ imageMagick: true });
const thumbnails: Thumbnail[] = [
  { size: { width: 350, height: 350 }, name: "square350" },
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
    skip("ContentType or Name is empty");
    return;
  }

  // Is this a image?
  if (!obj.contentType.startsWith("image/")) {
    skip("ContentType is not started with `image/`");
    return;
  }

  // Generated thumbnails?
  if (!obj.name.endsWith("master")) {
    skip("This is a generated object");
    return;
  }

  const masterName = obj.name; // this is a "master" file.
  const bucketName = path.dirname(masterName);

  // Download master file
  const buffer = await storage().bucket(BUCKET_NAME).file(masterName).download();

  for (const thumb of thumbnails) {
    try {
      const dest = path.normalize(`/tmp/${thumb.name}`);
      await resize(buffer[0], `/tmp/${thumb.name}`, thumb.size);

      await storage().bucket(BUCKET_NAME).upload(dest, {
        destination: path.normalize(`/${bucketName}/${thumb.name}`),
        contentType: obj.contentType,
      });
      fs.unlinkSync(dest);
    } catch (err) {
      error(err);
    }
  }

  // Write to firestore
  const imageId = retrieveImageIdFromBucket(obj);
  const userId = retrieveUserIdFromBucket(obj);
  const userRef = firestore().collection("users").doc(userId);

  await firestore().collection("images").doc(imageId).set({
    id: imageId,
    user: userRef,
    restrict: "private",
    attributes: [],
    limited: [],
    timestamp: new Date().getTime(),
    version: "1",
  } as IImage);
});
