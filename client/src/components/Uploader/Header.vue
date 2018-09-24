<template lang="pug">
  p
    img.icon(src="../../assets/cloud2.png" height="20px")
    template(v-if="uploading")
      | アップロード中... {{current}}枚 / {{total}}枚
    template(v-else)
      | アップロードが完了しました
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { FileWrapper, UploadState } from "../../models/FileWrapper";

@Component
export default class UploaderHeader extends Vue {
  public current: number = 1;
  @Prop() public uploading!: boolean;
  @Prop() public files!: FileWrapper[];

  public get total(): number {
    return this.files.length;
  }

  @Watch("files")
  public onFilesChanged(newValue: FileWrapper[], oldValue: FileWrapper[]): void {
    this.current = newValue.filter(w => w.state !== UploadState.QUEUED).length;
    // this.$forceUpdate();
  }
}
</script>

<style lang="scss" scoped>
p {
  padding-right: 10px;
}

.icon {
  margin: 0 5px 0 0;
  height: 32px;
}
</style>
