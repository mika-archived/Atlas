import { firestore } from "firebase";
import { DefineActions, DefineGetters, DefineMutations } from "vuex-type-helper";
import { firebaseAction } from "vuexfire";

import { currentUser } from "../models/session";
import { Indexer, Nullable } from "../models/types";
import { IImage } from "../shared/types";

// tslint:disable no-shadowed-variable
const store = firestore();

export interface IBindImagesParams {
  key: string;
}

export interface IBindImageParams {
  id: string;
}

export interface IImagesState {
  images: Indexer<IImage[]>;
  image: Nullable<IImage>;
  hasError: boolean;
  isBinding: Indexer<boolean>;
}

interface IImagesActions {
  bindImages: IBindImagesParams;
  unbindImages: IBindImagesParams;
  bindImage: IBindImageParams;
}

interface IImagesGetters {
  image: Nullable<IImage>;
}

// tslint:disable:no-empty-interface
interface IImagesMutations {
  clearImage: {};
  setImage: { image: IImage };
  toggleError: { value: boolean };
  toggleBindingState: { key: string, value: boolean };
}

const state: IImagesState = {
  images: {},
  image: null,
  hasError: false,
  isBinding: {},
};

const actions: DefineActions<IImagesActions, IImagesState, IImagesMutations, IImagesGetters> = {
  async bindImages(ctx, payload) {
    firebaseAction<typeof ctx, typeof payload>(async ({ bindFirebaseRef, commit, state }, { key }) => {
      if (state.isBinding[`images.${key}`]) {
        return; // If already binded, skip binding
      }

      const user = await store.collection("users").doc((await currentUser()).uid).get();
      const query = store.collection("images").where("user", "==", user.ref).orderBy("timestamp", "desc").limit(60);
      await bindFirebaseRef(`images.${key}`, query);
      commit("toggleBindingState", { key: `images.${key}`, value: true });
    })(ctx, payload);
  },

  async unbindImages(ctx, payload) {
    firebaseAction<typeof ctx, typeof payload>(async ({ unbindFirebaseRef }, { key }) => {
      await unbindFirebaseRef(`imagea.${key}`);
    })(ctx, payload);
  },

  async bindImage(ctx, payload) {
    ctx.commit("clearImage", {});
    ctx.commit("toggleError", { value: false });

    firebaseAction<typeof ctx, typeof payload>(async ({ bindFirebaseRef, commit }, { id }) => {
      try {
        const image = await store.collection("images").doc(id).get();
        const attrs = image.data() as IImage;
        commit("setImage", {
          image: {
            id: attrs.id,
            attributes: attrs.attributes,
            caption: attrs.caption,
            dimensions: attrs.dimensions,
            limited: attrs.limited,
            restrict: attrs.restrict,
            size: attrs.size,
            timestamp: attrs.timestamp,
            type: attrs.type,
            user: (await (attrs.user as firestore.DocumentReference).get()).data(),
            version: attrs.version,
          },
        });
      } catch (err) {
        console.warn(err);
        commit("toggleError", { value: true });
      }
    })(ctx, payload);
  }
};

const getters: DefineGetters<IImagesGetters, IImagesState> = {
  image: state => state.image,
};

const mutations: DefineMutations<IImagesMutations, IImagesState> = {
  clearImage(state) {
    state.image = null;
  },
  setImage(state, { image }) {
    state.image = image;
  },
  toggleError(state, { value }) {
    state.hasError = value;
  },
  toggleBindingState(state, { key, value }) {
    state.isBinding[key] = value;
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
