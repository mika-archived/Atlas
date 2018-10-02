<template lang="pug">
  img(:src="previewUrl")
</template>

<script lang="ts">
import { storage } from "firebase";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { IImage } from "../models/image";
import { currentUser } from "../models/session";

const placeholder = "https://fakeimg.mochizuki.moe/100x100/?text=%20";

@Component
export default class CloudImage extends Vue {
  public previewUrl: string = placeholder;

  @Prop()
  public image!: IImage;

  @Watch("image", { deep: true })
  public async onImageChanged(newImg: IImage, oldImg: IImage): Promise<void> {
    this.previewUrl = placeholder;
    await this.generateDownloadUrl(newImg);
  }

  public async created(): Promise<void> {
    await this.generateDownloadUrl(this.image);
  }

  private async generateDownloadUrl(img: IImage): Promise<void> {
    try {
      // XXX: Vuexfire が user (ref) を吹き飛ばすから...
      const user = await currentUser();
      const ref = storage().refFromURL(
        `gs://storage.atlas.mochizuki.moe/${user.uid}/${img.restrict}/${img.id}/square256`
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
