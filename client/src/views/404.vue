<template lang="pug">
  .uk-container
    breadcrumb
    section
      h2 404 Not Found
      p
        | アクセスしようとしたページはないよ(´・ω・`)
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Breadcrumb from "@/presentationals/Breadcrumb.vue";

@Component({
  components: {
    Breadcrumb
  }
})
export default class Error404 extends Vue {}
</script>
