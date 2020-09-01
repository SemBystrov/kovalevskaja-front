<template>
  <v-bottom-navigation fixed>
    <v-btn
      v-for="(nav, index) in navigationList"
      :key="'bottom-menu-item-' + index"
      @click="action(nav)"
    >
      <v-icon>{{ nav.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { SecondMenuMixin } from "./SecondMenuMixin";

export default {
  name: "BottomMenu",
  mixins: [SecondMenuMixin]
};
</script>

<style scoped></style>
