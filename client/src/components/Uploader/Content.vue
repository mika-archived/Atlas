<template lang="pug">
  div
    template(v-if="uploading")
      .single
        | アップロードしています :&nbsp;
        b {{currentFile()}}
    template(v-else)
      template(v-if="uploadedFiles.length > 0")
        p {{uploadedFiles.length}} 枚のアップロードが完了しました
        .uk-child-width-1-10.uk-grid-collapse(uk-grid)
          div(v-for="(file, idx) in uploadedFiles" :key="idx")
            router-link(:to="`/images/${file.id}`")
              img(:src="asBlob(file)")
      template(v-if="failedFiles.length > 0")
        p {{failedFiles.length}} 枚のアップロードに失敗しました
        .uk-child-width-1-10.uk-grid-collapse(uk-grid)
          div(v-for="(file, idx) in failedFiles" :key="idx")
            img(:src="asBlob(file)")</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { FileWrapper, UploadState } from "../../models/FileWrapper";

@Component
export default class UploaderContent extends Vue {
  @Prop()
  public uploading!: boolean;
  @Prop()
  public files!: FileWrapper[];

  public get total(): number {
    return this.files.filter(w => w.state === UploadState.UPLOADED).length;
  }

  public get uploadedFiles(): FileWrapper[] {
    return this.files.filter(w => w.state === UploadState.UPLOADED);
  }

  public get failedFiles(): FileWrapper[] {
    return this.files.filter(w => w.state === UploadState.FAILED);
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
