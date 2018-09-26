import { APIGatewayEvent } from "aws-lambda";

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

export function timestamp(): number {
  return new Date().getTime();
}