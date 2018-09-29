<template lang="pug">
  #app.uk-offcanvas-content
    navigation(:is-registered-user="isRegisteredUser" :is-anonymous-user="isAnonymousUser")
    router-view
    .footer
      atlas-footer
    template(v-if="isRegisteredUser")
      global-uploader
      toast(:visible="isVisibleToast")
        uploader-header(slot="header" :uploading="isUploading" :files="workingFiles")
        uploader-content(slot="content" :uploading="isUploading" :files="workingFiles")
    template(v-if="isSessionLoading")
      .loading.uk-inline
        .uk-overlay-default.uk-position-cover
        .uk-overlay.uk-position-center
          div(uk-spinner="ratio: 3")

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
  @Getter("isRegisteredUser")
  public isRegisteredUser!: boolean;

  @Getter("isSessionLoading")
  public isSessionLoading!: boolean;

  @Getter("isAnonymousUser")
  public isAnonymousUser!: boolean;

  @Getter("isUploading")
  public isUploading!: boolean;

  @Getter("isVisibleToast")
  public isVisibleToast!: boolean;

  @Getter("workingFiles")
  public workingFiles!: File[];
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

.loading {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
}
</style>
