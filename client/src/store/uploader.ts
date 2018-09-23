import Amplify, { API } from "aws-amplify";
import { DefineActions, DefineGetters, DefineMutations } from "vuex-type-helper";

import awsExports from "@/models/aws-exports";
import { API_NAME } from "@/models/constants";

Amplify.configure(awsExports);

// tslint:disable no-shadowed-variable

export interface IAddToUploadQueueParams {
  files: File[];
}

export interface IUploaderState {
  files: File[];
  uploading: boolean;
  uploadedOf: number;
}

interface IUploaderActions {
  addToUploadQueue: IAddToUploadQueueParams;
  upload: {};
}

interface IUploaderGetters {
  isUploading: boolean;
  totalCountOfFiles: number;
  uploadingCount: number;
  queuedFiles: File[];
}

interface IUploaderMutations {
  addToUploadQueue: { file: File };
  clearUploadQueue: {};
  toggleUploadingState: { uploading: boolean };
  updateUploadingCount: { count: number };
}

const state: IUploaderState = {
  files: [],
  uploading: false,
  uploadedOf: 0,
};

const actions: DefineActions<IUploaderActions, IUploaderState, IUploaderMutations, IUploaderGetters> = {
  addToUploadQueue({ commit }, payload) {
    payload.files.forEach(file => {
      commit("addToUploadQueue", { file });
    });
    commit("toggleUploadingState", { uploading: true });
  },
  async upload({ commit, state }) {
    // Nothing to do
    try {
      state.files.forEach(async (file, idx) => {
        commit("updateUploadingCount", { count: idx + 1 });
        const response = await API.post(API_NAME, "/images", {});
        console.log(response);
      });
      commit("clearUploadQueue", {});
      commit("toggleUploadingState", { uploading: false });
    } catch (err) {
      console.warn(err);
    }
  }
};

const getters: DefineGetters<IUploaderGetters, IUploaderState> = {
  isUploading: state => state.uploading,
  queuedFiles: state => state.files,
  totalCountOfFiles: state => state.files.length,
  uploadingCount: state => state.uploadedOf,
};

const mutations: DefineMutations<IUploaderMutations, IUploaderState> = {
  addToUploadQueue(state, { file }) {
    state.files.push(file);
  },
  clearUploadQueue(state) {
    state.files = [];
  },
  toggleUploadingState(state, { uploading }) {
    state.uploading = uploading;
  },
  updateUploadingCount(state, { count }) {
    state.uploadedOf = count;
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
