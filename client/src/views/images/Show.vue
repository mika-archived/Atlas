<template lang="pug">
  .uk-container
    template(v-if="hasError")
      error(mode="NotFound")
    template(v-else)
      // mobile
      .container(class="uk-hidden@m")
        ul(uk-tab)
          li
            a(href="#") Image
          li
            a(href="#") Info
        ul.uk-switcher
          li
            lightbox(:image="image")
              cloud-image.img(:image="image" mode="master" ratio="3")
          li
            .uk-container
              information(:image="image")

      // tablet ~
      .container(class="uk-visible@m")
        div(uk-grid)
          div(class="uk-width-2-3@m uk-width-3-4@l uk-width-4-5@xl")
            lightbox(:image="image")
              cloud-image.img(:image="image" mode="master" ratio="3")

          div(class="uk-width-1-3@m uk-width-1-4@l uk-width-1-5@xl")         
            information(:image="image")

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, State } from "vuex-class";

import CloudImage from "@/presentationals/CloudImage.vue";
import Error from "@/presentationals/Error.vue";
import Information from "@/presentationals/Images/Information.vue";
import Lightbox from "@/presentationals/Lightbox.vue";
import { ActionDescriber, Indexer, IState } from "../../models/types";
import { IImage } from "../../shared/types";
import { IBindImageParams } from "../../store/images";

@Component({
  components: {
    CloudImage,
    Error,
    Information,
    Lightbox
  }
})
export default class Show extends Vue {
  @Action("bindImage")
  public bindImage!: ActionDescriber<IBindImageParams>;

  @State((state: IState) => state.images)
  public images!: Indexer<IImage>;

  @State((state: IState) => state.images.hasError)
  public hasError!: boolean;

  public get image(): IImage {
    return this.images[this.$route.params.id];
  }

  public async created(): Promise<void> {
    if (!this.$route.params.id) {
      this.$router.push("/404");
      return;
    }
    this.bindImage({ id: this.$route.params.id });
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
