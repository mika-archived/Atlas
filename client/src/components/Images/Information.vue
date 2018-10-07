<template lang="pug">
  div
    label-edit(:text="title" as="h4" @submit="onTitleChanged")
    label-edit(:text="caption" as="p" @submit="onCaptionChanged")

    h4 所有者
    p {{owner}}

    h4 アクセス制限
    p {{restrict}}

    h4 タグ
    template(v-if="tags.length > 0")
      template(v-for="tag in tags")
        router-link.uk-button.uk-button-default(:to="`/?tag=${tag}`") {{tag}}
    template(v-else)
      p 登録されていません

    h4 情報
    table.uk-table.uk-table-divider
      tbody
        tr
          td タイプ
          td {{format}}
        tr
          td 大きさ
          td {{dimensions}}
        tr
          td サイズ
          td {{size}}
        tr
          td 作成日
          td {{timestamp}}
</template>

<script lang="ts">
import prettysize from "prettysize";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

import LabelEdit from "../LabelEdit.vue";

import { ActionDescriber } from "../../models/types";
import { IImage, IUser } from "../../shared/types";
import { IAttachImageParams } from "../../store/images";

@Component({
  components: {
    LabelEdit
  }
})
export default class Information extends Vue {
  @Action("attachImage")
  public attachImage!: ActionDescriber<IAttachImageParams>;

  @Prop()
  public image!: IImage;

  public get title(): string {
    if (this.image && this.image.title) {
      return this.image.title;
    }
    return "No Title";
  }

  public get caption(): string {
    if (this.image && this.image.caption) {
      return this.image.caption;
    }
    return "No Caption";
  }

  public get owner(): string {
    if (this.image) {
      return this.image.user ? (this.image.user as IUser).username : "Unknown";
    }
    return "Loading...";
  }

  public get restrict(): string {
    if (this.image) {
      switch (this.image.restrict) {
        default:
        case "private":
          return "非公開";

        case "limited":
          return "共有ユーザー";

        case "registered":
          return "登録ユーザー";

        case "public":
          return "公開";
      }
    } else {
      return "Loading...";
    }
  }

  public get tags(): string[] {
    return this.image ? this.image.attributes : [];
  }

  public get format(): string {
    if (this.image && this.image.type) {
      return this.image.type.toLocaleUpperCase();
    }
    return "Loading...";
  }

  public get dimensions(): string {
    if (this.image && this.image.dimensions) {
      return `${this.image.dimensions[0]}x${this.image.dimensions[1]}`;
    }
    return "Loading...";
  }

  public get size(): string {
    if (this.image && this.image.size) {
      return prettysize(this.image.size, { places: 2 }).toLocaleUpperCase();
    }
    return "Loading...";
  }

  public get timestamp(): string {
    if (this.image) {
      return new Date(this.image.timestamp).toLocaleString();
    }
    return "Loading...";
  }

  private onTitleChanged(newTitle: string): void {
    this.attachImage({ id: this.image.id, obj: { title: newTitle } });
  }

  private onCaptionChanged(newCaption: string): void {
    this.attachImage({ id: this.image.id, obj: { caption: newCaption } });
  }
}
</script>

<style lang="scss" scoped>
h4,
/deep/ h4 {
  margin-bottom: 10px;
}

* + h4 {
  margin-top: 20px;
}

* + .uk-table {
  margin-top: 0;
}

* + p,
/deep/ * + p {
  margin-top: 0;
}
</style>
