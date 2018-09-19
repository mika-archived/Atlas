import UIKit from "uikit";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

import { NextFunc, Route } from "../models/types";

@Component
export class AnonymousUser extends Vue {

  @Action("checkCurrentSession") public checkCurrentSession!: () => void;

  @Getter("hasSession") public hasSession!: boolean;

  public beforeRouteEnter(to: Route, from: Route, next: NextFunc<AnonymousUser>): any {
    next(async vm => {
      await vm.checkCurrentSession();
      if (vm.hasSession) {
        UIKit.notification({ message: "すでにログインしています" });
        vm.$router.push("/");
      }
    });
  }
}
