<template lang="pug">
  img(:data-src="gravatarUrl" uk-img)
</template>

<script lang="ts">
import md5 from "md5";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Gravatar extends Vue {
  @Prop() public email!: boolean;
  @Prop({ default: null })
  public size!: number | null;

  public get gravatarUrl(): string {
    if (this.size) {
      return `https://www.gravatar.com/avatar/${md5(this.email)}?s=${this.size}`;
    } else {
      return `https://www.gravatar.com/avatar/${md5(this.email)}`;
    }
  }
}
</script>
