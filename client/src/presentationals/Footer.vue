<template lang="pug">
  footer.footer
    .container
      img(src="../assets/logo.png")
      .columns
        .column
          p
            | Atlas is open source project hosted on 
            a(href="https://github.com" target="_blank") GitHub
            | .
          p
            | Source code is available under the 
            a(href="https://opensource.org/licenses/mit-license.php" target="_blank") MIT License
            | .
          p Project Aria &copy; 2018
        .column
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
  margin-bottom: 0.5em;

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
