<template lang="pug">
  silentbox-single(:src="`https://storage.atlas.mochizuki.moe/media/${image.id}/xlarge`")
    slot
</template>

<script lang="ts">
import { storage } from "firebase";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { currentUser } from "../models/session";
import { IImage } from "../shared/types";

@Component
export default class CloudImage extends Vue {
  public previewUrl: string = "https://fakeimg.mochizuki.moe/100x100/";

  @Prop()
  public image!: IImage;
}
</script>

<style lang="scss" scoped>
/deep/ * #silentbox-overlay__embed {
  height: 85%;
  width: 90%;
}
</style>
