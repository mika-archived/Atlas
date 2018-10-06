import axios, { AxiosAdapter } from "axios";
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from "axios-extensions";
import { auth } from "firebase";

import { IApiResponse, IMediaResponse } from "../shared/types";

export async function fetchImageData(id: string, size: string): Promise<string> {
  const jwt = await (auth().currentUser as firebase.User).getIdToken();
  const res = await axios.get(`https://storage.atlas.mochizuki.moe/media/${id}/${size}`, {
    responseType: "json",
    headers: {
      Authorization: `Bearer ${jwt}`
    },
    adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter)
  });

  return (res.data as IApiResponse<IMediaResponse>).body.signedUrl;
}
