<template>
  <v-card class="tutorial__note" height="320px">
    <template v-if="userNoteLoad">
      <h1 class="mb-8">Загрузка...</h1>
    </template>
    <template v-else>
      <h1 class="mb-8">Заметка</h1>

      <template v-if="activator.editor">
        <div class="note__action">
          <v-btn icon @click="deleteNote" class="mr-2">
            <v-icon size="26">mdi-delete-forever</v-icon>
          </v-btn>
          <v-btn icon @click="saveNote" class="mr-2">
            <v-icon size="26">mdi-content-save</v-icon>
          </v-btn>
          <v-btn icon @click="closeEditor">
            <v-icon size="26">mdi-close-thick</v-icon>
          </v-btn>
        </div>

        <v-card-text>
          <v-textarea v-model="note" height="162px" />
        </v-card-text>
      </template>
      <template v-else>
        <v-btn icon class="note__action" @click="openEditor">
          <v-icon size="24">mdi-pencil</v-icon>
        </v-btn>

        <v-card-text>
          <span v-html="$md.render(note)"></span>
        </v-card-text>
      </template>
    </template>
  </v-card>
</template>

<script>
/***
 * Show Note for tutorial content
 * Use markdown render ($md)
 * @see {@link } for information
 * TODO: add link to remarkable
 */
export default {
  name: "TutorialNote",
  props: {
    tutorialId: {
      required: true,
      type: Number
    }
  },
  created() {
    this.getNote();
  },
  computed: {
    userNoteLoad: ({ status }) => {
      return status.load;
    }
  },
  data() {
    return {
      activator: {
        editor: false
      },
      status: {
        load: true
      },
      note: ""
    };
  },
  methods: {
    openEditor() {
      this.activator.editor = true;
    },
    closeEditor() {
      this.activator.editor = false;
    },
    getNote() {
      this.status.load = true;
      this.$store
        .dispatch({
          type: "getNote",
          tutorialID: this.tutorialId
        })
        .then(() => {
          this.note = this.$store.state.edu.userNote || "";
        })
        .finally(() => {
          this.status.load = false;
        });
    },
    saveNote() {
      this.status.load = true;
      this.$store
        .dispatch({
          type: "saveNote",
          tutorialID: this.tutorialId,
          content: this.note
        })
        .then(() => {
          this.status.load = false;
          this.closeEditor();
        });
    },
    deleteNote() {
      this.status.load = true;
      this.$store
        .dispatch({
          type: "deleteNote",
          tutorialID: this.tutorialId
        })
        .then(() => {
          this.status.load = false;
          this.note = "";
          this.closeEditor();
        });
    }
  }
};
</script>

<style scoped>
.tutorial__note {
  height: 320px;
  background-color: #fafafa;
  padding: 20px;
}
.note__action {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
