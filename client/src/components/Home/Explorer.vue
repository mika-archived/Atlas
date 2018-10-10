<template lang="pug">
  .uk-container
    global-uploader
    .uk-section.uk-flex.uk-flex-center
      form.uk-search.uk-search-default(@submit.prevent="onSubmit")
        button(uk-search-icon)
        input.uk-search-input.width-1-1(v-model="q" type="search" placeholder="イラストを検索...")
    section(v-if="images.length === 0")
      .uk-placeholder.uk-text-center
        | 画像がまだアップロードされていません。
        br
        | ページ上の何処かに画像をドラッグ＆ドロップすることで、画像をアップロードできます。
        br
        | いくつか画像をアップロードすることで、このエリアに画像が表示されます。
    section(v-else)
      transition-group.image-container(class="uk-child-width-1-3 uk-child-width-1-4@s uk-child-width-1-5@m uk-child-width-1-6@l" name="flip" tag="div" uk-grid)
        router-link(v-for="image in images" :key="image.id" :to="`/images/${image.id}`")
          cloud-image.img(:image="image" mode="small")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

import CloudImage from "@/components/CloudImage.vue";
import GlobalUploader from "@/components/GlobalUploader.vue";
import { ActionDescriber } from "../../models/types";
import { IImage } from "../../shared/types";
import { IBindImagesParams } from "../../store/images";

// ref: https://codepen.io/nguernse/pen/JyYdNY
@Component({
  components: {
    GlobalUploader,
    CloudImage
  }
})
export default class Explorer extends Vue {
  public q: string = "";
  public key: string = "all";

  @Prop()
  public images!: IImage[];

  @Action("bindImages")
  public bindImages!: ActionDescriber<IBindImagesParams>;

  public async created(): Promise<void> {
    this.bindImages({ key: "all" });
  }

  private onSubmit(): void {
    console.log(this.q);
  }
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

.image-container {
  padding-bottom: 50px;

  a {
    transition: transform 0.25s;

    .img {
      max-height: 156px;
    }

    /deep/ img {
      height: 156px;
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
