<template>
  <v-container class="tutorial pt-10">
    <component
      :is="$vuetify.breakpoint.smAndDown ? 'bottom-menu' : 'right-menu'"
      :navigation-list="navigationList"
      @note="openNote"
      @share="openShare"
    ></component>

    <template v-if="tutorialLoading">
      <p>Загрузка...</p>
    </template>

    <template v-else-if="tutorialNotFound">
      <p>Статья не найдена.</p>
    </template>

    <template v-else-if="tutorialError">
      <p>Ошибка.</p>
    </template>

    <template v-else>
      <h1>{{ tutorial.name }}</h1>

      <h2 class="tutorial__theory">Теория</h2>
      <tutorial-theory :theory="tutorial.theory"> </tutorial-theory>

      <h2 class="tutorial__practice">Практика</h2>
      <tutorial-practice :practice="tutorial.practice"> </tutorial-practice>

      <h2 class="tutorial__independet-work mt-6">Отработай задание</h2>
      <tutorial-independet-work></tutorial-independet-work>

      <tutorial-success :tutorial-id="tutorial.id"></tutorial-success>

      <v-bottom-sheet scrollable inset v-model="activator.note" :attach="$el">
        <tutorial-note :tutorial-id="tutorial.id"></tutorial-note>
      </v-bottom-sheet>

      <share
        :title="tutorial.name"
        :url="tutorialUrl"
        v-model="activator.share"
      ></share>
    </template>
  </v-container>
</template>

<script>
import TutorialTheory from "../components/tutorial/TutorialTheory";
import TutorialPractice from "../components/tutorial/TutorialPractice";
import TutorialNote from "../components/tutorial/TutorialNote";
import TutorialIndependetWork from "../components/tutorial/TutorialIndependetWork";
import TutorialSuccess from "../components/tutorial/TutorialSuccess";
import Share from "../../../components/Share";

const navigationList = [
  {
    icon: "mdi-format-list-bulleted",
    routeName: "EM_TOC"
  },
  {
    icon: "mdi-widgets",
    routeName: "Profile"
  },
  {
    icon: "mdi-share-variant",
    returnAction: "share"
  },
  {
    icon: "mdi-text",
    returnAction: "note"
  }
];

/***
 * Component for displaying tutorial.
 * This includes: theory, practice, independet work
 */
export default {
  name: "Tutorial",
  components: {
    Share,
    TutorialSuccess,
    TutorialIndependetWork,
    TutorialNote,
    TutorialPractice,
    TutorialTheory,
    RightMenu: () => import("../../../components/RightMenu"),
    BottomMenu: () => import("../../../components/BottomMenu")
  },
  props: {
    tutorialSlug: {
      type: String,
      required: true
    }
  },
  created() {
    this.status.load = true;
    this.$store
      .dispatch({ type: "getTutorial", tutorialSlug: this.tutorialSlug })
      .then(() => {
        this.status.load = false;
      });
  },
  computed: {
    /*
      tutorial download status:

      tutorialLoading - apollo loading
      tutorialNotFound - apollo return null
      tutorialError - error from apollo queries
     */

    tutorialLoading: ({ status }) => {
      return status.load;
    },
    tutorialNotFound: ({ status }) => {
      return status.notFound;
    },
    tutorialError: ({ status }) => {
      return status.error;
    },

    tutorial: ({ $store }) => {
      return $store.state.edu.tutorial;
    },

    tutorialUrl: ({ tutorialSlug }) =>
      process.env.VUE_APP_URL + "/book/tutorial/" + tutorialSlug
  },
  data() {
    return {
      status: {
        notFound: false,
        error: false,
        load: false
      },
      navigationList: navigationList,
      activator: {
        note: false,
        share: false
      }
    };
  },
  methods: {
    openNote() {
      this.activator.note = true;
    },
    openShare() {
      this.activator.share = true;
    }
  }
};
</script>

<style scoped>
.tutorial__theory,
.tutorial__practice {
  margin-top: 20px;
}

.tutorial {
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
  overflow-x: hidden;
}
</style>
