import { encode } from "@/models/base64";

export enum UploadState {
  QUEUED,

  UPLOADING,

  UPLOADED,

  FAILED,
}

export class FileWrapper {
  private file: File;
  private currentState: UploadState;

  public constructor(file: File) {
    this.file = file;
    this.currentState = UploadState.QUEUED;
  }

  public get name(): string {
    return this.file.name;
  }

  public get state(): UploadState {
    return this.currentState;
  }

  public asBlob(): string {
    return URL.createObjectURL(this.file);
  }

  public async asBase64(): Promise<string> {
    return await encode(this.file);
  }

  public markAs(state: UploadState): void {
    this.currentState = state;
  }
}
