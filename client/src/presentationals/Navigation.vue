<template lang="pug">
  .uk-container.uk-container-expand(uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky")
    nav.uk-navbar-container(uk-navbar)
      .uk-navbar-left
        router-link.uk-navbar-item.uk-logo(to="/")
          img(src="../assets/logo.png" height="40px")
</template>

<style lang="scss" scoped>
.uk-container {
  background-color: #f8f8f8;
}

img {
  height: 45px;
}
</style>
