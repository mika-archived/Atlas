<template lang="pug">
  .full-width(:class="{'uk-inline': !isLoadingImage}")
    img(:src="src" @load="onLoaded")
    template(v-if="!isLoadingImage")
      img(src="https://fakeimg.mochizuki.moe/100x100/000000%2C000/000000%2C000/" uk-img)
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
    if (newImg && oldImg && newImg.id === oldImg.id) {
      return;
    }
    this.isImgLoaded = false;
  }

  public get isLoadingImage(): boolean {
    return this.isImgLoaded;
  }

  public get src(): string {
    if (this.image) {
      if (this.image.thumbnails && (this.image.thumbnails as any)[this.mode]) {
        return `https://storage.atlas.mochizuki.moe/media/${this.image.id}/${this.mode}_pr0`;
      } else {
        return `https://storage.atlas.mochizuki.moe/media/${this.image.id}/${this.mode}`;
      }
    }
    return "";
  }

  public get spinner(): string {
    return `ratio: ${this.ratio}`;
  }

  public async created(): Promise<void> {
    this.isImgLoaded = false;
  }

  public onLoaded(): void {
    this.isImgLoaded = true;
  }
}
</script>

<style lang="scss" scoped>
.full-width {
  width: 100%;
  height: 100%;
}

.loading {
  height: 100%;
}
</style>
