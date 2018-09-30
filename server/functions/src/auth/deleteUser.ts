import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";

export const deleteUser = functions.auth.user().onDelete(async user => {
  // delete user from firestore
  const docRef = firestore().collection("users").doc(user.uid);
  await docRef.delete();
});
