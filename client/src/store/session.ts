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

export interface LoginParams {
  username: string;
  password: string;
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
  login: LoginParams;
  logout: {};
}

interface ISessionGetters {
  hasSession: boolean;
}

interface ISessionMutations {
  updateCurrentSession: {
    session: ICurrentSession | null;
  };
  clearReason: {};
  registerUserSuccess: { username: string };
  registerUserFailure: { reason: string };
  verifyCodeSuccess: {};
  verifyCodeFailure: { reason: string };
  loginSuccess: {};
  loginFailure: { reason: string };
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
      const user = await Auth.currentAuthenticatedUser();
      commit("updateCurrentSession", {
        session: {
          username: user.username,
          attributes: { email_verified: user.attributes.email_verified }
        }
      });
    } catch (err) {
      console.error(err);
      commit("updateCurrentSession", { session: null });
    }
  },

  async registerUser({ commit }, payload) {
    commit("clearReason", {});
    try {
      await Auth.signUp({
        username: payload.username,
        password: payload.password,
        attributes: { email: payload.email }
      });
      commit("registerUserSuccess", { username: payload.username });
    } catch (err) {
      console.error(err);
      commit("registerUserFailure", { reason: err.message });
    }
  },

  async verifyCode({ commit, state }, payload) {
    commit("clearReason", {});
    try {
      await Auth.confirmSignUp(state.username, payload.code);
      commit("verifyCodeSuccess", {});
    } catch (err) {
      console.error(err);
      commit("verifyCodeFailure", { reason: err.message });
    }
  },

  async login({ commit }, payload) {
    commit("clearReason", {});
    try {
      await Auth.signIn(payload.username, payload.password);
      const user = await Auth.currentAuthenticatedUser();
      commit("updateCurrentSession", {
        session: {
          username: user.username,
          attributes: { email_verified: user.attributes.email_verified }
        }
      });
    } catch (err) {
      console.error(err);
      commit("loginFailure", { reason: err.message });
    }
  },

  async logout({ commit }) {
    commit("clearReason", {});
    try {
      await Auth.signOut();
      commit("updateCurrentSession", { session: null });
    } catch (err) {
      console.error(err);
      // 通る...？
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
  clearReason(state, { }) {
    state.reason = "";
  },
  registerUserSuccess(state, { username }) {
    state.username = username;
    state.isRegisterUserSuccess = true;
  },
  registerUserFailure(state, { reason }) {
    state.reason = reason;
    state.isRegisterUserSuccess = false;
  },
  verifyCodeSuccess(state, { }) {
    state.isVerifyCodeSuccess = true;
  },
  verifyCodeFailure(state, { reason }) {
    state.reason = reason;
    state.isVerifyCodeSuccess = false;
  },
  loginSuccess(state, { }) {
    // Nothing to do
  },
  loginFailure(state, { reason }) {
    state.reason = reason;
  }
};

export default {
  actions,
  getters,
  mutations,
  state,
};
