<template lang="pug">
  p
    template(v-if="uploading")
      | アップロードしています...&nbsp;
      b {{currentFile()}}
    template(v-else)
      p {{total}} 個の画像のアップロードが完了しました
      .uk-child-width-1-10.uk-grid-collapse(uk-grid)
        div(v-for="(file, idx) in files" :key="idx")
          img(:src="asBlob(file)")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class UploaderContent extends Vue {
  @Prop() public uploading!: boolean;
  @Prop() public files!: File[];
  @Prop() public current!: number;

  public get total(): number {
    return this.files.length;
  }

  public currentFile(): string {
    return "hoge.png";
  }

  public asBlob(file: File): string {
    console.log(file);
    return URL.createObjectURL(file);
  }
}
</script>

<style lang="scss" scoped>
.uk-child-width-1-10 > * {
  width: calc(100% * 1 / 10);

  img {
    object-fit: cover;
    height: 36px;
    width: 36px;
  }
}
</style>
