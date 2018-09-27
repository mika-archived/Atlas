import Firebase from "firebase";
import Vue from "vue";

import "tslib";
import "uikit";

import "@/bootstrap";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./styles/main.scss";


Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
