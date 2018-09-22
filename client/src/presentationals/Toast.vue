<template lang="pug">
  .toast(:class="classes")
    .message.is-info
      .message-header
        slot(name="header")
        button.delete(aria-label="delete" @click="onClose")
      .message-body
        slot(name="content")
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Toast extends Vue {
  @Prop() public visible!: boolean;

  public classes: string = "toast-visible";

  @Watch("isVisible")
  public onIsVisibleChanged(val: boolean, oldVal: boolean): void {
    if (val) {
      this.classes = "toast-visible";
    }
  }

  public onClose(): void {
    this.classes = "toast-hidden";
  }
}
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: 1000;
  max-width: 100%;
  width: 350px;

  @media (min-width: 380px) {
    left: 20px;
    bottom: 20px;
  }
  box-shadow: 2.5px 5px 10px 2.5px rgba(0, 0, 0, 0.25);

  p {
    margin: 0;
  }

  &-visible {
    opacity: 1;
  }

  &-hidden {
    opacity: 0;
  }
}
</style>
