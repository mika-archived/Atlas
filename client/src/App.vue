<template lang="pug">
  #app.uk-offcanvas-content
    navigation
    router-view
    .footer
      atlas-footer
    template(v-if="$currentUser.isRegistered")
      toast(:visible="isVisibleToast")
        uploader-header(slot="header" :uploading="isUploading" :files="workingFiles")
        uploader-content(slot="content" :uploading="isUploading" :files="workingFiles" :progress="progress")
    template(v-if="$currentUser.isLoading")
      .loading.uk-inline
        .uk-overlay-default.uk-position-cover
        .uk-overlay.uk-position-center
          div(uk-spinner="ratio: 3")

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

import AtlasFooter from "@/components/Footer.vue";
import Navigation from "@/components/Navigation.vue";
import Toast from "@/components/Toast.vue";
import UploaderContent from "@/components/Uploader/Content.vue";
import UploaderHeader from "@/components/Uploader/Header.vue";

@Component({
  components: {
    AtlasFooter,
    Navigation,
    Toast,
    UploaderContent,
    UploaderHeader
  }
})
export default class App extends Vue {
  @Getter("isUploading")
  public isUploading!: boolean;

  @Getter("progress")
  public progress!: number;

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
