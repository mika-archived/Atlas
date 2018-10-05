import * as functions from "firebase-functions";
import * as path from "path";

export function retrieveImageIdFromBucket(object: functions.storage.ObjectMetadata): string {
  if (object.name) {
    return object.name.split(path.sep)[2];
  }
  if (object.id) {
    return object.id.split(path.sep)[3];
  }
  throw new Error("Invalid Bucket");
}

export function retrieveUserIdFromBucket(object: functions.storage.ObjectMetadata): string {
  if (object.name) {
    return object.name.split(path.sep)[0];
  }
  if (object.id) {
    return object.id.split(path.sep)[1];
  }
  throw new Error("Invalid Bucket");
}
