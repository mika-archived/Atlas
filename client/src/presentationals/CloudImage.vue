<template lang="pug">
  img(:src="previewUrl")
</template>

<script lang="ts">
import { storage } from "firebase";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { IImage } from "../models/image";
import { currentUser } from "../models/session";

@Component
export default class CloudImage extends Vue {
  public previewUrl: string = "https://fakeimg.mochizuki.moe/100x100/?text=%20";

  @Prop()
  public image!: IImage;

  @Watch("image", { deep: true })
  public async onImageChanged(newImg: IImage, oldImg: IImage): Promise<void> {
    try {
      // XXX: Vuexfire が user (ref) を吹き飛ばすから...
      const user = await currentUser();
      const ref = storage().refFromURL(
        `gs://storage.atlas.mochizuki.moe/${user.uid}/${newImg.restrict}/${newImg.id}/square350`
      );
      const url = await ref.getDownloadURL();
      if (/&token=/.test(url)) {
        this.previewUrl = url;
      } else {
        console.warn(`Failed to create a download url, retry...`);
      }
    } catch (err) {
      console.warn(err);
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  object-fit: cover;
}
</style>
