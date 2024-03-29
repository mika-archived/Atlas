import { v4 as uuid } from "uuid";

import { encode } from "./base64";
import { resizeSquare } from "./utils";

export enum UploadState {
  QUEUED,

  UPLOADING,

  UPLOADED,

  FAILED,
}

export class FileWrapper {
  private file: File;
  private currentState: UploadState;
  private storageId: string;

  public constructor(file: File) {
    this.file = file;
    this.currentState = UploadState.QUEUED;
    this.storageId = uuid();
  }

  public get name(): string {
    return this.file.name;
  }

  public get state(): UploadState {
    return this.currentState;
  }

  public get id(): string {
    return this.storageId;
  }

  public get mime(): string {
    return this.file.type;
  }

  public asBlob(): string {
    return URL.createObjectURL(this.file);
  }

  public asFile(): File {
    return this.file;
  }

  public async asBase64(): Promise<string> {
    return await encode(this.file);
  }

  public asSquare(to: number): Promise<Blob> {
    return new Promise<Blob>(async (resolve, reject) => {
      const parent = this;
      const canvas = document.createElement("canvas") as HTMLCanvasElement;
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;
      const image = new Image();
      image.onload = function(this: HTMLElement, e: Event) {
        const self = this as HTMLImageElement;
        const { width, height } = resizeSquare({ width: self.width, height: self.height }, to);
        if (width >= self.width && height >= self.height) {
          // When resized image's size equals or greater than original size, don't encoding
          return resolve(parent.asFile() as Blob);
        }
        canvas.width = width;
        canvas.height = height;
        context.drawImage(self, 0, 0, self.width, self.height, 0, 0, width, height);

        canvas.toBlob(blob => {
          if (blob == null) {
            reject();
          } else {
            resolve(blob);
          }
        }, parent.mime);
      };
      image.src = await this.asBase64();
    });
  }

  public markAs(state: UploadState): void {
    this.currentState = state;
  }
}
