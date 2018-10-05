<template lang="pug">
  div
    template(v-if="isRegisteredUser")
      explorer(:images="imagesAll")
    template(v-else-if="isAnonymousUser")
      featured
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, State } from "vuex-class";

import Explorer from "../components/Home/Explorer.vue";
import Featured from "../components/Home/Featured.vue";
import { IImage } from "../models/image";
import { Indexer, IState } from "../models/types";
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

  @State((state: IState) => state.images.images)
  public images!: Indexer<IImage[]>;

  public get imagesAll(): IImage[] {
    console.log("a");
    if (this.images && this.images.all) {
      return this.images.all;
    } else {
      return [];
    }
  }
}
</script>

<style lang="scss" scoped>
.lightbox {
  position: relative;
}
</style>
