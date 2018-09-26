import * as http from "http";

export interface IResponse {
  statusCode: number;
  body: any; // Buffer, string, stream.Readable, or a plain object if `json` was truthy
  headers: http.IncomingHttpHeaders;
}

export interface IPrimaryKeySeeds {
  user: string;
  storage: string;
}

