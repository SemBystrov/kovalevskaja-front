<template>
  <v-app>
    <v-container fluid class="pa-0 ma-0">
      <v-row class="pa-0 ma-0" justify="center">
        <template
          v-if="
            $vuetify.breakpoint.mdAndUp &&
              !['Profile', 'Login', 'Register', 'NotFound'].includes(
                $route.name
              )
          "
        >
          <v-col cols="4" class="pa-0 ma-0 profile-left elevation-4">
            <profile></profile>
          </v-col>
          <v-col cols="4" class="pa-0 ma-0"> </v-col>
        </template>

        <v-col cols="12" md="7" lg="6" class="pa-0 ma-0">
          <v-main>
            <router-view></router-view>
          </v-main>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Profile from "./views/Profile";
export default {
  name: "App",
  components: { Profile },
  data: () => ({
    //
  }),
  metaInfo: {
    title: "Приложение",
    titleTemplate: "%s - Школьный мир",
    htmlAttrs: {
      lang: "ru"
    },
    meta: [
      {
        property: "og:title",
        content: "Профиль - Школьный мир"
      },
      {
        property: "og:description",
        content: "Личная страница учащегося"
      }
    ]
  }
};
</script>

<style lang="scss">
@import "assets/styles/font";

.profile-left {
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  position: fixed;
  top: 0;
  left: 0;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    width: 0;
    background: transparent; /* Chrome/Safari/Webkit */
  }
}
</style>
