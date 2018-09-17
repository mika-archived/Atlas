<template lang="pug">
  .content
    breadcrumb
    section
      h1 About Atlas
      p
        | About page
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Breadcrumb from "@/presentationals/Breadcrumb.vue";

@Component({
  components: {
    Breadcrumb
  }
})
export default class About extends Vue {}
</script>
