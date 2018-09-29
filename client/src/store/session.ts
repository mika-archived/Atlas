import { auth } from "firebase";
import { DefineActions, DefineGetters, DefineMutations } from "vuex-type-helper";

import { currentUser, ISession } from "@/models/session";
import { Nullable } from "@/models/types";

// tslint:disable no-shadowed-variable
export type SessionState = "anonymous" | "uneasy" | "registered";

export interface ISessionState {
  currentSession: Nullable<ISession>;
  sessionState: SessionState;
}

interface ISessionActions {
  checkCurrentSession: {};
  login: {};
  logout: {};
  verifyCredentials: {};
}

interface ISessionGetters {
  isSessionLoading: boolean;
  isRegisteredUser: boolean;
  isAnonymousUser: boolean;
  sessionState: SessionState;
}

interface ISessionMutations {
  updateCurrentSessionAsRegistered: { session: ISession };
  updateCurrentSessionAsAnonymous: {};
  updateCurrentSessionAsUneasy: {};
}

const state: ISessionState = {
  currentSession: null,
  sessionState: "uneasy",
};

const actions: DefineActions<ISessionActions, ISessionState, ISessionMutations, ISessionGetters> = {
  async checkCurrentSession({ commit }) {
    commit("updateCurrentSessionAsUneasy", {});
    try {
      const user = await currentUser();
      if (user !== null) {
        commit("updateCurrentSessionAsRegistered", {
          session: { username: user.displayName, } as ISession
        });
      } else {
        commit("updateCurrentSessionAsAnonymous", {});
      }
    } catch (err) {
      commit("updateCurrentSessionAsAnonymous", {});
      console.warn(err);
    }
  },

  async login() {
    const provider = new auth.GoogleAuthProvider();
    auth().signInWithRedirect(provider);
  },

  async verifyCredentials({ commit }) {
    try {
      const r = await auth().getRedirectResult();
      if (r.credential !== null && r.user !== null) {
        commit("updateCurrentSessionAsRegistered", {
          session: {
            username: (r.user as firebase.User).displayName,
          } as ISession,
        });
      }
    } catch (err) {
      console.warn(err);
    }
  },

  async logout({ commit }) {
    await auth().signOut();
    console.log("hello");
    commit("updateCurrentSessionAsAnonymous", {});
  },
};

const getters: DefineGetters<ISessionGetters, ISessionState> = {
  sessionState: state => state.sessionState,
  isRegisteredUser: state => state.sessionState === "registered" && state.currentSession != null,
  isSessionLoading: state => state.sessionState === "uneasy",
  isAnonymousUser: state => state.sessionState === "anonymous",
};

const mutations: DefineMutations<ISessionMutations, ISessionState> = {
  updateCurrentSessionAsRegistered(state, { session }) {
    state.sessionState = "registered";
    state.currentSession = session;
  },

  updateCurrentSessionAsAnonymous(state) {
    state.sessionState = "anonymous";
    state.currentSession = null;
  },

  updateCurrentSessionAsUneasy(state) {
    state.sessionState = "uneasy";
    state.currentSession = null;
  }
};

export default {
  actions,
  getters,
  mutations,
  state,
};
