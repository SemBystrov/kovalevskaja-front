<template>
  <v-container class="tutorial-success">
    <v-row>
      <v-col>
        <span class="custom-subheader text-center tutorial-success__head"
          >Тема усвоена?</span
        >

        <div
          v-if="userSuccess"
          class="tutorial-success__rating text-center mt-3"
        >
          <template v-for="i in [1, 2, 3]">
            <v-icon
              size="26"
              :key="'success-item-' + i"
              :color="activeSuccess === i ? showSuccess(i).color : 'grey'"
              class="ml-1 mr-1]"
              @click="changeSuccess(i)"
            >
              {{ showSuccess(i).icon }}
            </v-icon>
          </template>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import showSuccess from "../../preset/showSuccess";

/***
 * Show select of study success
 */
export default {
  name: "TutorialSuccess",

  props: {
    tutorialId: {
      required: true,
      type: Number
    }
  },

  created() {
    this.$store.dispatch({
      type: "getSuccess",
      tutorialID: this.tutorialId
    });
  },

  computed: {
    userSuccess: ({ $store }) => $store.state.edu.userSuccess,
    activeSuccess: ({ userSuccess, tutorialId }) => userSuccess[tutorialId]
  },

  methods: {
    changeSuccess(value) {
      this.$store.dispatch({
        type: "changeSuccess",
        tutorialID: this.tutorialId,
        rating: value
      });
    },
    showSuccess: value => showSuccess(value)
  }
};
</script>

<style scoped lang="scss">
.tutorial-success {
  margin-bottom: 50px;
}
.tutorial-success__rating,
.tutorial-success__head {
  display: block;
}
.tutorial-success__head {
  font-size: 18px;
}
</style>
