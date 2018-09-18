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

export interface VerifyCodeParams {
  code: string;
}

export interface ISessionState {
  currentSession: ICurrentSession | null;
  username: string;
  //
  reason: string;
  isRegisterUserSuccess: boolean;
  isVerifyCodeSuccess: boolean;
}

interface ISessionActions {
  checkCurrentSession: {};
  registerUser: RegisterUserParams;
  verifyCode: VerifyCodeParams;
}

interface ISessionGetters {
  hasSession: boolean;
}

interface ISessionMutations {
  updateCurrentSession: {
    session: ICurrentSession | null;
  };
  registerUserSuccess: { username: string };
  registerUserFailed: { reason: string };
  verifyCodeSuccess: {};
  verifyCodeFailed: { reason: string };
}

const state: ISessionState = {
  username: "",
  currentSession: null,
  reason: "",
  isRegisterUserSuccess: false,
  isVerifyCodeSuccess: false,
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
      commit("registerUserSuccess", { username: payload.username });
    } catch (err) {
      console.error(err);
      commit("registerUserFailed", { reason: err.message });
    }
  },

  async verifyCode({ commit, state }, payload) {
    try {
      const r = await Auth.confirmSignUp(state.username, payload.code);
      console.log(r);
      commit("verifyCodeSuccess", {});
    } catch (err) {
      console.error(err);
      commit("verifyCodeFailed", { reason: err.message });
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
  registerUserSuccess(state, { username }) {
    state.username = username;
    state.isRegisterUserSuccess = true;
  },
  registerUserFailed(state, { reason }) {
    state.reason = reason;
    state.isRegisterUserSuccess = false;
  },
  verifyCodeSuccess(state, { }) {
    state.isVerifyCodeSuccess = true;
  },
  verifyCodeFailed(state, { reason }) {
    state.reason = reason;
    state.isVerifyCodeSuccess = false;
  }
};

export default {
  actions,
  getters,
  mutations,
  state,
};
