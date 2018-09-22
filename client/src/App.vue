<template lang="pug">
  #app.uk-offcanvas-content
    navigation(:has-session="hasSession")
    router-view
    atlas-footer
    template(v-if="hasSession")
      global-uploader
      toast(:visible="true")
        template(slot="header")
          uploader-header(:uploading="true" :total="totalCountOfFiles" :current="uploadingCount")
        template(slot="content")
          p 3個のファイルをアップロードしました
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

import GlobalUploader from "@/components/GlobalUploader.vue";
import UploaderHeader from "@/components/Uploader/Header.vue";
import AtlasFooter from "@/presentationals/Footer.vue";
import Navigation from "@/presentationals/Navigation.vue";
import Toast from "@/presentationals/Toast.vue";

@Component({
  components: {
    AtlasFooter,
    GlobalUploader,
    Navigation,
    Toast,
    UploaderHeader
  }
})
export default class App extends Vue {
  @Getter("hasSession") public hasSession!: boolean;
  @Getter("queuedFiles") public queuedFiles!: File[];
  @Getter("totalCountOfFiles") public totalCountOfFiles!: number;
  @Getter("uploadingCount") public uploadingCount!: number;
}
</script>
