<template lang="pug">
  div
    template(v-if="isRegisteredUser")
      explorer
    template(v-else-if="isAnonymousUser")
      featured
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

import Explorer from "../components/Home/Explorer.vue";
import Featured from "../components/Home/Featured.vue";
import { ActionDescriber } from "../models/types";
import { SessionState } from "../store/session";

@Component({
  components: {
    Explorer,
    Featured
  }
})
export default class Navigation extends Vue {
  @Getter("isRegisteredUser")
  public isRegisteredUser!: boolean;

  @Getter("isSessionLoading")
  public isSessionLoading!: boolean;

  @Getter("isAnonymousUser")
  public isAnonymousUser!: boolean;

  @Action("getImages")
  public getImages!: ActionDescriber<{ key: string }>;

  public async created(): Promise<void> {
    this.getImages({ key: "" });
  }
}
</script>
