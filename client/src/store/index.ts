import Vue from "vue";
import Vuex from "vuex";

interface IModules {
  [key: string]: any;
}

const files = (require as any).context(".", false, /\.ts$/);
const modules: IModules = {};

files.keys().forEach((key: string) => {
  if (key === "./index.ts") {
    return;
  }
  modules[key.replace(/(\.\/|\.ts)/g, "")] = files(key).default;
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== "production"
});
