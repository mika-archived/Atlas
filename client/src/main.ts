import Vue from "vue";

// Vue Plugins
import Vuelidate from "vuelidate";

// UIKit
import UIkit from "uikit";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./registerServiceWorker";



Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
