<template lang="pug">
  p
    img.icon(src="../../assets/cloud2.png" height="20px")
    template(v-if="uploading")
      | {{total}} 個中 {{current}} 個目の画像をアップロードしています...
    template(v-else)
      | アップロードが完了しました
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class UploaderHeader extends Vue {
  @Prop() public uploading!: boolean;
  @Prop() public total!: File[];
  @Prop() public current!: boolean;
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
