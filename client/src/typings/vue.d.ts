import Vue from "vue";
import { ICurrentUser } from "@/mixins/session";

declare module "vue/types/vue" {
  interface VueConstructor {
    $currentUser: ICurrentUser
  }
}