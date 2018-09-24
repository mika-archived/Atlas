import { APIGatewayEvent } from "aws-lambda";
import { DynamoDB, S3 } from "aws-sdk";
import * as fs from "fs";
import * as gm from "gm";
import { v4 as uuid } from 'uuid';

import { createResponse } from "@/response";

const im = gm.subClass({ imageMagick: true });

const regex = new RegExp(/data:image\/([a-z]+);base64,(.*)/);

function resize(filename: string, buffer: Buffer, options: gm.ResizeOption): Promise<void> {
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

exports.handler = async (event: APIGatewayEvent) => {
  const { base64Image, ...json } = JSON.parse(event.body as string);
  if (!base64Image) {
    return createResponse(400, { message: "Invalid Arguments" });
  }

  const matches = regex.exec(base64Image);
  if (!matches) {
    return createResponse(400, { message: "Unknown format" });
  }

  const extension = matches[1];
  const storageId = uuid();

  // resize image (max 350x350)
  const destTo = `/tmp/${storageId}.${extension}`
  await resize(destTo, new Buffer(matches[2], "base64"), {} as gm.ResizeOption);

  const img = new Buffer(fs.readFileSync(destTo)).toString("base64");
  try {
    fs.unlinkSync(destTo);
  } catch {
    // ignore
  }

  return createResponse(200, {
    storageId,
    base64Encoded: img
  });

  // retrieve
  /*
  const { allowed, attributes, restrict } = json;

  return createResponse(200, {
    storageId,
  });
  */
};