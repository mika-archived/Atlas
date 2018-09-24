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