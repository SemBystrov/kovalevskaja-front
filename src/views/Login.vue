<template>
  <v-dialog
    :value="true"
    persistent
    overlay-opacity="1"
    overlay-color="#e9ecef"
    max-width="600px"
  >
    <v-card :loading="loading">
      <v-container class="login-logo">
        <v-row align="center" justify="center">
          <v-col cols="11">
            <h1>Авторизация</h1>
            <span class="custom-subheader">Сервис для подготовки к ЕГЭ</span>
            <v-alert v-if="error" type="error" dense class="mt-2" color="error">
              Неправильный логин или пароль
            </v-alert>
            <h3 class="mt-6">Логин</h3>
            <v-text-field v-model="user.identifier" class="mr-4"></v-text-field>
            <h3 class="mt-2">Пароль</h3>
            <v-text-field
              v-model="user.password"
              type="password"
              class="mr-4"
            ></v-text-field>
            <v-card-actions>
              <v-spacer> </v-spacer>
              <v-btn x-large class="mr-2" @click="login">
                Войти
              </v-btn>
              <v-spacer> </v-spacer>
            </v-card-actions>
            <span class="custom-subheader d-block mt-12"
              >Нет учётной записи?
              <router-link to="/register"
                >Зарегистрироваться.</router-link
              ></span
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        identifier: "",
        password: ""
      },
      error: false,
      loading: false
    };
  },
  methods: {
    async login() {
      try {
        this.loading = true;
        await this.$auth.login({
          data: this.user
        });
      } catch {
        this.error = true;
      }
      this.loading = false;
    }
  },
  metaInfo: {
    title: "Авторизация"
  }
};
</script>

<style scoped lang="scss"></style>
