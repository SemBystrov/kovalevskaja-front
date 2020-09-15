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
            <h1>Регистрация</h1>
            <span class="custom-subheader">Сервис для подготовки к ЕГЭ</span>
            <v-alert v-if="error" type="error" dense class="mt-2" color="error">
              Ошибка
            </v-alert>
            <v-row class="mt-6">
              <v-col cols="6">
                <h3 class="mt-2">Имя</h3>
                <v-text-field v-model="user.firstName"></v-text-field>
              </v-col>
              <v-col cols="6">
                <h3 class="mt-2">Фамилия</h3>
                <v-text-field v-model="user.secondName"></v-text-field>
              </v-col>
            </v-row>
            <h3 class="mt-2">E-mail</h3>
            <v-text-field
              v-model="user.email"
              type="email"
              class="mr-4"
            ></v-text-field>
            <h3 class="mt-2">Придумайте пароль</h3>
            <v-text-field
              v-model="user.password"
              type="password"
              class="mr-4"
            ></v-text-field>
            <h3 class="mt-2">Учебное заведение</h3>
            <v-autocomplete
              prepend-icon="mdi-school"
              :items="getSchoolItems()"
              v-model="user.school"
            ></v-autocomplete>
            <v-card-actions>
              <v-spacer> </v-spacer>
              <v-btn x-large class="mr-2" @click="register">
                Регистрация
              </v-btn>
              <v-spacer> </v-spacer>
            </v-card-actions>
            <span class="custom-subheader d-block mt-12"
              >Есть учётная запись?
              <router-link to="/login">Войти</router-link></span
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import FindSchool from "@/components/schoolNumber";

export default {
  name: "Register",
  data() {
    return {
      user: {
        email: null,
        school: null,
        password: null,
        firstName: null,
        secondName: null
      },
      error: false,
      loading: false
    };
  },
  methods: {
    getSchoolItems() {
      const items = [];
      for (let key in FindSchool) {
        items.push({
          value: Number.parseInt(key),
          text: FindSchool[key]
        });
      }
      return items;
    },
    register() {
      this.loading = true;
      let username = this.user.email.split("@")[0];
      console.log(username);
      this.$auth
        .register({
          data: {
            username,
            firstName: this.user.firstName,
            secondName: this.user.secondName,
            email: this.user.email,
            password: this.user.password,
            school: Number.parseInt(this.user.school)
          }
        })
        .catch(() => {
          this.error = true;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  metaInfo: {
    title: "Регистрация"
  }
};
</script>

<style scoped></style>
