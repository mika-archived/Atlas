import { auth, storage } from "firebase";
import Vue from "vue";
import { Commit, DefineActions, DefineGetters, DefineMutations } from "vuex-type-helper";

import { FileWrapper, UploadState } from "../models/FileWrapper";
import { fromSizeToName } from "../models/thumbnails";

interface IUploaderRef {
  uid: string;
  file: FileWrapper;
  size?: number;
  ref: storage.Reference;
  commit: Commit<IUploaderMutations>;
  progress: {
    min: number;
    max: number;
  };
}

async function uploadImageWithProgress(config: IUploaderRef): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    const blob = config.size ? await config.file.asSquare(config.size) : config.file.asFile();
    const ref = config.ref.child(`/${config.uid}/private/${config.file.id}/${config.size ? fromSizeToName(config.size) : "master"}`).put(blob);
    ref.on("state_changed", (w: any) => {
      const progress = config.progress.min + (w.bytesTransferred / w.totalBytes) * config.progress.max;
      config.commit("updateProgress", { progress });
    }, err => {
      console.warn(err);
      reject();
    }, () => {
      resolve();
    });
    await ref;
  });
}

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
    if (state.workingFiles.length === 0) {
      commit("toggleToastVisibility", { visible: false });
      return;
    }

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

        // TODO: transaction
        await uploadImageWithProgress({ uid: currentUser.uid, file, ref: storageRef, progress: { min: 0, max: 0 }, size: 192, commit });
        await uploadImageWithProgress({ uid: currentUser.uid, file, ref: storageRef, progress: { min: 0, max: 30 }, size: 1200, commit });
        await uploadImageWithProgress({ uid: currentUser.uid, file, ref: storageRef, progress: { min: 30, max: 70 }, commit });

        commit("markAs", { index, sts: UploadState.UPLOADED });
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
