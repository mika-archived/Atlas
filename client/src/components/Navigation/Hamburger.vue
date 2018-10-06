<template lang="pug">
  div
    ul.uk-navbar-nav(class="uk-visible@s") 
      slot(content)
    ul.uk-navbar-nav(class="uk-hidden@s")
      li
        a.uk-navbar-toggle(uk-toggle="target: #offcanvas-overlay")
          span(uk-navbar-toggle-icon)
    #offcanvas-overlay(uk-offcanvas="overlay: true")
      .uk-offcanvas-bar
        .uk-panel
          ul.uk-nav.uk-nav-default
            li.uk-nav-header General
            slot(content)
</template>

<style lang="scss" scoped>
.uk-offcanvas-bar {
  background: #fff;
  color: #666;

  .uk-nav-default {
    .uk-nav-header {
      padding: 8px 0;
      border-bottom: 1px solid #e5e5e5;
    }

    li {
      padding: 4px 0;
    }

    * {
      &:active,
      &:hover {
        color: #666;
      }
      color: #666;
    }
  }
}
</style>
