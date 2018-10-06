<template lang="pug">
  .full-width(:class="{'uk-inline': isLoadingUrl || !isLoadingImage}")
    template(v-if="isLoadingUrl")
      img(data-src="https://fakeimg.pl/200x200/000000%2C000/000000%2C000/" uk-img)
      .uk-overlay
        .uk-overlay-default.uk-position-cover
        .uk-overlay.uk-position-center
          div(:uk-spinner="spinner")
    template(v-else)
      img(:src="previewUrl" @load="load")
      template(v-if="!isLoadingImage")
        .uk-overlay
          .uk-overlay-default.uk-position-cover
          .uk-overlay.uk-position-center
            div(:uk-spinner="spinner")</template>

<script lang="ts">
import { storage } from "firebase";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { currentUser } from "../models/session";
import { IImage } from "../shared/types";

@Component
export default class CloudImage extends Vue {
  public isImgLoaded: boolean = false;
  public previewUrl: string = "";

  @Prop()
  public image!: IImage;

  @Prop()
  public mode!: string;

  @Prop({ default: 1 })
  public ratio!: number;

  @Watch("image", { deep: true })
  public async onImageChanged(newImg: IImage, oldImg: IImage): Promise<void> {
    this.previewUrl = "";
    this.isImgLoaded = false;
    await this.generateDownloadUrl(newImg);
  }

  public get isLoadingUrl(): boolean {
    return this.previewUrl === "";
  }

  public get isLoadingImage(): boolean {
    return this.isImgLoaded;
  }

  public get spinner(): string {
    return `ratio: ${this.ratio}`;
  }

  public async created(): Promise<void> {
    this.previewUrl = "";
    this.isImgLoaded = false;
    await this.generateDownloadUrl(this.image);
  }

  public load(): void {
    this.isImgLoaded = true;
  }

  private async generateDownloadUrl(img: IImage): Promise<void> {
    try {
      if (!img.user || !img.user.id) {
        return;
      }

      const ref = storage().refFromURL(
        `gs://storage.atlas.mochizuki.moe/${img.user.id}/${img.restrict}/${img.id}/${this.mode}`
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
.full-width {
  width: 100%;
  height: 100%;
}
</style>