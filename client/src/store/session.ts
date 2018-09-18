import Amplify, { Auth } from "aws-amplify";
import { DefineActions, DefineGetters, DefineMutations } from "vuex-type-helper";

import awsExports from "@/models/aws-exports";
import { ICurrentSession } from "@/models/CurrentSession";

Amplify.configure(awsExports);

// tslint:disable no-shadowed-variable

export interface RegisterUserParams {
  username: string;
  password: string;
  email: string;
}

export interface ISessionState {
  currentSession: ICurrentSession | null;
  //
  reason: string;
  isRegisterUserSuccess: boolean;
}

interface ISessionActions {
  checkCurrentSession: {};
  registerUser: RegisterUserParams;
}

interface ISessionGetters {
  hasSession: boolean;
}

interface ISessionMutations {
  updateCurrentSession: {
    session: ICurrentSession | null;
  };
  registerUserSuccess: {};
  registerUserFailed: { reason: string };
}

const state: ISessionState = {
  currentSession: null,
  reason: "",
  isRegisterUserSuccess: false,
};

const actions: DefineActions<ISessionActions, ISessionState, ISessionMutations, ISessionGetters> = {
  async checkCurrentSession({ commit }) {
    try {
      const session = Auth.currentSession();
      console.log(session);
      commit("updateCurrentSession", { session: null });
    } catch (err) {
      console.error(err);
    }
  },

  async registerUser({ commit }, payload) {
    try {
      await Auth.signUp({
        username: payload.username,
        password: payload.password,
        attributes: { email: payload.email }
      });
      commit("registerUserSuccess", {});
    } catch (err) {
      console.error(err);
      commit("registerUserFailed", { reason: err.message });
    }
  }
};

const getters: DefineGetters<ISessionGetters, ISessionState> = {
  hasSession: state => state.currentSession != null,
};

const mutations: DefineMutations<ISessionMutations, ISessionState> = {
  updateCurrentSession(state, { session }) {
    state.currentSession = session;
  },
  registerUserSuccess(state) {
    state.isRegisterUserSuccess = true;
  },
  registerUserFailed(state, { reason }) {
    state.reason = reason;
    state.isRegisterUserSuccess = false;
  }
};

export default {
  actions,
  getters,
  mutations,
  state,
};
