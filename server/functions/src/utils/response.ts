import { Response } from "express";

import { IApiResponse } from "../shared/types";

export function createApiResponse<T>(res: Response, code: number, body: T): void {
  res.status(code).type("application/json").send(JSON.stringify({
    code,
    body
  } as IApiResponse<T>));
}
