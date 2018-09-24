import { APIGatewayEvent } from "aws-lambda";

import { IResponse } from "@/types";

exports.handler = async (event: APIGatewayEvent) => {
  const response = {
    body: JSON.stringify({
      versions: ["v1"]
    }),
    headers: {
      "access-control-allow-credentials": "true",
      "access-control-allow-origin": "*"
    },
    statusCode: 200,
  } as IResponse;

  return response;
};