import Amplify, { API } from "aws-amplify";
import Vue from "vue";
import { DefineActions, DefineGetters, DefineMutations } from "vuex-type-helper";

import awsExports from "@/models/aws-exports";
import { API_NAME } from "@/models/constants";
import { FileWrapper, UploadState } from "@/models/FileWrapper";

Amplify.configure(awsExports);

// tslint:disable no-shadowed-variable

export interface IAddToUploadQueueParams {
  files: File[];
}

export interface IUploaderState {
  workingFiles: FileWrapper[];
  uploading: boolean;
  visibleToast: boolean;
}

interface IUploaderActions {
  addToWorkingFiles: IAddToUploadQueueParams;
  upload: {};
  clearWorkingFiles: {};
  hideUploaderToast: {};
}

interface IUploaderGetters {
  isUploading: boolean;
  isVisibleToast: boolean;
  workingFiles: FileWrapper[];
}

interface IUploaderMutations {
  addToUploadQueue: { fw: FileWrapper };
  clearUploadQueue: {};
  toggleUploadingState: { uploading: boolean };
  markAs: { index: number, sts: UploadState };
  toggleToastVisibility: { visible: boolean };
}

const state: IUploaderState = {
  uploading: false,
  workingFiles: [],
  visibleToast: false,
};

const actions: DefineActions<IUploaderActions, IUploaderState, IUploaderMutations, IUploaderGetters> = {
  async addToWorkingFiles({ commit }, payload) {
    payload.files.forEach(file => {
      commit("addToUploadQueue", { fw: new FileWrapper(file) });
    });
  },
  async upload({ commit, state }) {
    commit("toggleToastVisibility", { visible: true });
    commit("toggleUploadingState", { uploading: true });
    let idx = 0;
    for (const file of state.workingFiles) {
      const index = idx++;
      commit("markAs", { index, sts: UploadState.UPLOADING });
      try {
        await API.post(API_NAME, "/images", {
          body: {
            // なんかバイナリデータは直接 S3 に投げる想定らしい
            image: await file.asBase64(),
            restrict: "private"
          },
        });
        commit("markAs", { index, sts: UploadState.UPLOADED });
      } catch (err) {
        console.warn(err);
        commit("markAs", { index, sts: UploadState.FAILED });
      }
    }
    commit("toggleUploadingState", { uploading: false });
  },
  async clearWorkingFiles({ commit }) {
    commit("clearUploadQueue", {});
  },
  async hideUploaderToast({ commit }) {
    commit("toggleToastVisibility", { visible: false });
    commit("clearUploadQueue", {});
  }
};

const getters: DefineGetters<IUploaderGetters, IUploaderState> = {
  isUploading: state => state.uploading,
  workingFiles: state => state.workingFiles,
  isVisibleToast: state => state.visibleToast,
};

const mutations: DefineMutations<IUploaderMutations, IUploaderState> = {
  addToUploadQueue(state, { fw }) {
    state.workingFiles.push(fw);
  },
  clearUploadQueue(state) {
    state.workingFiles = [];
  },
  markAs(state, { index, sts }) {
    const fw = state.workingFiles[index];
    fw.markAs(sts);
    Vue.set(state.workingFiles, index, fw);
  },
  toggleUploadingState(state, { uploading }) {
    state.uploading = uploading;
  },
  toggleToastVisibility(state, { visible }) {
    state.visibleToast = visible;
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
