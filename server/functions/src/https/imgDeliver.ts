import cors from "cors";
import express, { Request, Response } from "express";
import { auth, firestore, storage } from "firebase-admin";
import * as functions from "firebase-functions";
import moment from "moment";

import "../bootstrap/initializeFirebase";

import { BUCKET_NAME } from "../constants";
import { IErrorResponse, IImage, IMediaResponse } from "../shared/types";
import { error, skip } from "../utils/logger";
import { createApiResponse } from "../utils/response";

const app = express();

function checkAuthorizationHeader(req: Request): boolean {
  return (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) as boolean;
}

function checkCookie(req: Request): boolean {
  return (req.cookies && req.cookies.__session);
}

const validateAuth = async (req: Request, res: Response, next: () => void) => {
  // Validate Authentication Headers
  if (!checkAuthorizationHeader(req) && !checkCookie(req)) {
    skip("No Firebase ID token was passed as Bearer token in the Authorization header or __session cookie");
  }

  let token;
  if (checkAuthorizationHeader(req)) {
    token = (req.headers.authorization as string).split("Bearer ")[1];
  } else if (checkCookie(req)) {
    token = req.cookies.__session;
  }

  try {
    const user = await auth().verifyIdToken(token);
    (req as any).user = user;
  } catch (err) {
    skip("Invalid Firebase ID token");
  }
  return next();
};

app.use(validateAuth);

app.options("*", cors({ origin: "*", maxAge: 36000 }));
app.get("/media/:id/:size", cors({ origin: "*", maxAge: 36000 }), async (req, res) => {
  const id = req.params.id as string;
  const size = req.params.size as string;
  const user = (req as any).user as auth.DecodedIdToken;

  if (!id || !size) {
    error(`Missing arguments id or size`);
    createApiResponse<IErrorResponse>(res, 404, { message: "Invalid Request." });
    return;
  }

  // Get metadata
  try {
    const snapshot = await firestore().collection("images").doc(id).get();
    const metadata = snapshot.data() as IImage;
    const owneruid = (metadata.user as firestore.DocumentReference).path.substring("users/".length);

    let condition = false;
    switch (metadata.restrict) {
      case "private":
        condition = user.uid === owneruid;
        break;

      case "limited":
        condition = metadata.limited.includes(user.uid);
        break;

      case "registered":
        condition = user != null;
        break;

      case "public":
        condition = true;
        break;
    }

    if (!condition) {
      // logging
      error(`Invalid access restrict for user: ${metadata.restrict}`);
      createApiResponse<IErrorResponse>(res, 404, { message: "Could not found request media." });
      return;
    }

    const path = `/${owneruid}/${metadata.restrict}/${metadata.id}/${size}`;
    const ref = await storage().bucket(BUCKET_NAME).file(path);

    const expiredAt = moment().add(15, "seconds").toString();
    const url = await ref.getSignedUrl({
      action: "read",
      expires: expiredAt,
    });

    createApiResponse<IMediaResponse>(res, 200, { signedUrl: url[0], expiredAt });
  } catch (err) {
    console.error(err);
    createApiResponse<IErrorResponse>(res, 404, { message: "Could not found request media." });
  }
});

export const imgDeliver = functions.https.onRequest(app);
