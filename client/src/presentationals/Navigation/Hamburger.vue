<template lang="pug">
  div
    ul.uk-navbar-nav(class="uk-visible@m") 
      slot(content)
    ul.uk-navbar-nav(class="uk-hidden@m")
      li
        a.uk-navbar-toggle
          span(uk-navbar-toggle-icon)
        .uk-navbar-dropdown
          ul.uk-nav.uk-navbar-dropdown-nav
            slot(content)
</template>
