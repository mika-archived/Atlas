<template lang="pug">
  div
    template(v-if="isEditMode")
        input.uk-input(v-model="editableText" ref="input" @blur="onBlur" @keyup.enter="onEnter")
    template(v-else)
      component.border(:is="as" @click="onClick")
        | {{editableText}}
</template>

<script lang="ts">
import { throttle } from "lodash";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class LabelEdit extends Vue {
  public isEditMode: boolean = false;
  public editableText: string = "";
  public classes: string = "";

  @Prop()
  public as!: string;

  @Prop()
  public text!: string;

  @Watch("text")
  public onTextChanged(newText: string, oldText: string): void {
    this.editableText = this.text;
  }

  public mounted(): void {
    this.editableText = this.text;
  }

  private onClick(): void {
    this.isEditMode = true;
    this.$nextTick(() => {
      (this.$refs.input as HTMLInputElement).focus();
    });
  }

  private onBlur(): void {
    if (!this.isEditMode) {
      return;
    }

    this.isEditMode = false;
    this.emit();
  }

  private onEnter(): void {
    if (!this.isEditMode) {
      return;
    }

    this.isEditMode = false;
    this.emit();
  }

  private emit(): void {
    throttle(() => {
      this.$emit("submit", this.editableText);
    }, 1000)();
  }
}
</script>

<style lang="scss" scoped>
.border {
  padding: 1px;

  &:hover {
    padding: 0px;
    border: 1px solid #ccc;
  }
}
</style>
