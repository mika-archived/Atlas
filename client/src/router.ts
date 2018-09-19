import UIKit from "uikit";
import Vue from "vue";
import Router, { RawLocation, Route } from "vue-router";

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
    }
  ],
});

import Amplify, { Auth } from "aws-amplify";

import awsExports from "@/models/aws-exports";

Amplify.configure(awsExports);


router.beforeEach(async (to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void) => {
  if (to.matched.some(record => (record.meta as RouteMeta).auth === "both")) {
    next();
  } else {
    let hasSession = false;
    try {
      await Auth.currentAuthenticatedUser();
      hasSession = true;
    } catch (err) {
      //
    }
    if (to.matched.some(record => (record.meta as RouteMeta).auth === "registered")) {
      if (hasSession) {
        // pass
        next();
      } else {
        // require login
        next({ path: "/users/login", query: { redirectTo: to.fullPath } });
        UIKit.notification("ログインする必要があります");
      }
    } else {
      if (hasSession) {
        // require anonymous session
        next({ path: "/" });
        UIKit.notification("すでにログインしています");
      } else {
        next();
      }
    }
  }
});

export default router;
