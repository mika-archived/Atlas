import Vue from "vue";
import { RawLocation, Route as VueRouterRoute } from "vue-router";

import { IImagesState } from "../store/images";
import { ISessionState } from "../store/session";
import { IUploaderState } from "../store/uploader";

//
// Define types
//

export interface ISize {
  width: number;
  height: number;
}

// store's state
export interface IState {
  images: IImagesState;
  session: ISessionState;
  uploader: IUploaderState;
}

// generic
export type Nullable<T> = T | null;

// vuex action
export type ActionDescriber<T = void> = (payload?: T) => void | Promise<void>;

// vue-router hooks
export type Route = VueRouterRoute;
export type NextFunc<T extends Vue = Vue> = (to?: RawLocation | false | ((vm: T) => any) | void) => void;
