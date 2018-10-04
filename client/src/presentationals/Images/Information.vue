<template lang="pug">
  div
    h4 Owner
    | {{owner}}

    h4 Access Restrict
    | {{restrict}}

    h4 Tags
    template(v-if="tags.length > 0")
      template(v-for="tag in tags")
        router-link.uk-button.uk-button-default(:to="`/?tag=${tag}`") {{tag}}
    template(v-else)
      | No tags

    h4 Information
    table.uk-table.uk-table-divider
      tbody
        tr
          td Date
          td {{timestamp}}
        tr
          td Version
          td {{version}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { IImage } from "../../models/image";

@Component
export default class Information extends Vue {
  @Prop()
  public image!: IImage;

  public get owner(): string {
    if (this.image) {
      return this.image.user ? this.image.user.username : "Unknown";
    }
    return "Loading...";
  }

  public get restrict(): string {
    if (this.image) {
      switch (this.image.restrict) {
        default:
        case "private":
          return "Private";

        case "limited":
          return "Limited";

        case "registered":
          return "Atlas Users";

        case "public":
          return "World Wide";
      }
    } else {
      return "Loading...";
    }
  }

  public get tags(): string[] {
    return this.image ? this.image.attributes : [];
  }

  public get timestamp(): string {
    if (this.image) {
      return new Date(this.image.timestamp).toLocaleString();
    } else {
      return "Loading...";
    }
  }

  public get version(): string {
    if (this.image) {
      return this.image.version;
    } else {
      return "Loading...";
    }
  }
}
</script>

<style lang="scss" scoped>
h4 {
  margin-bottom: 10px;
}

* + h4 {
  margin-top: 20px;
}

* + .uk-table {
  margin-top: 0;
}
</style>
