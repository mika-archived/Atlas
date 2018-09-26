import { DynamoDB } from "aws-sdk";
import { APIGatewayEvent, Context } from "aws-lambda";

import { TableName } from "@/constants";
import { createUserPrimary } from "@/records";
import { createResponse, retrieveUserId, timestamp } from "@/utils";

const client = new DynamoDB.DocumentClient();

exports.handler = async (event: APIGatewayEvent, context: Context) => {
  const params = {
    TableName,
    Key: createUserPrimary({ userId: retrieveUserId(event) }),
    ExpressionAttributeValues: {
      ":cognitoIdentityId": event.requestContext.identity.cognitoIdentityId,
    },
    UpdateExpression: "SET cognitoIdentityId = :cognitoIdentityId"
  } as DynamoDB.DocumentClient.UpdateItemInput;

  await client.update(params).promise();

  return createResponse(200, { status: "ok" });
};