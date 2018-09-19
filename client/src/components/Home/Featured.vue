<template lang="pug">
  div
    .uk-height-medium.uk-flex.uk-flex-center.uk-flex-middle.uk-background-cover.uk-inline.uk-light(
     data-src="/img/hero.jpg"
     data-sizes="(min-width: 650px) 650px, 100vw"
     uk-img
    )
      .uk-overlay-primary.uk-position-cover
      .uk-overlay.uk-position-center.uk-light
        h1.uk-heading-primary.uk-text-center Atlas
        p
          | タグベースのイラスト管理サービス
    section.uk-section.uk-container
      div.uk-text-center(uk-grid)
        div(class="uk-width-1-4@l uk-width-1-2@s")
          h3.title.is-4
            div.far.fa-search.fa-2x
            | 素早くアクセス
          p
            | タグを用いることで、探しているイラストに早く、直感的かつ簡単にアクセスできます。
        div(class="uk-width-1-4@l uk-width-1-2@s")
          h3.title.is-4
            div.fab.fa-osi.fa-2x
            | オープンソース
          p
            | 誰もが検閲や制限のない、自分のためだけのサーバーを建てることができます。
        div(class="uk-width-1-4@l uk-width-1-2@s")
          h3.title.is-4
            div.fas.fa-user-secret.fa-2x
            | 自由なアクセス
          p
            | アップロードしたイラストには、自由にアクセス制限をかけることができます。
        div(class="uk-width-1-4@l uk-width-1-2@s")
          h3.title.is-4
            div.fal.fa-usd-circle.fa-2x
            | 無料
          p
            | 全ての人が無料で、一切の機能を制限されることなく使うことができます。
</template>


<style lang="scss" scoped>
.hero {
  p {
    max-width: 100vw;
    margin: 0;
  }
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
