<template lang="pug">
  #app
    navigation
    .container
      router-view
    atlas-footer
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import AtlasFooter from "@/presentationals/Footer.vue";
import Navigation from "@/presentationals/Navigation.vue";

@Component({
  components: {
    AtlasFooter,
    Navigation
  }
})
export default class App extends Vue {}
</script>


<style lang="scss">
html,
body {
  min-width: 100vw;
  min-height: 100vh;
}
</style>
