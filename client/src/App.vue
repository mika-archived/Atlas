<template lang="pug">
  #app.uk-offcanvas-content
    navigation(:has-session="hasSession")
    router-view
    .footer
      atlas-footer
    template(v-if="hasSession")
      global-uploader
      toast(:visible="true")
        uploader-header(slot="header" :uploading="true" :total="totalCountOfFiles" :current="uploadingCount")
        uploader-content(slot="content" :uploading="false" :files="queuedFiles" :current="uploadingCount")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

import GlobalUploader from "@/components/GlobalUploader.vue";
import UploaderContent from "@/components/Uploader/Content.vue";
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
    UploaderContent,
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

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.footer {
  margin-top: auto;
}
</style>
