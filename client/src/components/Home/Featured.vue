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
            div.fas.fa-user-secret.fa-2x
            | 柔軟なアクセス制限
          p
            | アップロードしたイラストには、柔軟なアクセス制限をかけることができます。
        div(class="uk-width-1-4@l uk-width-1-2@s")
          h3.title.is-4
            div.far.fa-draw-square.fa-2x
            | オリジナルを保存
          p
            | アップロードされたイラストはエンコードされることなく、そのままのファイルが維持されます。
        div(class="uk-width-1-4@l uk-width-1-2@s")
          h3.title.is-4
            div.fab.fa-creative-commons-nc-jp.fa-2x
            | 誰もが全ての機能を
          p
            | Atlas では機能の解放などに料金を必要としていません。誰もが全ての機能へアクセス可能です。

    section.uk-section.uk-container
      h3.title.is-4
        span.far.fa-search.fa-lg
        | 欲しい画像を、素早く確実に
      p
        | Atlas では、画像に対して pixiv やニコニコ静画などのように、イラストに対して複数のタグを付けて管理することが出来ます。
        br
        | 例えば、ある画像に「オリキャラ」「スタンプ」などといったタグを付けておくことで、
        | 直感的に、欲しい画像へと素早くアクセスすることが出来ます。
        br
        | また、検索にはインクリメンタルサーチを採用しているため、いちいち検索ボタンを押す必要もありません。
        br
        | 将来的には、機械学習を用いたイラストの自動タグ付けもサポートする予定です。
    
    section.uk-section.uk-container
      h3.title.is-4
        span.fas.fa-user-secret.fa-lg
        | 柔軟なアクセス制限
      p
        | アップロードしたイラストには、自由にアクセス制限をかけることが出来ます。
        br
        | アクセス制限には「プライベート」「指定したユーザー」「登録ユーザー」「全世界」の4種類があり、左から順にアクセス制限が緩くなっていきます。
        br
        | 「指定したユーザー」では任意の登録ユーザーを、「登録ユーザー」では Atlas に登録しているユーザーのみ、イラストへのアクセスを許可することが出来ます。
        br
        | 「全世界」に設定した場合は、全世界の人がイラストにアクセスできるようになりますが、外部サービスへ貼り付けるためのコードなどを発行することも可能です。

    section.uk-section.uk-container
      h3.title.is-4
        span.far.fa-draw-square.fa-lg
        | オリジナルをそのままで
      p
        | アップロードしたイラストは Twitter 等のようにサーバー側でエンコードされることはなく
        small *1
        | 、オリジナル画像がそのまま保存されます。
        br
        | また、オリジナル画像にはいつでも自由にアクセス可能であり、アクセスのために URL 改変など一手間加えたりする必要はありません。
        br
        | そのため、作業中データのバックアップや、贈り物としてもらったイラストなどを、そのままの形で保存し、検索できるようになります。
      p
        small *1: 検索画面でのサムネイル表示など、縮小表示されるものは通信容量削減のため、エンコードされます。

    section.uk-section.uk-container
      h3.title.is-4
        span.fab.fa-creative-commons-nc-jp.fa-lg
        | プレミアムな機能に料金は必要ありません
      p
        | Atlas の思想として、特定の機能の解放のために、使用料金を頂くことはありません。
        small *1
        br
        | 全てのユーザーが、 Atlas に搭載されている全ての機能へと、いつでも自由にアクセスすることが出来ます。
        br
        | また、今後追加される新機能についても、全てのユーザーがアクセス可能です。
      p
        small *1: 保存容量の拡大など、機能に関係が無い部分について、運営を続けるために料金を頂く可能性はあります。

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
  &.far,
  &.fab,
  &.fas,
  &.fal {
    display: block;
    padding-bottom: 15px;
  }
}

span {
  &.far,
  &.fab,
  &.fas,
  &.fal {
    display: inline;
    margin-right: 10px;
  }
}
</style>
