<template>
  <div class="tutorial__theory">
    <span v-html="$md.render(theory.content)"></span>
  </div>
</template>

<script>
/***
 * Show theory content
 * Use markdown render ($md)
 * @see {@link } for information
 * TODO: add link to remarkable
 */
export default {
  name: "TutorialTheory",
  props: {
    theory: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.tutorial__theory {
  margin-top: 20px;
}
</style>
