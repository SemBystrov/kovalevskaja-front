<template>
  <div class="practice__task">
    <p>
      <b>Задача №{{ order || task.id }}.</b> {{ task.condition }}
    </p>

    <template v-if="showSolution">
      <p style="{ display: inline-block }">
        <b>Решение:</b>
      </p>
      <span v-html="$md.render(task.solution)"></span>
      <p><b>Ответ:</b> {{ task.answer }}</p>
    </template>
    <template v-else>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small right dark color="primary" @click="getSolution"
          >Показать решение</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </template>
  </div>
</template>

<script>
/***
 * Show task for tutorial content
 * Use markdown render ($md)
 * @see {@link } for information
 * TODO: add link to remarkable
 */
export default {
  name: "TutorialTask",
  props: {
    task: {
      type: Object,
      required: true
    },
    order: {
      type: Number,
      required: false,
      default: null
    }
  },
  data() {
    return {
      showSolution: false
    };
  },
  methods: {
    getSolution() {
      this.showSolution = true;
    }
  }
};
</script>

<style scoped>
.practice__task {
  margin-top: 20px;
}
</style>
