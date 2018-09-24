<template lang="pug">
  #app.uk-offcanvas-content
    navigation(:has-session="hasSession")
    router-view
    .footer
      atlas-footer
    template(v-if="hasSession")
      global-uploader
      toast(:visible="isVisibleToast")
        uploader-header(slot="header" :uploading="isUploading" :files="workingFiles")
        uploader-content(slot="content" :uploading="isUploading" :files="workingFiles")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

import GlobalUploader from "@/components/GlobalUploader.vue";
import Toast from "@/components/Toast.vue";
import UploaderContent from "@/components/Uploader/Content.vue";
import UploaderHeader from "@/components/Uploader/Header.vue";
import AtlasFooter from "@/presentationals/Footer.vue";
import Navigation from "@/presentationals/Navigation.vue";

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
  @Getter("isUploading") public isUploading!: boolean;
  @Getter("isVisibleToast") public isVisibleToast!: boolean;
  @Getter("workingFiles") public workingFiles!: File[];
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
