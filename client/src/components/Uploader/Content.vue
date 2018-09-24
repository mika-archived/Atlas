<template lang="pug">
  div
    template(v-if="uploading")
      .single
        | アップロードしています :&nbsp;
        b {{currentFile()}}
    template(v-else)
      p {{total}} 個の画像のアップロードが完了しました
      .uk-child-width-1-10.uk-grid-collapse(uk-grid)
        div(v-for="(file, idx) in uploadedFiles" :key="idx")
          img(:src="asBlob(file)")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { FileWrapper, UploadState } from "../../models/FileWrapper";

@Component
export default class UploaderContent extends Vue {
  @Prop() public uploading!: boolean;
  @Prop() public files!: FileWrapper[];

  public get total(): number {
    return this.files.filter(w => w.state === UploadState.UPLOADED).length;
  }

  public get uploadedFiles(): FileWrapper[] {
    return this.files.filter(w => w.state === UploadState.UPLOADED);
  }

  public currentFile(): string {
    const files = this.files.filter(w => w.state === UploadState.UPLOADING);
    if (files.length === 0) {
      return ""; //
    }
    return files[0].name;
  }

  public asBlob(file: FileWrapper): string {
    return file.asBlob();
  }
}
</script>

<style lang="scss" scoped>
.single {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.uk-child-width-1-10 > * {
  width: calc(100% * 1 / 10);

  img {
    object-fit: cover;
    height: 36px;
    width: 36px;
  }
}
</style>
