import { firestore, storage } from "firebase-admin";
import * as functions from "firebase-functions";
import sizeof from "image-size";
import mkdirp from "mkdirp-promise";
import path from "path";

import "../bootstrap/initializeFirebase";

import { BUCKET_NAME } from "../shared/constants";
import { skip } from "../shared/logger";
import { IImage } from "../shared/types";
import { retrieveImageIdFromBucket, retrieveUserIdFromBucket } from "../shared/utils";

export const registerImage = functions.storage.bucket(BUCKET_NAME).object().onFinalize(async obj => {
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

  // Prepare
  const dist = `/tmp/${obj.name}`;
  await mkdirp(path.dirname(dist));

  // Get image metadata
  const buffer = await storage().bucket(BUCKET_NAME).file(obj.name).download();
  const bytes = buffer[0].length;
  const dimensions = sizeof(buffer[0]);

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
    caption: "",
    version: "1",
    type: dimensions.type,
    size: bytes,
    dimensions: [dimensions.width, dimensions.height],
  } as IImage);
});
