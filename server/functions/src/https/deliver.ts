/*
 * Image Delivery API with User Authentication
 * https://storage.atlas.mochizuki.moe/media/:id/:size
 *
 */
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { auth, firestore, storage } from "firebase-admin";
import * as functions from "firebase-functions";
import moment from "moment";

import "../bootstrap/initializeFirebase";

import { BUCKET_NAME, DATE_FORMAT } from "../constants";
import { sizes } from "../shared/size";
import { IErrorResponse, IImage } from "../shared/types";
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

const corsConfig: cors.CorsOptions = {
  origin: "*",
  maxAge: 36000,
  credentials: true
};

// Cloud Functions response has 10MB limit.
const ACCEPTS: string[] = sizes.filter(w => w.size * w.size * 4 <= (1024 * 1024 * 9)).map(w => w.name);

app.options("*", cors(corsConfig));

app.get("/media/:id/:size", cors(corsConfig), cookieParser(), validateAuth, async (req, res) => {
  const { id, size }: { id: string, size: string } = req.params;

  if (!id || !size) {
    error("Missing URL parameters: id or size");
    createApiResponse<IErrorResponse>(res, 400, { message: "Missing parameters." });
    return;
  }

  if (!ACCEPTS.includes(size)) {
    error("Invalid arguments: size");
    createApiResponse<IErrorResponse>(res, 400, { message: "Invalid parameters." });
    return;
  }

  const user = (req as any).user as auth.DecodedIdToken;

  try {
    const snapshot = await firestore().collection("images").doc(id).get();
    const metadata = snapshot.data() as IImage;
    const ownerUid = (metadata.user as firestore.DocumentReference).path.substring("users/".length);

    let condition = false;
    switch (metadata.restrict) {
      case "private":
        condition = user.uid === ownerUid;
        break;

      case "limited":
        condition = metadata.limited.includes(user.uid);
        break;

      case "registered":
        condition = user.uid != null;
        break;

      case "public":
        condition = true;
        break;
    }

    if (!condition) {
      error(`Invalid access restrict for user: ${user.uid}`);
      createApiResponse<IErrorResponse>(res, 403, { message: "Access Forbidden" });
      return;
    }

    const path = `/${ownerUid}/${metadata.restrict}/${metadata.id}/${size}`;
    const file = await storage().bucket(BUCKET_NAME).file(path);
    const [meta, ..._] = await file.getMetadata();

    const expire = moment().add(7, "days");
    res.contentType(meta.contentType as string)
      .header("Cache-Control", `private; max-age=${60 * 60 * 24 * 7}`)
      .header("Expires", expire.format(DATE_FORMAT) + " GMT"); // Mon, 08 Oct 2018 04:23:11

    // Additional headers for cache
    if (meta.etag) {
      if (req.headers["if-none-match"] && req.headers["if-none-match"] === meta.etag) {
        console.debug("This request has if-none-match header and available browser cache, return 304");
        res.status(304).send();
        return;
      }
      res.header("ETag", meta.etag);
    }

    if (meta.updated) {
      const modifiedAt = moment(meta.updated).format(DATE_FORMAT) + " GMT";
      if (req.headers["if-modified-since"] && req.headers["if-modified-since"] === modifiedAt) {
        console.debug("This request has if-modified-since header and available browser cache, return 304");
        res.status(304).send();
        return;
      }
      res.header("Last-Modified", modifiedAt);
    }

    console.log("This request cannot available browser cache, return full response with 200");
    res.status(200);

    const stream = file.createReadStream();
    stream.pipe(res);
  } catch (err) {
    error(err);
    createApiResponse<IErrorResponse>(res, 403, { message: "Access Forbidden" });
  }
});

export const deliver = functions.https.onRequest(app);
