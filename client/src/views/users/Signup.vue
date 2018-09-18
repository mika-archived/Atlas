<template lang="pug">
  .uk-container
    .uk-flex.uk-flex-center
      section.uk-section.uk-width-large
        img.uk-align-center(src="../../assets/logo.png")

        form.uk-form-stacked
          fieldset.uk-fieldset
            legend.uk-legend 新規登録

            .uk-margin
              label.uk-form-label(for="form-username") Username
              .uk-form-controls
                input#form-username.uk-input(type="text" placeholder="mika-f" :class="formState($v.username)" v-model.trim="$v.username.$model")
              small.uk-text-danger(v-if="$v.username.$error")
                template(v-if="!$v.username.required")
                  | 必須項目です

            .uk-margin
              label.uk-form-label(for="form-email") Email
              .uk-form-controls
                input#form-email.uk-input(type="email" placeholder="me@mochizuki.moe" :class="formState($v.email)" v-model.trim="$v.email.$model")
              small.uk-text-danger(v-if="$v.email.$error")
                template(v-if="!$v.email.required")
                  | 必須項目です
                template(v-else-if="!$v.email.email")
                  | 正しい形式で入力してください

            .uk-margin
              label.uk-form-label(for="form-password") Password
              .uk-form-controls
                input#form-password.uk-input(type="password" placeholder="password" autocomplete :class="formState($v.password)" v-model.trim="$v.password.$model")
              small.uk-text-danger(v-if="$v.password.$error")
                template(v-if="!$v.password.required")
                  | 必須項目です
                template(v-else-if="!$v.password.minLength")
                  | 最低8文字で入力してください
                template(v-else-if="!$v.password.alphaNumericalSymbols")
                  | アルファベット大文字、小文字、数字、記号を含める必要があります

            .uk-margin
              button.uk-button.uk-button-primary.uk-width-1-1(@click.prevent="onClick" :disabled="$v.$invalid")
                | 登録する

            template(v-if="reason")
              p
                small.uk-text-danger
                  | エラーが発生しました : {{reason}}

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
import { validationMixin } from "vuelidate";
import { email, minLength, required } from "vuelidate/lib/validators";
import { Action, Getter, State } from "vuex-class";

import { IState } from "../../store";
import { RegisterUserParams } from "../../store/session";

const alphaNumericalSymbols = (value: string): boolean => {
  // https://qiita.com/mpyw/items/886218e7b418dfed254b
  // }a>u!kK*wRbWsUyTm)FaFU8GJGbQ*x>M
  return /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!-\/:-@[-`{-~])[!-~]{8,100}$/.test(value);
};

@Component({
  mixins: [validationMixin],
  validations: {
    username: {
      required,
      minLength: minLength(1)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8),
      alphaNumericalSymbols
    }
  }
})
export default class Signup extends Vue {
  public username: string = "";
  public email: string = "";
  public password: string = "";

  @Action("checkCurrentSession") public checkCurrentSession!: () => void;

  @Action("registerUser") public registerUser!: (payload: RegisterUserParams) => void;

  @Getter("hasSession") public hasSession!: boolean;

  @State((state: IState) => state.session.isRegisterUserSuccess)
  public isRegisterUserSuccess!: boolean;

  @State((state: IState) => state.session.reason)
  public reason!: string;

  public formState(state: any): string {
    return state.$error ? "uk-form-danger" : "uk-form-success";
  }

  public async onClick(): Promise<void> {
    await this.registerUser({ username: this.username, password: this.password, email: this.email });
    if (this.isRegisterUserSuccess) {
      this.$router.push("/users/confirmation");
    }
  }

  public async created(): Promise<void> {
    await this.checkCurrentSession();
    if (this.hasSession) {
      this.$router.push("/");
    }
  }
}
</script>
