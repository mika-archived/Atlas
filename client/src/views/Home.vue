<template lang="pug">
  div
    template(v-if="hasSession")
      explorer
    template(v-else)
      featured
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

import Explorer from "../components/Home/Explorer.vue";
import Featured from "../components/Home/Featured.vue";

@Component({
  components: {
    Explorer,
    Featured
  }
})
export default class Navigation extends Vue {
  @Getter("hasSession") public hasSession!: boolean;
}
</script>
