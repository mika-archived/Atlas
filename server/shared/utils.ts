import { APIGatewayEvent } from "aws-lambda";
import jsSHA from "jssha";

import { IPrimaryKeySeeds, IResponse } from "@/types";

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

export function createPrimaryKey(seeds: IPrimaryKeySeeds): string {
  if (seeds == null) {
    throw "Missing argument: seed is required";
  }

  const sha = new jsSHA("SHA-512", "TEXT");
  const variables: string[] = [];

  if (seeds.user) {
    variables.push(`USER=${seeds.user}`);
  }
  if (seeds.storage) {
    variables.push(`STORAGE=${seeds.storage}`);
  }
  if (variables.length === 0) {
    throw "Invalid argument: least one argument required";
  }

  sha.update(variables.join(","));
  return sha.getHash("HEX");
}

