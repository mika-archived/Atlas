import { APIGatewayEvent } from "aws-lambda";

import { IResponse } from "../shared/types";

exports.handler = async (event: APIGatewayEvent) => {
  const response = {
    body: JSON.stringify({
      message: ["ok"]
    }),
    headers: {
      "access-control-allow-credentials": "true",
      "access-control-allow-origin": "*"
    },
    statusCode: 200,
  } as IResponse;

  return response;
};