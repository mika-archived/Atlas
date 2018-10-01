import NProgress from "nprogress";
import UIKit from "uikit";
import Vue from "vue";
import Router, { RawLocation, Route } from "vue-router";

import store from "@/store";
import { SessionState } from "@/store/session";
import Home from "@/views/Home.vue";


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
      path: "/tos",
      name: "tos",
      component: () => import(/* webpackChunkName: "tos" */ "./views/Tos.vue"),
      meta: { auth: "both" } as RouteMeta,
    },
    {
      path: "/users/signup",
      name: "users-signup",
      component: () => import(/* webpackChunkName: "users/signup" */ "./views/users/Signup.vue"),
      meta: { auth: "both" } as RouteMeta  // XXX: Google Firebase Authentication cannot set redirect URI
    },
    {
      path: "/users/login",
      name: "users-login",
      component: () => import(/* webpackChunkName: "users/login" */ "./views/users/Login.vue"),
      meta: { auth: "both" } as RouteMeta // XXX: Google Firebase Authentication cannot set redirect URI
    },
    {
      path: "/users/logout",
      name: "users-logout",
      component: () => import(/* webpackChunkName: "users/logout" */ "./views/users/Logout.vue"),
      meta: { auth: "registered" } as RouteMeta,
    },
    {
      path: "*",
      name: "404",
      component: () => import(/* webpackChunkName: "404" */ "./views/404.vue"),
      meta: { auth: "both" } as RouteMeta
    }
  ],
});

router.beforeEach(async (to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void) => {
  NProgress.start();

  await store.dispatch("checkCurrentSession");
  const session = store.getters.sessionState as SessionState;

  if (to.matched.some(record => (record.meta as RouteMeta).auth === "both")) {
    next();
  } else {
    if (to.matched.some(record => (record.meta as RouteMeta).auth === "registered")) {
      if (session === "registered") {
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
      if (session === "registered") {
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
