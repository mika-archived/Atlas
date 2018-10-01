import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";

import { IUser } from "../shared/types";

export const createUser = functions.auth.user().onCreate(async user => {
  // create a new user on firestore
  const docRef = firestore().collection("users").doc(user.uid);
  await docRef.set({
    id: user.uid,
    username: user.displayName,
    icon: user.photoURL,
    version: "1"
  } as IUser);
});
