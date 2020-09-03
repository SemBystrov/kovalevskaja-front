<template>
  <div class="not-found">
    <img src="../assets/cat.jpg" alt="Страница не найдена" class="cat__photo" />
    <div class="not-found__head">
      <h1>404. Страница не найдена :(</h1>
      <span class="custom-subheader"
        >Продолжи поиск <router-link to="/profile">тут</router-link></span
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "notFound",
  metaInfo: {
    title: "Ошибка"
  }
};
</script>

<style>
.cat__photo {
  width: 100%;
  margin-top: 60px;
  margin-bottom: 60px;
}
.not-found__head {
  text-align: center;
}
</style>
