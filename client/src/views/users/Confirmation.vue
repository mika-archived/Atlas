<template lang="pug">
  .uk-container
    .uk-flex.uk-flex-center
      section.uk-section.uk-width-large
        img.uk-align-center(src="../../assets/logo.png")

        form.uk-form-stacked
          fieldset.uk-fieldset
            legend.uk-legend メールアドレスの確認

            .uk-margin
              p
                small
                  | 入力されたメールアドレスに検証コードを記載したメールを送信しました。
                  br
                  | 記載されている検証コードを入力して、サインアップを完了させてください。

            .uk-margin
              label.uk-form-label(for="form-username") 検証コード
              .uk-form-controls
                input#form-username.uk-input(type="text" placeholder="123456" :class="formState($v.code)" v-model.trim="$v.code.$model")
              small.uk-text-danger(v-if="$v.code.$error")
                template(v-if="!$v.code.required")
                  | 必須項目です
                template(v-else-if="!$v.code.verifyCode")
                  | フォーマットが不正です

            .uk-margin
              button.uk-button.uk-button-primary.uk-width-1-1(@click.prevent="onClick" :disabled="$v.$invalid")
                | 認証する

</template>

<script lang="ts">
import UIKit from "uikit";
import { Component, Vue } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { email, minLength, required } from "vuelidate/lib/validators";
import { Action, Getter, State } from "vuex-class";

import { ActionDescriber, IState } from "../../store";
import { VerifyCodeParams } from "../../store/session";

const verifyCode = (value: string): boolean => {
  return /^[0-9]{6}$/.test(value);
};

@Component({
  mixins: [validationMixin],
  validations: {
    code: {
      required,
      verifyCode
    }
  }
})
export default class Confirmation extends Vue {
  public code: string = "";

  @Action("checkCurrentSession") public checkCurrentSession!: () => void;

  @Action("verifyCode") public verifyCode!: ActionDescriber<VerifyCodeParams>;

  @Getter("hasSession") public hasSession!: boolean;

  @State((state: IState) => state.session.isVerifyCodeSuccess)
  public isVerifyCodeSuccess!: boolean;

  @State((state: IState) => state.session.reason)
  public reason!: string;

  public formState(state: any): string {
    return state.$error ? "uk-form-danger" : "uk-form-success";
  }

  public async onClick(): Promise<void> {
    await this.verifyCode({ code: this.code });
    if (this.isVerifyCodeSuccess) {
      this.$router.push("/users/login");
    }
  }

  public async created(): Promise<void> {
    await this.checkCurrentSession();
    if (this.hasSession) {
      UIKit.notification({ message: "すでにログインしています" });
      this.$router.push("/");
    }
  }
}
</script>
