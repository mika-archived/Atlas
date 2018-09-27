<template lang="pug">
  .uk-container
    .uk-flex.uk-flex-center
      section.uk-section.uk-width-large
        img.uk-align-center(src="../../assets/logo.png")

        form.uk-form-stacked
          fieldset.uk-fieldset
            legend.uk-legend 新規登録

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
import { Action } from "vuex-class";

@Component
export default class Signup extends Vue {
  @Action("login")
  public login!: () => Promise<void>;

  @Action("verifyCredentials")
  public verifyCredentials!: () => Promise<void>;

  public async onClick(): Promise<void> {
    await this.login();
  }

  public async created(): Promise<void> {
    await this.verifyCredentials();
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
