<template lang="pug">
  .toast(:class="classes")
    .message.is-info
      .message-header
        p {{title}}
        button.delete(aria-label="delete" @click="onClose")
      .message-body
        slot(body)
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Toast extends Vue {
  @Prop() public title!: string;
  @Prop() public isVisible!: boolean;

  public classes: string = "hidden";

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
  left: 20px;
  bottom: 20px;
  z-index: 1000;

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
