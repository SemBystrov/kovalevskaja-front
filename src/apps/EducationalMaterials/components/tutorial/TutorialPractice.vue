<template>
  <div class="tutorial__practice">
    <template v-for="subtype in practice">
      <h3
        v-if="subtype.header !== '---'"
        :key="'edu-tutorial-practice-id' + subtype.id"
      >
        {{ practice.header }}
      </h3>

      <template v-for="(task, index) in subtype.tasks">
        <tutorial-task
          :task="task"
          :order="index + 1"
          :key="'edu-tutorial-task-id' + task.id"
        ></tutorial-task>
      </template>
    </template>
  </div>
</template>

<script>
import TutorialTask from "./TutorialPracticeTask";

/***
 * Show list of tasks for tutorial content
 */
export default {
  name: "TutorialPractice",
  components: { TutorialTask },
  props: {
    practice: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.tutorial__practice {
  margin-top: 20px;
}
</style>
