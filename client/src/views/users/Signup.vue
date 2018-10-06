<template lang="pug">
  .uk-container
    .uk-flex.uk-flex-center
      section.uk-section.uk-width-large
        img.uk-align-center(src="../../assets/logo.png")

        form.uk-form-stacked
          fieldset.uk-fieldset
            legend.uk-legend 新規登録

            .uk-alert-danger(uk-alert)
              | Atlas は現在 Alpha バージョンです。
              br
              | 予期せぬ不具合などが発生する可能性があります。


            .uk-margin
              button.uk-button.uk-button-primary.uk-width-1-1(@click.prevent="onClick")
                i.fab.fa-google.fa-fw
                | Google アカウントで登録する

            .uk-margin
              p
                small
                  | 登録すると、
                  router-link(to="/tos") 利用規約
                  | と
                  router-link(to="/privacy") プライバシーポリシー
                  | に従うことに同意したことになります。
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

import { ActionDescriber } from "../../models/types";

@Component
export default class Signup extends Vue {
  @Action("login")
  public login!: ActionDescriber;

  @Action("verifyCredentials")
  public verifyCredentials!: ActionDescriber;

  @Getter("isRegisteredUser")
  public isRegisteredUser!: boolean;

  public async onClick(): Promise<void> {
    await this.login();
  }

  public async created(): Promise<void> {
    await this.verifyCredentials();
    if (this.isRegisteredUser) {
      this.$router.push("/");
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  i {
    padding-right: 5px;
  }
}
</style>
