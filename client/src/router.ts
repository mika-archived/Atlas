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
      component: Home,
      meta: { auth: "both" } as RouteMeta
    },
    {
      path: "/about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue"),
      meta: { auth: "both" } as RouteMeta
    },
    {
      path: "/tos",
      component: () => import(/* webpackChunkName: "tos" */ "./views/Tos.vue"),
      meta: { auth: "both" } as RouteMeta,
    },
    {
      path: "/users/signup",
      component: () => import(/* webpackChunkName: "users/signup" */ "./views/users/Signup.vue"),
      meta: { auth: "both" } as RouteMeta  // XXX: Google Firebase Authentication cannot set redirect URI
    },
    {
      path: "/users/login",
      component: () => import(/* webpackChunkName: "users/login" */ "./views/users/Login.vue"),
      meta: { auth: "both" } as RouteMeta // XXX: Google Firebase Authentication cannot set redirect URI
    },
    {
      path: "/users/logout",
      component: () => import(/* webpackChunkName: "users/logout" */ "./views/users/Logout.vue"),
      meta: { auth: "registered" } as RouteMeta,
    },
    {
      path: "/images/:id",
      component: () => import(/* webpackChunkName: "images/show" */ "./views/images/Show.vue"),
      meta: { auth: "both" } as RouteMeta,
    },
    {
      path: "*",
      component: () => import(/* webpackChunkName: "error" */ "./components/Error.vue"),
      props: {
        mode: "NotFound"
      },
      meta: { auth: "both" } as RouteMeta
    }
  ],
  scrollBehavior: () => {
    return { x: 0, y: 0 };
  }
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
