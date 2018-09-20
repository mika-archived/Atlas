import Vue from "vue";
import { RawLocation, Route as VueRouterRoute } from "vue-router";

import { ISessionState } from "@/store/session";

//
// Define types
//

// store's state
export interface IState {
  session: ISessionState;
}

// generic
export type Nullable<T> = T | null;

// vuex action
export type ActionDescriber<T> = (payload: T) => void | Promise<void>;

// vue-router hooks
export type Route = VueRouterRoute;
export type NextFunc<T extends Vue = Vue> = (to?: RawLocation | false | ((vm: T) => any) | void) => void;
