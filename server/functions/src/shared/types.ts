import { firestore } from "firebase-admin";

export interface IUser {
  // uid
  id?: string;

  // display username (In first, auto filled by SSO provider)
  username: string;

  // icon url
  icon: string;

  // schema version
  version: "1";
}

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

  // content type (PNG, JPEG, BMP, GIF, WEBP)
  type?: string;

  // filesize
  size?: number;

  // dimensions (x, y)
  dimensions?: [number, number];

  // caption
  caption: string;

  // schema version
  version: "1";
}
