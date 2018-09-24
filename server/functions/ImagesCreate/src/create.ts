import { APIGatewayEvent } from "aws-lambda";
import { DynamoDB, S3 } from "aws-sdk";
import * as fs from "fs";
import * as im from "imagemagick";
import { v4 as uuid } from 'uuid';

import { createResponse } from "@/response";

const regex = new RegExp(/data:image\/([a-z]+);base64,(.*)/);

function resize(options: any): Promise<any> {
  return new Promise((resolve, reject) => {
    im.resize(options, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
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

  // write to tmp directory
  const srcPath = `/tmp/${uuid()}.${extension}`;
  const buffer = new Buffer(matches[2], "base64");
  fs.writeFileSync(srcPath, buffer);

  // resize image (max 350x350)
  const args = {
    srcPath,
    dstPath: `/tmp/${storageId}.${extension}`,
    height: 350,
    width: 350,
    customArgs: [
      "-auto-orient",
      "-limit memory 96MB",
      "-limit disk 0"
    ]
  };

  await resize(args);

  const img = new Buffer(fs.readFileSync(args.dstPath)).toString("base64");
  try {
    fs.unlinkSync(args.dstPath);
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