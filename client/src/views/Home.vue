<template lang="pug">
  #home
    section.hero.is-medium.is-info.is-bold
      .hero-body
        .container
          h1.title
            | Atlas
          h2.subtitle
            | タグベースのイラスト管理・共有サービス
    
    section#featured.container
      .columns
        .column.has-text-centered
          div
            h2.title.is-4
              div.far.fa-search.fa-2x
              | 素早くアクセス
            p
              | タグを用いることで、探しているイラストに早く、簡単にアクセスできます。
        .column.has-text-centered
          div
            h2.title.is-4
              div.fab.fa-osi.fa-2x
              | オープンソース
            p
              | 誰もが制限のない、自分のためだけのサーバーを建てることが出来ます。
        .column.has-text-centered
          div
            h2.title.is-4
              div.fas.fa-user-secret.fa-2x
              | 自由なアクセス
            p
              | アップロードしたイラストには、アクセス権限を自由に設定することが出来ます。
        .column.has-text-centered
          div
            h2.title.is-4
              div.fal.fa-usd-circle.fa-2x
              | 無料
            p
              | 誰もが無料で、全ての機能を制限されることなく使うことが出来ます。
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.container-reset {
  padding-right: initial;
  padding-left: initial;
}

section:not(:first-child) {
  padding-top: 40px;
  padding-bottom: 30px;
}

section:nth-child(2) {
  padding-top: 50px;
}

// Font Awesome Overrides
div {
  .far,
  .fab,
  .fas,
  .fal {
    display: block;
    padding-bottom: 15px;
  }
}
</style>
