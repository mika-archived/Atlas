import NProgress from "nprogress";
import UIKit from "uikit";
import Vue from "vue";
import Router, { RawLocation, Route } from "vue-router";

import store from "./store";

import Home from "./views/Home.vue";

Vue.use(Router);

type AuthMode = "both" | "anonymous" | "registered";

interface RouteMeta {
  auth: AuthMode;
}

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { auth: "both" } as RouteMeta
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue"),
      meta: { auth: "both" } as RouteMeta
    },
    {
      path: "/users/signup",
      name: "users-signup",
      component: () => import(/* webpackChunkName: "users-signup" */ "./views/users/Signup.vue"),
      meta: { auth: "anonymous" } as RouteMeta
    },
    {
      path: "/users/confirmation",
      name: "users-confirmation",
      component: () => import(/* webpackChunkName: "users-confirm" */ "./views/users/Confirmation.vue"),
      meta: { auth: "anonymous" } as RouteMeta
    },
    {
      path: "/users/login",
      name: "users-login",
      component: () => import(/* webpackChunkName: "users-login" */ "./views/users/Login.vue"),
      meta: { auth: "anonymous" } as RouteMeta
    },
    {
      path: "/users/logout",
      name: "users-logout",
      component: () => import(/* webpackChunkName: "users-logout" */ "./views/users/Logout.vue"),
      meta: { auth: "registered" } as RouteMeta,
    }
  ],
});

router.beforeEach(async (to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void) => {
  NProgress.start();

  await store.dispatch("checkCurrentSession");
  const hasSession = store.getters.hasSession;
  if (store.getters.currentVersions.length === 0) {
    await store.dispatch("getCurrentVersions");
  }

  if (to.matched.some(record => (record.meta as RouteMeta).auth === "both")) {
    next();
  } else {
    if (to.matched.some(record => (record.meta as RouteMeta).auth === "registered")) {
      if (hasSession) {
        // pass
        next();
      } else {
        // require login
        next({ path: "/users/login", query: { redirectTo: to.fullPath } });
        UIKit.notification(`
        <div class="notification is-warning">
          ログインする必要があります
        </div>
        `);
      }
    } else {
      if (hasSession) {
        // require anonymous session
        next({ path: "/" });
        UIKit.notification(`
        <div class="notification is-warning">
          すでにログインしています
        </div>
        `);
      } else {
        next();
      }
    }
  }
  NProgress.done();
});

export default router;
