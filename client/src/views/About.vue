<template lang="pug">
  .uk-container
    breadcrumb
    section
      h1 Atlas について
      p
        | Atlas は、イラストなどの画像をクラウド上でより便利に管理するための Web アプリケーションです。
        br
        | Google Photo や Amazon Prime Photo 等のように、画像の保存が無制限...という訳ではありませんが、
        | Altas ではイラストに重きを置いて開発を行っています。
        br
        | タグベースの検索やエンコードを行わないこと、自由なアクセス制限など、多くの機能を備えています。

      h2 使用料金について
      p
        | Atlas は現在 Beta 版のため、ご利用に関して使用料金は頂いておりません。
        br
        | しかしながら、現在利用頂いている機能については、正式版以降も無料で使い続けることが可能です。
        br
        | また、今後追加される新機能についても、無料でお使い頂けます。

      h2 運営者について
      p
        | 開発・運営ともに
        a(href="https://twitter.com/MikazukiFuyuno" target="_blank") @MikazukiFuyuno
        | が一人で行っています。
        br
        | 連絡・不正利用の通報・ご要望・その他お問い合わせについては、下記のメールアドレスまでお願いいたします。
        br
        | ※返信まで最大一週間ほど時間を頂きます。
        address
          span.fas.fa-envelope
          | &nbsp;
          | me@mochizuki.moe
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Breadcrumb from "@/components/Breadcrumb.vue";

@Component({
  components: {
    Breadcrumb
  }
})
export default class About extends Vue {}
</script>
