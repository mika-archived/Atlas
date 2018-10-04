<template lang="pug">
  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

import { ActionDescriber } from "../../models/types";

@Component
export default class Logout extends Vue {
  @Action("logout")
  public logout!: ActionDescriber;

  public async created(): Promise<void> {
    await this.logout();
    this.$router.push("/");
  }
}
</script>
