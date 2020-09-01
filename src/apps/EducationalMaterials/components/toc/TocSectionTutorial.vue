<template>
  <v-list-item dense link class="tutorial__item" :to="tutorialLink">
    <v-list-item-icon>
      <v-icon v-if="userSuccess" :color="successView.color">{{
        successView.icon
      }}</v-icon>
    </v-list-item-icon>

    <v-list-item-title>
      {{ tutorial.order }}. {{ tutorial.content.name }}
    </v-list-item-title>
  </v-list-item>
</template>

<script>
import showSuccess from "../../preset/showSuccess";

export default {
  name: "SectionTutorial",
  props: {
    tutorial: {
      required: true,
      type: Object
    }
  },
  computed: {
    userSuccess: ({ $store }) => {
      return $store.state.edu.userSuccess;
    },

    successView: ({ tutorial, userSuccess }) => {
      return showSuccess(userSuccess[tutorial.id]);
    },

    tutorialLink: ({ tutorial }) => {
      return "tutorial/" + tutorial.content.slug;
    }
  }
};
</script>

<style scoped>
.tutorial__item {
  margin: 0 !important;
}
</style>
