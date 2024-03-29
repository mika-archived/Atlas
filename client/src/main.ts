import Vue from "vue";

import VueTagsInput from "@johmun/vue-tags-input";
import VueLazyLoad from "vue-lazyload";
import VueSilentbox from "vue-silentbox";

Vue.use(VueTagsInput);
Vue.use(VueLazyLoad, { preLoad: 1.3, attempt: 1 });
Vue.use(VueSilentbox);

import "tslib";
import "uikit";

import "@/bootstrap";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import SessionMixin from "./mixins/session";

Vue.mixin(SessionMixin);

import "./styles/main.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
