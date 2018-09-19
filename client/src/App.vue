<template lang="pug">
  #app
    navigation(:has-session="hasSession")
    router-view
    atlas-footer
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";

import AtlasFooter from "@/presentationals/Footer.vue";
import Navigation from "@/presentationals/Navigation.vue";

@Component({
  components: {
    AtlasFooter,
    Navigation
  }
})
export default class App extends Vue {
  @Getter("hasSession") public hasSession!: boolean;
}
</script>
