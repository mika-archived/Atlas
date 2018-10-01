import { ActionContext as VuexActionContext } from "vuex";
import { VuexFire } from "vuexfire";

type VuexFireActionContext<S, R> = VuexFire.ActionContext<S, R>;

declare module "vuex-type-helper" {
  interface ActionContext<State, Getters, Actions, Mutations> extends VuexActionContext<State, any>, VuexFireActionContext<State, any> {
  }
}