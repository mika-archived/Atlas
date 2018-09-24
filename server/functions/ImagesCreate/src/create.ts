import { APIGatewayEvent } from "aws-lambda";
import { DynamoDB, S3 } from "aws-sdk";
import { resize } from "imagemagick";
import { v4 as uuid } from 'uuid';

import { createResponse } from "@/response";

exports.handler = async (event: APIGatewayEvent) => {
  const json = JSON.parse(event.body as string);
  if (!json.image) {
    return createResponse(400, { message: "Invalid Arguments" });
  }

  // retrieve
  const { allowed, attributes, restrict } = json;
  const storageId = uuid();

  return createResponse(200, {
    storageId,
  });
};