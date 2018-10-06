import { IImage } from "../shared/types";

export interface IImageExtends extends IImage {
  signedUrl: string;
}
