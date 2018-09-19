<template lang="pug">
  .uk-container
    .uk-flex.uk-flex-center
      section.uk-section.uk-width-large
        img.uk-align-center(src="../../assets/logo.png")

        form.uk-form-stacked
          fieldset.uk-fieldset
            legend.uk-legend ログイン

            .uk-margin
              label.uk-form-label(for="form-username") Username
              .uk-form-controls
                input#form-username.uk-input(type="text" placeholder="mika-f" :class="formState($v.username)" v-model.trim="$v.username.$model")
              small.uk-text-danger(v-if="$v.username.$error")
                template(v-if="!$v.username.required")
                  | 必須項目です

            .uk-margin
              label.uk-form-label(for="form-password") Password
              .uk-form-controls
                input#form-password.uk-input(type="password" placeholder="password" autocomplete :class="formState($v.password)" v-model.trim="$v.password.$model")
              small.uk-text-danger(v-if="$v.password.$error")
                template(v-if="!$v.password.required")
                  | 必須項目です

            .uk-margin
              button.uk-button.uk-button-primary.uk-width-1-1(@click.prevent="onClick" :disabled="$v.$invalid")
                | ログイン

            template(v-if="reason")
              p
                small.uk-text-danger
                  | ログインに失敗しました : {{reason}}

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
import UIKit from "uikit";
import { Component, Vue } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { Action, Getter, State } from "vuex-class";

import { ActionDescriber, IState } from "../../models/types";
import { LoginParams } from "../../store/session";

@Component({
  mixins: [validationMixin],
  validations: {
    username: {
      required
    },
    password: {
      required
    }
  }
})
export default class Signup extends Vue {
  public username: string = "";
  public password: string = "";

  @Action("login") public login!: ActionDescriber<LoginParams>;

  @State((state: IState) => state.session.reason)
  public reason!: string;

  @Getter("hasSession") public hasSession!: boolean;

  public formState(state: any): string {
    return state.$error ? "uk-form-danger" : "uk-form-success";
  }

  public async onClick(): Promise<void> {
    await this.login({ username: this.username, password: this.password });
    if (this.hasSession) {
      this.$router.push(this.$route.query.redirectTo ? this.$route.query.redirectTo : "/");
    }
  }
}
</script>
