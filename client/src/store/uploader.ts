import { auth, storage } from "firebase";
import Vue from "vue";
import { DefineActions, DefineGetters, DefineMutations } from "vuex-type-helper";

import { FileWrapper, UploadState } from "../models/FileWrapper";

// tslint:disable no-shadowed-variable
export interface IAddToUploadQueueParams {
  files: File[];
}

export interface IUploaderState {
  workingFiles: FileWrapper[];
  uploading: boolean;
  progress: number;
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
  progress: number;
  workingFiles: FileWrapper[];
}

interface IUploaderMutations {
  addToUploadQueue: { fw: FileWrapper };
  clearUploadQueue: {};
  toggleUploadingState: { uploading: boolean };
  markAs: { index: number, sts: UploadState, id?: string };
  updateProgress: { progress: number };
  toggleToastVisibility: { visible: boolean };
}

const state: IUploaderState = {
  workingFiles: [],
  uploading: false,
  progress: 0,
  visibleToast: false,
};

const actions: DefineActions<IUploaderActions, IUploaderState, IUploaderMutations, IUploaderGetters> = {
  async addToWorkingFiles({ commit }, payload) {
    payload.files.forEach(file => {
      commit("addToUploadQueue", { fw: new FileWrapper(file) });
    });
  },
  async upload({ commit, state }) {
    const storageRef = storage().ref();
    let idx = 0;

    commit("toggleToastVisibility", { visible: true });
    commit("toggleUploadingState", { uploading: true });
    for (const file of state.workingFiles) {
      const index = idx++;
      commit("markAs", { index, sts: UploadState.UPLOADING });
      try {
        commit("updateProgress", { progress: 0 });
        const currentUser = auth().currentUser;
        if (currentUser === null) {
          throw new Error("current user is null");
        }
        const ref = storageRef.child(`/${currentUser.uid}/private/${file.id}/master`).put(file.asFile());
        ref.on("state_changed", (w: any) => {
          const progress = (w.bytesTransferred / w.totalBytes) * 100;
          commit("updateProgress", { progress });
        }, err => {
          console.warn(err);
          commit("markAs", { index, sts: UploadState.FAILED });
        }, () => {
          commit("markAs", { index, sts: UploadState.UPLOADED });
        });
        await ref;
      } catch (err) {
        console.warn(err);
        commit("markAs", { index, sts: UploadState.FAILED });
        commit("toggleUploadingState", { uploading: false });
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
  isVisibleToast: state => state.visibleToast,
  progress: state => state.progress,
  workingFiles: state => state.workingFiles,
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
  updateProgress(state, { progress }) {
    state.progress = progress;
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
