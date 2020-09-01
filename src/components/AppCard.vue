<template>
  <v-container class="app__cards">
    <v-row>
      <v-col cols="6" class="app__card">
        <v-card hover link to="/book/tutorials">
          <img src="../assets/edu.png" alt="App's photo" class="app__photo" />
          <v-card-title class="app__title">
            Учебник ЕГЭ
          </v-card-title>
          <v-card-text>
            Изучать теорию
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AppCard"
};
</script>

<style scoped>
.app__photo {
  width: 100%;
}
.app__card {
  padding: 5px;
}
.app__cards {
  margin-top: -10px;
}
.app__title {
  padding: 2px 16px;
}
</style>
