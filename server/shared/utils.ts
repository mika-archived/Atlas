import { APIGatewayEvent } from "aws-lambda";
import jsSHA from "jssha";

import { IResponse } from "@/types";

export function createResponse(statusCode: number, body: any): IResponse {
  return {
    body: JSON.stringify(body),
    statusCode,
    headers: {
      "access-control-allow-credentials": "true",
      "access-control-allow-origin": "*"
    }
  } as IResponse;
}

export function retrieveUserId(event: APIGatewayEvent): string {
  const provider = event.requestContext.identity.cognitoAuthenticationProvider;
  if (provider === null) {
    throw "Missing argument: event.requestContext.identity.cognitoAuthenticationProvider";
  }
  if (/CognitoSignIn:(.+)/.test(provider)) {
    const matches = provider.match(/CognitoSignIn:(.+)/);
    if (matches) {
      return matches[1];
    }
  }
  throw `Invalid authentication provider: ${provider}`;
}

export function createPrimaryKey(user?: string, storage?: string): string {
  if (user === null && storage === null) {
    throw "Missing argument: user or storage is required";
  }

  const sha = new jsSHA("SHA-512", "TEXT");

  if (user && storage) {

  } else if (user) {

  } else if (storage) {

  }
  //
}