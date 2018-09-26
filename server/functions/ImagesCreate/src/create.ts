import { APIGatewayEvent, Context } from "aws-lambda";
import { S3 } from "aws-sdk";
import * as fs from "fs";
import * as gm from "gm";
import { v4 as uuid } from 'uuid';

import { Bucket } from "@/constants";
import { createResponse } from "@/utils";

const s3 = new S3();
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
    Bucket,
    Key: `private/${cognitoId}/${storageId}/original.${extension}`,
    Body: original,
  } as S3.PutObjectRequest;
  await s3.putObject(params1).promise();

  // resize image (max 350x350)
  const destTo = `/tmp/${storageId}.${extension}`
  await resize(destTo, original);

  // save to S3 as thumbnail
  const params2 = {
    Bucket,
    Key: `private/${cognitoId}/${storageId}/thumbnail.${extension}`,
    Body: new Buffer(fs.readFileSync(destTo))
  };
  await s3.putObject(params2).promise();

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