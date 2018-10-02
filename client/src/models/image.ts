import { firestore } from "firebase";

import { IUser } from "./user";

export interface IImage {
  // Image ID
  id: string;

  // reference to user
  user: IUser | firestore.DocumentReference;

  // access restrict
  restrict: "private" | "limited" | "registered" | "public";

  // attributes
  attributes: string[];

  // array of user id
  limited: string[];

  // unix timestamp (msec)
  timestamp: number;

  // schema version
  version: "1";
}