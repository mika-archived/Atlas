<template lang="pug">
  .uploader.uk-overlay.uk-overlay-primary.uk-inline(:class="classes")
    .uk-position-center
      .uk-text-center
        img(src="../assets/cloud1.png")
        h3 ここにドロップしてアップロード
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";

import { ALLOWED_TYPES } from "../models/constants";
import { ActionDescriber, IState } from "../models/types";
import { IAddToUploadQueueParams } from "../store/uploader";

// ref: https://codepen.io/nguernse/pen/JyYdNY
@Component
export default class GlobalUploader extends Vue {
  public classes: string = "";

  @Action("addToWorkingFiles")
  public addToWorkingFiles!: ActionDescriber<IAddToUploadQueueParams>;

  @Action("clearWorkingFiles")
  public clearWorkingFiles!: ActionDescriber;

  @Action("upload")
  public upload!: ActionDescriber;

  @State((state: IState) => state.uploader.uploading)
  public isUploading!: boolean;

  public mounted(): void {
    window.addEventListener("dragenter", this.onDragEnter);
    window.addEventListener("dragover", this.onDragOver);
    window.addEventListener("dragleave", this.onDragLeave);
    window.addEventListener("drop", this.onDrop);
  }

  public beforeDestroy(): void {
    window.removeEventListener("dragenter", this.onDragEnter);
    window.removeEventListener("dragover", this.onDragOver);
    window.removeEventListener("dragleave", this.onDragLeave);
    window.removeEventListener("drop", this.onDrop);
  }

  private onDragEnter(event: DragEvent) {
    event.preventDefault();
    this.classes = "visible";
  }

  private onDragOver(event: DragEvent) {
    event.preventDefault();
    this.classes = "visible";
  }

  private onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.classes = "hidden";
  }

  private onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer == null) {
      return;
    }

    this.classes = "hidden";
    const files: File[] = [];
    for (let i = 0; i < event.dataTransfer.files.length; i++) {
      const file = event.dataTransfer.files.item(i);
      if (file != null && ALLOWED_TYPES.indexOf(file.type) >= 0) {
        files.push(file);
      }
    }

    if (this.isUploading) {
      this.addToWorkingFiles({ files });
    } else {
      this.clearWorkingFiles();
      this.addToWorkingFiles({ files });
      this.upload();
    }
  }
}
</script>

<style lang="scss" scoped>
.uploader {
  // position
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;

  // size
  height: 100%;
  width: 100%;

  // visibility
  visibility: hidden;
  opacity: 0;

  // animation
  transition: visibility 200ms, opacity 200ms;

  img {
    width: 75%;
  }
}

.visible {
  visibility: visible;
  opacity: 1;
}

.hidden {
  visibility: hidden;
  opacity: 0;
}
</style>
