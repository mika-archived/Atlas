<template lang="pug">
  #app.uk-offcanvas-content
    navigation(:has-session="hasSession")
    router-view
    atlas-footer
    template(v-if="hasSession")
      global-uploader
      toast(title="Uploading images..." :is-visible="true")
        template(slot="header")
          p
            img.icon(src="./assets/cloud2.png" height="20px")
            | アップロードが完了しました
        template(slot="content")
          p 3個のファイルをアップロードしました
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";

import GlobalUploader from "@/components/GlobalUploader.vue";
import AtlasFooter from "@/presentationals/Footer.vue";
import Navigation from "@/presentationals/Navigation.vue";
import Toast from "@/presentationals/Toast.vue";

@Component({
  components: {
    AtlasFooter,
    GlobalUploader,
    Navigation,
    Toast
  }
})
export default class App extends Vue {
  @Getter("hasSession") public hasSession!: boolean;
}
</script>

<style lang="scss" scoped>
.icon {
  margin: 0 5px 0 0;
  height: 32px;
}
</style>
