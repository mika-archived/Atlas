import { firestore } from "firebase";
import { ActionContext as BaseActionContext } from "vuex";
import * as vth from "vuex-type-helper";

declare module "vuex-type-helper" {

  interface BindOptions {
    maxRefDepth?: number;
  }

  export interface ActionContext<State, Getters, Actions, Mutations> extends BaseActionContext<State, any> {
    bindFirebaseRef: (key: string, ref: firestore.Query, options?: BindOptions) => Promise<void>;
    unbindFirebaseRef: (key: string) => void;
  }
}
