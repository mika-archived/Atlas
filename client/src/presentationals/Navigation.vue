<template lang="pug">
  .uk-container.uk-container-expand(uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky")
    nav.uk-navbar-container(uk-navbar)
      .uk-navbar-left
        router-link.uk-navbar-item.uk-logo(to="/")
          img(src="../assets/logo.png" height="40px")
      .uk-navbar-right
        ul.uk-navbar-nav
          li
            router-link(to="/users/signup") アカウント登録
          li
            router-link(to="/users/login") ログイン
</template>

<style lang="scss" scoped>
$navbar-bg-color: white;

.uk-container {
  background-color: $navbar-bg-color;
}

.uk-navbar-container:not(.uk-navbar-transparent) {
  background: $navbar-bg-color;
}

img {
  height: 45px;
}
</style>
