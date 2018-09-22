import Amplify, { API } from "aws-amplify";
import { DefineActions, DefineGetters, DefineMutations } from "vuex-type-helper";

import awsExports from "@/models/aws-exports";
import { API_NAME } from "@/models/constants";
import { Nullable } from "@/models/types";

Amplify.configure(awsExports);

// tslint:disable no-shadowed-variable

export interface IVersionState {
  current: string[];
}

interface IVersionActions {
  getCurrentVersions: {};
}

interface IVersionGetters {
  currentVersions: string[];
}

interface IVersionMutations {
  updateCurrent: {
    current: string[]
  };
}

const state: IVersionState = {
  current: []
};

const actions: DefineActions<IVersionActions, IVersionState, IVersionMutations, IVersionGetters> = {
  async getCurrentVersions({ commit }) {
    try {
      const json = await API.get(API_NAME, "/versions", {});
      commit("updateCurrent", { current: json.versions });
    } catch (err) {
      console.warn(err);
    }
  },
};

const getters: DefineGetters<IVersionGetters, IVersionState> = {
  currentVersions: state => state.current,
};

const mutations: DefineMutations<IVersionMutations, IVersionState> = {
  updateCurrent(state, { current }) {
    state.current = current;
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
