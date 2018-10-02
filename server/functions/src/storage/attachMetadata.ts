import { storage } from "firebase-admin";
import * as functions from "firebase-functions";

import "../bootstrap/initializeFirebase";

import { BUCKET_NAME } from "../shared/constants";
import { skip } from "../shared/logger";

export const attachMetadata = functions.storage.bucket(BUCKET_NAME).object().onFinalize(async obj => {
  if (!obj.name) {
    skip("Name is empty");
    return;
  }

  const ref = await storage().bucket(BUCKET_NAME).file(obj.name);

  await ref.setMetadata({
    cacheControl: "private, max-age=2592000",
  });
});
