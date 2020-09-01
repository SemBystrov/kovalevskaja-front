<template>
  <div class="section">
    <h3 class="custom-header3">
      Задание №{{ section.order }}. {{ section.name }}
    </h3>
    <div class="divider"></div>
    <template v-for="tutorial in section.tutorials">
      <SectionTutorial
        :tutorial="tutorial"
        :key="'education-tutorial-id-' + tutorial.id"
      ></SectionTutorial>
    </template>
  </div>
</template>

<script>
import SectionTutorial from "./TocSectionTutorial";
export default {
  name: "Section",
  components: { SectionTutorial },
  props: {
    section: {
      required: true,
      type: Object
    }
  }
};
</script>

<style scoped lang="scss">
.section {
  margin-top: 20px;

  .divider {
    height: 1px;
    width: 290px;
    background-color: #e5e5e5;
    margin-top: 5px;
    margin-bottom: 10px;
  }
}
</style>
