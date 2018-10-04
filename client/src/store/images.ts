import { firestore } from "firebase";
import { DefineActions, DefineGetters, DefineMutations } from "vuex-type-helper";
import { firebaseAction } from "vuexfire";

import { IImage } from "@/models/image";
import { currentUser } from "@/models/session";
import { Nullable } from "@/models/types";

// tslint:disable no-shadowed-variable
const store = firestore();

export interface IGetImageParams {
  id: string;
}

export interface IImagesState {
  images: [];
  image: Nullable<IImage>;
  hasError: boolean;
}

interface IImagesActions {
  getImages: {};
  getImage: IGetImageParams;
}

interface IImagesGetters {
  images: IImage[];
  image: Nullable<IImage>;
}

// tslint:disable:no-empty-interface
interface IImagesMutations {
  clearImage: {};
  toggleError: { value: boolean };
}

const state: IImagesState = {
  images: [],
  image: null,
  hasError: false,
};

const actions: DefineActions<IImagesActions, IImagesState, IImagesMutations, IImagesGetters> = {
  async getImages(ctx, payload) {
    firebaseAction<typeof ctx, typeof payload>(async ({ bindFirebaseRef }) => {
      const user = await store.collection("users").doc((await currentUser()).uid).get();
      const query = store.collection("images").where("user", "==", user.ref).orderBy("timestamp", "desc").limit(60);
      await bindFirebaseRef("images", query);
    })(ctx, payload);
  },

  async getImage(ctx, payload) {
    ctx.commit("clearImage", {});
    ctx.commit("toggleError", { value: false });

    firebaseAction<typeof ctx, typeof payload>(async ({ bindFirebaseRef, commit }, { id }) => {
      try {
        const image = await store.collection("images").doc(id);
        await bindFirebaseRef("image", image);
      } catch (err) {
        console.warn(err);
        commit("toggleError", { value: true });
      }
    })(ctx, payload);
  }
};

const getters: DefineGetters<IImagesGetters, IImagesState> = {
  images: state => state.images,
  image: state => state.image,
};

const mutations: DefineMutations<IImagesMutations, IImagesState> = {
  clearImage(state) {
    state.image = null;
  },
  toggleError(state, { value }) {
    state.hasError = value;
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
