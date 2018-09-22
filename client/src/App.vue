<template lang="pug">
  #app.uk-offcanvas-content
    navigation(:has-session="hasSession")
    router-view
    atlas-footer
    template(v-if="hasSession")
      global-uploader
      toast(title="Uploading images..." :is-visible="true")
        template(slot-scope="content")
          p アップロードしています...
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
