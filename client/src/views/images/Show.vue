<template lang="pug">
  .lightbox
    .uk-container.uk-container-expand(uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky")
      nav.uk-navbar-container(uk-navbar)
        .uk-navbar-left
          router-link.uk-navbar-item.uk-logo(to="/")
            img(src="../../assets/logo.png" height="40px")

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Show extends Vue {
  public created(): void {
    const body = document.querySelector("body") as HTMLBodyElement;
    body.style.overflowY = "hidden";
  }

  public destroyed(): void {
    const body = document.querySelector("body") as HTMLBodyElement;
    body.style.overflowY = "auto";
  }
}
</script>
