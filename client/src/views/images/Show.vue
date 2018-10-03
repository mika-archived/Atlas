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
          cloud-image.img(:image="image" mode="master")
    // tablet ~
    .container(class="uk-visible@m")
      div(uk-grid)
        div(class="uk-width-2-3@m uk-width-3-4@l uk-width-4-5@xl")
          cloud-image.img(:image="image" mode="master")

        div(class="uk-width-1-3@m uk-width-1-4@l uk-width-1-5@xl")
          
          h4 Access Restrict

          h4 Tags

          h4 Information
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

import { IImage } from "../../models/image";
import { ActionDescriber } from "../../models/types";
import CloudImage from "../../presentationals/CloudImage.vue";
import { IGetImageParams } from "../../store/images";

@Component({
  components: {
    "cloud-image": CloudImage
  }
})
export default class Show extends Vue {
  @Getter("image")
  public image!: IImage;

  @Action("getImage")
  public getImage!: ActionDescriber<IGetImageParams>;

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
}

/deep/ img {
  max-height: calc(100vh - 80px);
  object-fit: contain;
  width: 100%;
}
</style>
