import { firestore } from "firebase";
import { DefineActions, DefineGetters, DefineMutations } from "vuex-type-helper";
import { firebaseAction } from "vuexfire";

import { IImage } from "@/models/image";
import { currentUser } from "@/models/session";

// tslint:disable no-shadowed-variable
const store = firestore();

export interface IImagesState {
  images: [];
}

interface IImagesActions {
  getImages: { key: string };
}

interface IImagesGetters {
  images: IImage[];
}

// tslint:disable:no-empty-interface
interface IImagesMutations { /* */ }

const state: IImagesState = {
  images: []
};

const actions: DefineActions<IImagesActions, IImagesState, IImagesMutations, IImagesGetters> = {
  async getImages(ctx, payload) {
    firebaseAction<typeof ctx, typeof payload>(async ({ bindFirebaseRef, getters }, { }) => {
      const user = await store.collection("users").doc((await currentUser()).uid).get();
      const query = store.collection("images").where("user", "==", user.ref);
      bindFirebaseRef("images", query);
    })(ctx, payload);
  },
};

const getters: DefineGetters<IImagesGetters, IImagesState> = {
  images: state => state.images,
};

const mutations: DefineMutations<IImagesMutations, IImagesState> = {};

export default {
  actions,
  getters,
  mutations,
  state
};
