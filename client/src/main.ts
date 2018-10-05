import Vue from "vue";

import VueSilentbox from "vue-silentbox";

import "tslib";
import "uikit";

import "@/bootstrap";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import SessionMixin from "./mixins/session";

import "./styles/main.scss";

Vue.config.productionTip = false;

Vue.use(VueSilentbox);
Vue.mixin(SessionMixin);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
