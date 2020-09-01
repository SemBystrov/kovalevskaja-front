<template>
  <v-list class="right-menu">
    <v-list-item
      v-for="(nav, index) in navigationList"
      :key="'right-menu-item-' + index"
      class="mb-1 right-menu__item"
    >
      <v-btn icon @click="action(nav)">
        <v-icon size="26">{{ nav.icon }}</v-icon>
      </v-btn>
    </v-list-item>
  </v-list>
</template>

<script>
import { SecondMenuMixin } from "./SecondMenuMixin";
export default {
  name: "RightMenu",
  mixins: [SecondMenuMixin]
};
</script>

<style scoped>
.right-menu {
  position: fixed;
  right: 0;
  top: 70px;
}
.right-menu__item,
.right-menu {
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>
