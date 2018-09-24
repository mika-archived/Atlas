import { APIGatewayEvent } from "aws-lambda";
import { DynamoDB, S3 } from "aws-sdk";
import { resize } from "imagemagick";
import { v4 as uuid } from 'uuid';//import uuidv4 = require("uuid/v4");

import { IResponse } from "@/types";


function createResponse(statusCode: number, body: any): IResponse {
  return {
    body,
    statusCode,
    headers: {
      "access-control-allow-credentials": "true",
      "access-control-allow-origin": "*"
    }
  } as IResponse;
}

exports.handler = async (event: APIGatewayEvent) => {
  const json = JSON.parse(event.body as string);
  if (!json.image) {
    return createResponse(400, { message: "Invalid Arguments" });
  }

  // retrieve
  const { allowed, attributes, restrict } = json;
  const storageId = uuid();

  // Generate UUID as Storage ID
  return createResponse(200, {
    storageId
  });
};