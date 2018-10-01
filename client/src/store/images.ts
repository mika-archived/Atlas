import { firestore } from "firebase";
import Vue from "vue";
import { DefineActions, DefineGetters, DefineMutations } from "vuex-type-helper";

import { IImage } from "@/models/image";
import { currentUser } from "@/models/session";

// tslint:disable no-shadowed-variable

export interface IImagesState {
  images: { [key: string]: IImage[] };
}

interface IImagesActions {
  getImages: { key: string };
  subscribeImage: { key: string };
  disposeImage: { key: string };
}

interface IImagesGetters {
  images: (key: string) => IImage[];
}

interface IImagesMutations {
  insertImage: { key: string, image: IImage };
  bulkInsertImage: { key: string, images: IImage[] };
  deleteImage: { key: string, image: IImage };
  bulkDeleteImage: { key: string, images: IImage[] };
  clearImage: { key: string };
}

const state: IImagesState = {
  images: {}
};

const actions: DefineActions<IImagesActions, IImagesState, IImagesMutations, IImagesGetters> = {
  async getImages({ commit }, { key }) {
    try {
      const user = await firestore().collection("users").doc((await currentUser()).uid).get();
      let query: firestore.Query;
      if (key !== "") {
        const [fieldPath, opStr, value] = key.split(" ");
        query = firestore().collection("images").where(fieldPath, opStr as firestore.WhereFilterOp, value);
      } else {
        query = firestore().collection("images");
      }
      const snapshot = await query.where("user", "==", user.ref).get();
      snapshot.forEach(image => {
        console.log(image.data());
      });
    } catch (err) {
      console.warn(err);
    }
  },
  async subscribeImage({ commit }, { key }) {
    // TODO
  },
  async disposeImage({ commit }, { key }) {
    // TODO
  }
};

const getters: DefineGetters<IImagesGetters, IImagesState> = {
  images: state => key => state.images[key],
};

const mutations: DefineMutations<IImagesMutations, IImagesState> = {
  insertImage(state, { key, image }) {
    const imgs = state.images[key];
    imgs.push(image);
    Vue.set(state.images, key, imgs);
  },
  bulkInsertImage(state, { key, images }) {
    // TODO
  },
  deleteImage(state, { key, image }) {
    const imgs = state.images[key].filter(w => w.id !== image.id);
    Vue.set(state.images, key, imgs);
  },
  bulkDeleteImage(state, { key, images }) {
    // TODO
  },
  clearImage(state, { key }) {
    Vue.set(state.images, key, []);
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
