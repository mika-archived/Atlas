<template lang="pug">
  .uk-container
    .uk-section.uk-flex.uk-flex-center
      form.uk-search.uk-search-default
        span(uk-search-icon)
        input.uk-search-input.width-1-1(type="search" placeholder="イラストを検索...")

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component
export default class Navigation extends Vue {
  @Getter("hasSession") public hasSession!: boolean;
}
</script>

<style lang="scss" scoped>
.uk-search-default {
  width: 80%;
}

.container {
  width: 80%;
  margin: 0 auto;
}
</style>
