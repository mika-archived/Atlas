<template lang="pug">
  silentbox-single(:src="previewUrl")
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

  @Watch("image", { deep: true })
  public async onImageChanged(newImg: IImage, oldImg: IImage): Promise<void> {
    this.previewUrl = "#";
    await this.generateDownloadUrl(newImg);
  }

  public async created(): Promise<void> {
    this.previewUrl = "";
    await this.generateDownloadUrl(this.image);
  }

  private async generateDownloadUrl(img: IImage): Promise<void> {
    try {
      if (!img.user || !img.user.id) {
        return;
      }

      const ref = storage().refFromURL(
        `gs://storage.atlas.mochizuki.moe/${img.user.id}/${img.restrict}/${img.id}/master`
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
/deep/ * #silentbox-overlay__embed {
  height: 85%;
  width: 90%;
}
</style>
