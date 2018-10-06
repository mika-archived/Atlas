<template lang="pug">
  silentbox-single(:src="previewUrl")
    slot
</template>

<script lang="ts">
import { storage } from "firebase";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { IImageExtends } from "../models/extends";
import { currentUser } from "../models/session";

@Component
export default class CloudImage extends Vue {
  public previewUrl: string = "https://fakeimg.mochizuki.moe/100x100/";

  @Prop()
  public image!: IImageExtends;

  @Watch("image", { deep: true })
  public async onImageChanged(newImg: IImageExtends, oldImg: IImageExtends): Promise<void> {
    if (newImg.signedUrl) {
      // キャッシュが効いているはず...
      this.previewUrl = newImg.signedUrl as string;
    }
  }

  public async created(): Promise<void> {
    this.previewUrl = "";
  }
}
</script>

<style lang="scss" scoped>
/deep/ * #silentbox-overlay__embed {
  height: 85%;
  width: 90%;
}
</style>
