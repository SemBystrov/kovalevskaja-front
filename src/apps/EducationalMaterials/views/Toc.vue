<template>
  <v-container class="TOC pt-10" fluid>
    <component
      :is="$vuetify.breakpoint.smAndDown ? 'bottom-menu' : 'right-menu'"
      @share="openShare"
    ></component>

    <template v-if="tocLoading">
      <p>Загрузка...</p>
    </template>

    <template v-else-if="tocError">
      <p>Ошибка.</p>
    </template>

    <template v-else>
      <div class="header">
        <h1>Профильная математика</h1>
        <span class="custom-subheader">Подготовка к ЕГЭ</span>
      </div>

      <template v-for="section in sections">
        <Section
          :section="section"
          :key="'education-section-id-' + section.id"
        ></Section>
      </template>
    </template>

    <share
      title="Учебник ЕГЭ - Школьный мир"
      :description="
        `
Сборник учебных материалов для подготовки к ЕГЭ по профильной математике
Автор: Александр Александрович Григорьев
        `
      "
      :url="tocUrl"
      v-model="activator.share"
    ></share>
  </v-container>
</template>

<script>
import Section from "../components/toc/TocSection";
import RightMenu from "../../../components/RightMenu";
import BottomMenu from "../../../components/BottomMenu";
import Share from "../../../components/Share";

export default {
  name: "TableOfContent",
  components: {
    RightMenu,
    BottomMenu,
    Section,
    Share
  },
  created() {
    this.getToc();
    this.getSuccess();
  },
  computed: {
    tocError: ({ status }) => {
      return status.error;
    },
    tocLoading: ({ status }) => {
      return status.load;
    },
    tocUrl: () => process.env.VUE_APP_URL + "/book/tutorials"
  },
  data() {
    return {
      status: {
        error: false,
        load: true
      },
      sections: [],
      activator: {
        share: false
      }
    };
  },
  methods: {
    getToc: function() {
      this.status.load = true;
      this.$store.dispatch({ type: "getToc" }).then(() => {
        this.sections = this.$store.state.edu.toc;
        this.status.load = false;
      });
    },

    getSuccess: function() {
      this.$store.dispatch({ type: "getAllSuccess" });
    },

    openShare() {
      this.activator.share = true;
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  margin-bottom: 30px;
  h1 {
    font-size: 24px;
  }
}
.TOC {
  padding-left: 20px;
  padding-right: 50px;
}
</style>
