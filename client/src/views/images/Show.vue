<template lang="pug">
  .uk-container
    // mobile
    .container(class="uk-hidden@m")
      ul(uk-tab)
        li
          a(href="#") Image
        li
          a(href="#") Info
      ul.uk-switcher
        li
          cloud-image.img(:image="image" mode="master" ratio="3")
        li
          .uk-container
            information(:image="image")

    // tablet ~
    .container(class="uk-visible@m")
      div(uk-grid)
        div(class="uk-width-2-3@m uk-width-3-4@l uk-width-4-5@xl")
          cloud-image.img(:image="image" mode="master" ratio="3")

        div(class="uk-width-1-3@m uk-width-1-4@l uk-width-1-5@xl")         
          information(:image="image")

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

import CloudImage from "@/presentationals/CloudImage.vue";
import Information from "@/presentationals/Images/Information.vue";
import { IImage } from "../../models/image";
import { ActionDescriber } from "../../models/types";
import { IGetImageParams } from "../../store/images";

@Component({
  components: {
    CloudImage,
    Information
  }
})
export default class Show extends Vue {
  @Getter("image")
  public image!: IImage;

  @Action("getImage")
  public getImage!: ActionDescriber<IGetImageParams>;

  public get restrict(): string {
    if (this.image) {
      switch (this.image.restrict) {
        default:
        case "private":
          return "Private";

        case "limited":
          return "Limited";

        case "registered":
          return "Atlas Users";

        case "public":
          return "World Wide";
      }
    } else {
      return "Loading...";
    }
  }

  public get tags(): string[] {
    return this.image ? this.image.attributes : [];
  }

  public get timestamp(): string {
    if (this.image) {
      return new Date(this.image.timestamp).toLocaleString();
    } else {
      return "Loading...";
    }
  }

  public async created(): Promise<void> {
    if (!this.$route.params.id) {
      this.$router.push("/404");
      return;
    }
    this.getImage({ id: this.$route.params.id });
  }
}
</script>

<style lang="scss" scoped>
.uk-container {
  width: calc(100% - 30px);

  @media (min-width: 640px) {
    width: calc(100% - 60px);
  }

  .img {
    max-height: calc(100vh - 132px);

    @media (min-width: 960px) {
      max-height: calc(100vh - 80px);
    }

    /deep/ img {
      max-height: calc(100vh - 132px);
      object-fit: contain;
      width: 100%;

      @media (min-width: 960px) {
        max-height: calc(100vh - 80px);
      }
    }
  }
}
</style>
