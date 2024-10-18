// uppy.d.ts

import Uppy from "@uppy/core";

declare module "@uppy/core" {
  export interface UppyFile<TMeta = {}, TBody = {}> {
    id: string;
    name: string;
    type?: string;
    data: Blob | File;
    meta: TMeta;
    progress?: {
      percentage: number;
      bytesUploaded: number;
      bytesTotal: number;
    };
    size?: number;
    isRemote: boolean;
    remote?: {
      host: string;
      url: string;
      body?: TBody;
    };
  }

  export interface UploadResponse<TBody = {}> {
    body: TBody;
    status: number;
    bytesUploaded?: number;
    uploadURL?: string;
  }
}
