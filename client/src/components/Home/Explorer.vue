<template lang="pug">
  .uk-container
    .uk-section.uk-flex.uk-flex-center
      form.uk-search.uk-search-default
        span(uk-search-icon)
        input.uk-search-input.width-1-1(type="search" placeholder="イラストを検索...")
    section(v-if="images.length === 0")
      .uk-placeholder.uk-text-center
        | 画像がまだアップロードされていません。
        br
        | ページ上の何処かに画像をドラッグ＆ドロップすることで、画像をアップロードできます。
        br
        | いくつか画像をアップロードすることで、このエリアに画像が表示されます。
    section(v-else)
      div(class="uk-child-width-1-3 uk-child-width-1-4@s uk-child-width-1-5@m uk-child-width-1-6@l" uk-grid)
        cloud-image.img(v-for="image in images" :image="image")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

import { IImage } from "../../models/image";
import CloudImage from "../../presentationals/CloudImage.vue";

// ref: https://codepen.io/nguernse/pen/JyYdNY
@Component({
  components: {
    "cloud-image": CloudImage
  }
})
export default class GlobalUploader extends Vue {
  @Prop()
  public images!: IImage[];
}
</script>

<style lang="scss" scoped>
.uk-search-default {
  width: 80%;
}

.container {
  width: 80%;
  margin: 0 auto;
}

.img {
  height: 128px;
}
</style>
