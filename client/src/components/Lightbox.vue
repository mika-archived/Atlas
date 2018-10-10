<template lang="pug">
  silentbox-single(:src="src")
    slot
</template>

<script lang="ts">
import { storage } from "firebase";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { currentUser } from "../models/session";
import { IImage } from "../shared/types";

@Component
export default class CloudImage extends Vue {
  public previewUrl: string = "https://fakeimg.mochizuki.moe/100x100/";

  @Prop()
  public image!: IImage;

  public get src(): string {
    if (this.image) {
      return `https://storage.atlas.mochizuki.moe/media/${this.image.id}/xlarge`;
    }
    return "";
  }
}
</script>

<style lang="scss" scoped>
/deep/ * #silentbox-overlay__embed {
  height: 85%;
  width: 90%;
}
</style>
