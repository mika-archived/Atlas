<template lang="pug">
  nav.breadcrumb(aria-label="breadcrumbs")
    ul
      li
        router-link(to="/") Home
      li(v-for="(hierarchy, idx) in hierarchies" :key="idx")
        router-link(:to="hierarchy.route" :class="{'is-active': isLast(idx)}") {{hierarchy.name}}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Breadcrumb extends Vue {
  public hierarchies: Array<{}> = [];

  public isLast(idx: number): boolean {
    return this.hierarchies.length - 1 === idx;
  }

  public created(): void {
    const routes = this.$route.path.split("/").slice(1);
    routes.forEach(route => {
      this.hierarchies.push({
        name: route.charAt(0).toUpperCase() + route.slice(1),
        route
      });
    });
  }
}
</script>

<style lang="scss" scoped>
.content ul {
  margin-left: 0;
}

.content li + li {
  margin-top: 0;
}
</style>
