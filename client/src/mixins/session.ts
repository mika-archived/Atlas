// セッション情報程度はどこからでも取得できるべきではと思ったけどもー

import Vue from "vue";
import { Mixin } from "vue-mixin-decorator";
import { Getter, State } from "vuex-class";

import { ISession } from "../models/session";
import { IState, Nullable } from "../models/types";
import { SessionState } from "../store/session";

export interface ICurrentUser {
  isLoading: boolean;
  isRegistered: boolean;
  isAnonymous: boolean;

  user: Nullable<ISession>;
}

@Mixin
export default class SessionMixin extends Vue {
  @Getter("sessionState")
  public sessionState!: SessionState;

  @State((state: IState) => state.session.currentSession)
  public currentSession!: Nullable<ISession>;

  public get $currentUser(): ICurrentUser {
    return {
      isAnonymous: this.sessionState === "anonymous",
      isRegistered: this.sessionState === "registered",
      isLoading: this.sessionState === "uneasy",
      user: this.currentSession
    };
  }
}
