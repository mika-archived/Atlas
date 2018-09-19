<template lang="pug">
  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, State } from "vuex-class";

@Component
export default class Logout extends Vue {
  @Action("logout") public logout!: () => Promise<void>;
  @Getter("hasSession") public hasSession!: boolean;

  public async created(): Promise<void> {
    await this.logout();
    this.$router.push("/");
  }
}
</script>
