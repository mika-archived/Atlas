<template lang="pug">
  .uk-container
    template(v-if="mode === 'NotFound'")
      h2 Error: 404 Not Found
      p
        | お探しのファイルはストレージに保存されていないか、所有者によりアクセスが禁じられています。
        br
        | 自身のファイルの場合は、ファイルを削除していないかを確認してください。
        br
        | 共有されたファイルの場合は、所有者にアクセス制限が正しいかお問い合わせください。
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Show extends Vue {
  @Prop()
  public mode!: string;
}
</script>
