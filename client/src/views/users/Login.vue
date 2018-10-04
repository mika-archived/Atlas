<template lang="pug">
  .uk-container
    .uk-flex.uk-flex-center
      section.uk-section.uk-width-large
        img.uk-align-center(src="../../assets/logo.png")

        form.uk-form-stacked
          fieldset.uk-fieldset
            legend.uk-legend ログイン

            .uk-margin
              button.uk-button.uk-button-primary.uk-width-1-1(@click.prevent="onClick")
                i.fab.fa-google.fa-fw
                | Google アカウントでログイン

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
