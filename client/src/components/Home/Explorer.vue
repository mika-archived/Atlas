<template lang="pug">
  .uk-container
    .uk-section.uk-flex.uk-flex-center
      form.uk-search.uk-search-default
        span(uk-search-icon)
        input.uk-search-input.width-1-1(type="search" placeholder="イラストを検索...")
    section
      .uk-placeholder.uk-text-center
        | 画像がまだアップロードされていません。
        br
        | ページ上の何処かに画像をドラッグ＆ドロップすることで、画像をアップロードできます。
        br
        | いくつか画像をアップロードすることで、このエリアに画像が表示されます。
</template>

<style lang="scss" scoped>
.uk-search-default {
  width: 80%;
}

.container {
  width: 80%;
  margin: 0 auto;
}
</style>
