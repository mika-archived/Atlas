export type Restrict = "private" | "limited" | "registered" | "public";

export interface IUser {
  // User ID
  id: string;

  // display username (In first, auto filled by SSO provider)
  username: string;

  // icon url
  icon: string;

  // schema version
  version: "1";
}

export interface IProgressiveThumbnails {
  small?: boolean;
  xlarge?: boolean;
}

export interface IImage {
  // Image ID
  id: string;

  // reference to user
  user: IUser | any;

  // access restrict
  restrict: Restrict;

  // attributes
  attributes: string[];

  // array of user id
  limited: string[];

  // unix timestamp (msec)
  timestamp: number;

  // content type (PNG, JPEG, BMP, GIF, WEBP)
  type?: string;

  // filesize
  size?: number;

  // dimensions (x, y)
  dimensions?: [number, number];

  // title
  title?: string;

  // caption
  caption?: string;

  // progressive thumbnails
  thumbnails?: IProgressiveThumbnails;

  // schema version
  version: "1";
}

export interface IApiResponse<T> {
  code: number;
  body: T;
}

export interface IErrorResponse {
  message: string;
}

export interface IMediaResponse {
  signedUrl: string;
  expiredAt: string;
}
