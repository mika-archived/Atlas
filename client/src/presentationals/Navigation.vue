<template lang="pug">
  nav.navbar(role="navigation" aria-label="main navigation")
    .container
      .navbar-brand
        router-link.navbar-item(to="/" )
          img(src="../assets/logo.png")
        a.navbar-burger(role="button" aria-label="menu" aria-expanded="false")
          span(aria-hidden="true")
          span(aria-hidden="true")
          span(aria-hidden="true")

      .navbar-menu
        .navbar-start

        .navbar-end
</template>
