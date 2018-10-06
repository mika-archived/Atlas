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
            div(:uk-spinner="spinner")
          
</template>

<script lang="ts">
import { auth, storage } from "firebase";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Action } from "vuex-class";

import { fetchImageData } from "../models/api";
import { IImageExtends } from "../models/extends";
import { currentUser } from "../models/session";
import { ActionDescriber } from "../models/types";
import { IImage } from "../shared/types";
import { IAttachImageParams } from "../store/images";

@Component
export default class CloudImage extends Vue {
  public isImgLoaded: boolean = false;
  public previewUrl: string = "";

  @Action("attachImage")
  public attachImage!: ActionDescriber<IAttachImageParams>;

  @Prop()
  public image!: IImageExtends;

  @Prop({ default: "square192" })
  public mode!: string;

  @Prop({ default: 1 })
  public ratio!: number;

  @Prop({ default: false })
  public store!: boolean;

  @Prop({ default: "" })
  public from!: string;

  @Watch("image", { deep: true })
  public async onImageChanged(newImg: IImageExtends, oldImg: IImageExtends): Promise<void> {
    await this.publishImageUrl();
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

  public created(): void {
    this.previewUrl = "";
    this.isImgLoaded = false;
  }

  public async mounted(): Promise<void> {
    await this.publishImageUrl();
  }

  public load(): void {
    this.isImgLoaded = true;
  }
  private async publishImageUrl(): Promise<void> {
    this.previewUrl = "";
    this.isImgLoaded = false;

    if (!this.image) {
      return;
    }

    if (!this.image.signedUrl && this.image.signedUrl !== "") {
      if (this.store) {
        if (this.from === "") {
          await this.attachImage({ id: this.image.id, size: this.mode });
          this.previewUrl = this.image.signedUrl;
        }
      } else {
        this.previewUrl = await fetchImageData(this.image.id, this.mode);
      }
    } else {
      this.previewUrl = this.image.signedUrl;
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
