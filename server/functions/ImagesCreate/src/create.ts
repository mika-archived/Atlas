import { APIGatewayEvent, Context } from "aws-lambda";
import { DynamoDB, S3 } from "aws-sdk";
import * as fs from "fs";
import * as gm from "gm";
import { v4 as uuid } from 'uuid';

import { createResponse } from "@/response";

const im = gm.subClass({ imageMagick: true });

const regex = new RegExp(/data:image\/([a-z]+);base64,(.*)/);

function resize(filename: string, buffer: Buffer): Promise<void> {
  return new Promise((resolve, reject) => {
    im(buffer)
      .limit("memory", "96MB")
      .limit("disk", "0")
      .autoOrient()
      .resize(350, 350)
      .write(filename, (err, stdout, stderr, cmd) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });
}

function putObject(params: S3.PutObjectRequest): Promise<void> {
  return new Promise((resolve, reject) => {
    const s3 = new S3();
    s3.putObject(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

exports.handler = async (event: APIGatewayEvent, context: Context) => {
  const { base64Image, ...json } = JSON.parse(event.body as string);
  if (!base64Image) {
    return createResponse(400, { message: "Invalid Arguments" });
  }

  const matches = regex.exec(base64Image);
  if (!matches) {
    return createResponse(400, { message: "Unknown format" });
  }

  // IDs
  const storageId = uuid();
  const cognitoId = event.requestContext.identity.cognitoIdentityId;

  // Image
  const extension = matches[1];
  const original = new Buffer(matches[2], "base64");

  // save to S3 as original
  const params1 = {
    Bucket: "storage.atlas.mochizuki.moe",
    Key: `cognito/users/${cognitoId}/${storageId}/original.${extension}`,
    Body: original,
  } as S3.PutObjectRequest;
  await putObject(params1);

  // resize image (max 350x350)
  const destTo = `/tmp/${storageId}.${extension}`
  await resize(destTo, original);

  // save to S3 as thumbnail
  const params2 = {
    Bucket: "storage.atlas.mochizuki.moe",
    Key: `cognito/users/${cognitoId}/${storageId}/thumbnail.${extension}`,
    Body: new Buffer(fs.readFileSync(destTo))
  };
  await putObject(params2);

  try {
    fs.unlinkSync(destTo);
  } catch {
    // ignore
  }

  return createResponse(200, {
    storageId,
  });

  // retrieve
  /*
  const { allowed, attributes, restrict } = json;

  return createResponse(200, {
    storageId,
  });
  */
};