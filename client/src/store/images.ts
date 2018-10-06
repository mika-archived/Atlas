import { firestore } from "firebase";
import { cloneDeep } from "lodash";
import Vue from "vue";
import { DefineActions, DefineGetters, DefineMutations } from "vuex-type-helper";
import { firebaseAction } from "vuexfire";

import { fetchImageData } from "../models/api";
import { IImageExtends } from "../models/extends";
import { currentUser } from "../models/session";
import { Indexer } from "../models/types";
import { IImage } from "../shared/types";

// tslint:disable no-shadowed-variable
const store = firestore();

export interface IBindImagesParams {
  key: string;
}

export interface IBindImageParams {
  id: string;
}

export interface IAttachImageParams {
  id: string;
  size: string;
}

export interface IImagesState extends Indexer<IImage[] | IImageExtends | boolean> {
}

interface IImagesActions {
  bindImages: IBindImagesParams;
  unbindImages: IBindImagesParams;
  bindImage: IBindImageParams;
  attachImage: IAttachImageParams;
  unbindImage: IBindImageParams;
}

// tslint:disable:no-empty-interface
interface IImagesGetters {
}

interface IImagesMutations {
  bindObject: { key: string, initial: any };
  attachObject: { key: string, values: Indexer<any> };
  unbintObject: { key: string };
}

const state: IImagesState = {};

const actions: DefineActions<IImagesActions, IImagesState, IImagesMutations, IImagesGetters> = {
  async bindImages(ctx, payload) {
    firebaseAction<typeof ctx, typeof payload>(async ({ bindFirebaseRef, commit, state }, { key }) => {
      if (state[key]) {
        console.warn(`Key "${key}" is already binded.`);
        return;
      }
      commit("bindObject", { key, initial: [] });

      const user = await store.collection("users").doc((await currentUser()).uid).get();
      const query = store.collection("images").where("user", "==", user.ref).orderBy("timestamp", "desc").limit(60);
      await bindFirebaseRef(key, query);
    })(ctx, payload);
  },

  async unbindImages(ctx, payload) {
    firebaseAction<typeof ctx, typeof payload>(async ({ unbindFirebaseRef }, { key }) => {
      await unbindFirebaseRef(key);
    })(ctx, payload);
  },

  async bindImage(ctx, payload) {
    ctx.commit("bindObject", { key: "hasError", initial: false });

    firebaseAction<typeof ctx, typeof payload>(async ({ commit }, { id }) => {
      try {
        const snapshot = (await store.collection("images").doc(id).get()).data() as IImage;
        const image = cloneDeep(snapshot);
        image.user = cloneDeep((await (snapshot.user as firestore.DocumentReference).get()).data());

        commit("bindObject", { key: id, initial: image });
      } catch (err) {
        console.warn(err);
        commit("bindObject", { key: "hasError", initial: true });
      }
    })(ctx, payload);
  },

  async attachImage({ commit, state }, { id, size }) {
    if (!state[id]) {
      console.warn(`${id} does not stored in Vuex`);
      return;
    }

    try {
      const signedUrl = await fetchImageData(id, size);
      if (signedUrl) {
        commit("attachObject", { key: id, values: { signedUrl } });
      }
    } catch (err) {
      console.warn(err);
    }
  },

  async unbindImage({ commit }, { id }) {
    commit("unbintObject", { key: id });
  }
};

const getters: DefineGetters<IImagesGetters, IImagesState> = {};

const mutations: DefineMutations<IImagesMutations, IImagesState> = {
  bindObject(state, { key, initial }) {
    if (state[key]) {
      state[key] = initial;
    } else {
      Vue.set(state, key, initial);
    }
  },
  attachObject(state, { key, values }) {
    if (state[key]) {
      for (const prop of Object.keys(values)) {
        Vue.set(state[key] as any, prop, values[prop]);
      }
    }
  },
  unbintObject(state, { key }) {
    delete state[key];
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
