<template lang="pug">
  footer.footer
    .uk-container
      img(src="../assets/logo.png")
      div(uk-grid)
        div(class="uk-width-1-2@s")
          p
            | Atlas is open source project hosted on 
            a(href="https://github.com" target="_blank") GitHub
            | .
          p
            | Source code is available under the 
            a(href="https://opensource.org/licenses/mit-license.php" target="_blank") MIT License
            | .
          p Project Aria &copy; 2018
        div(class="uk-width-1-2@s")
          p
            router-link(to="/about") このサービスについて
          p
            router-link(to="/tos") 利用規約
          p
            router-link(to="/privacy") プライバシーポリシー
</template>

<style lang="scss" scoped>
$link-color: #a3a3a3;

p:not(:last-child) {
  margin-bottom: 0.5rem;

  & + p {
    margin-top: 0.5rem;
  }
  a {
    color: $link-color;
  }
}

p:last-child {
  a {
    color: $link-color;
  }
}
</style>
