import { DynamoDB } from "aws-sdk";
import { CognitoUserPoolTriggerEvent, Context, Callback } from "aws-lambda";

import { TableName } from "@/constants";
import { createUserPrimary, createUser } from "@/records";
import { createResponse } from "@/utils";

const client = new DynamoDB.DocumentClient();

exports.handler = async (event: CognitoUserPoolTriggerEvent, context: Context, callback: Callback) => {
  if (!event.userName) {
    callback("Missing argument: userName", event);
    return;
  }
  const params = {
    TableName,
    Item: createUser({
      userId: event.request.userAttributes.sub,
      username: event.userName,
    })
  } as DynamoDB.DocumentClient.PutItemInput;

  await client.put(params).promise();

  callback(null, event);
};