import { auth } from "firebase";
import { DefineActions, DefineGetters, DefineMutations } from "vuex-type-helper";

import { ISession } from "@/models/session";
import { Nullable } from "@/models/types";

// tslint:disable no-shadowed-variable
export interface ISessionState {
  currentSession: Nullable<ISession>;
}

interface ISessionActions {
  checkCurrentSession: {};
  login: {};
  logout: {};
  verifyCredentials: {};
}

interface ISessionGetters {
  hasSession: boolean;
  getSession: Nullable<ISession>;
}

interface ISessionMutations {
  updateCurrentSession: { session: Nullable<ISession> };
}

const state: ISessionState = {
  currentSession: null,
};

const actions: DefineActions<ISessionActions, ISessionState, ISessionMutations, ISessionGetters> = {
  async checkCurrentSession({ commit }) {
    const user = auth().currentUser;
    console.log(user);
    if (user === null) {
      commit("updateCurrentSession", { session: null });
    } else {
      commit("updateCurrentSession", {
        session: {
          username: user.displayName
        } as ISession
      });
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
        commit("updateCurrentSession", {
          session: {
            username: (r.user as firebase.User).displayName,
          } as ISession
        });
      }
      console.log(r);
    } catch (err) {
      console.warn(err);
    }
  },

  async logout({ commit }) {
    await auth().signOut();
    commit("updateCurrentSession", { session: null });
  },
};

const getters: DefineGetters<ISessionGetters, ISessionState> = {
  hasSession: state => state.currentSession != null,
  getSession: state => state.currentSession
};

const mutations: DefineMutations<ISessionMutations, ISessionState> = {
  updateCurrentSession(state, { session }) {
    state.currentSession = session;
  }
};

export default {
  actions,
  getters,
  mutations,
  state,
};
