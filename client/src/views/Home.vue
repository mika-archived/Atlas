<template lang="pug">
  div
    template(v-if="hasSession")
      explorer
      gravatar(:email="email")
    template(v-else)
      featured
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

import Explorer from "../components/Home/Explorer.vue";
import Featured from "../components/Home/Featured.vue";
import Gravatar from "../presentationals/Gravatar.vue";

import { ISession } from "../models/session";
import { Nullable } from "../models/types";

@Component({
  components: {
    Explorer,
    Featured,
    Gravatar
  }
})
export default class Navigation extends Vue {
  @Getter("hasSession") public hasSession!: boolean;
  @Getter("getSession") public getSession!: Nullable<ISession>;

  public get email(): string {
    if (this.hasSession) {
      return (this.getSession as ISession).attributes.email;
    }
    return "";
  }
}
</script>
