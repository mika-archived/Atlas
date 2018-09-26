import { APIGatewayEvent } from "aws-lambda";

import { createResponse } from "@/utils";

exports.handler = async (event: APIGatewayEvent) => {
  return createResponse(200, { versions: ["v1"] });
};