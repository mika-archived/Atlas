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
  private storageId: string;

  public constructor(file: File) {
    this.file = file;
    this.currentState = UploadState.QUEUED;
    this.storageId = "";
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

  public asBlob(): string {
    return URL.createObjectURL(this.file);
  }

  public async asBase64(): Promise<string> {
    return await encode(this.file);
  }

  public markAs(state: UploadState, id?: string): void {
    this.currentState = state;
    this.storageId = id || "";
  }
}
