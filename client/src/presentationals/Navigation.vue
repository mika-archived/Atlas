<template lang="pug">
  .uk-container.uk-container-expand(uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky")
    nav.uk-navbar-container(uk-navbar)
      .uk-navbar-left
        router-link.uk-navbar-item.uk-logo(to="/")
          img(src="../assets/logo.png" height="40px")
      .uk-navbar-right
        template(v-if="!hasSession")
          ul.uk-navbar-nav
            li
              router-link(to="/users/signup") アカウント登録
            li
              router-link(to="/users/login") ログイン
        template(v-else)
          ul.uk-navbar-nav
            li
              router-link(to="/upload") 
                i.fal.fa-upload.fa-fw
                | アップロード
            li
              router-link(to="/users/logout") ログアウト
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, State } from "vuex-class";

@Component
export default class Navigation extends Vue {
  @Getter("hasSession") public hasSession!: boolean;
}
</script>


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
