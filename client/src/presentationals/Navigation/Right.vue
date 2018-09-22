<template lang="pug">
  .uk-navbar-right
    template(v-if="!hasSession")
      hamburger
        template(slot-scope="content")
          li
            router-link(to="/users/signup") アカウント登録
          li
            router-link(to="/users/login") ログイン
    template(v-else)
      hamburger
        template(slot-scope="content")
          li
            router-link(to="/images/upload") 
              i.fal.fa-upload.fa-fw(class="uk-visible@s")
              | アップロード
          li
            router-link(to="/users/my") マイページ
          li
            router-link(to="/users/logout") ログアウト
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Hamburger from "./Hamburger.vue";

@Component({
  components: {
    Hamburger
  }
})
export default class Right extends Vue {
  @Prop() public hasSession!: boolean;
}
</script>
