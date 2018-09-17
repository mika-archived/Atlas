<template lang="pug">
  #app
    navigation
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
