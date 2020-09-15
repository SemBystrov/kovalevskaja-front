<template>
  <v-container class="settings pt-10">
    <component
      :is="$vuetify.breakpoint.smAndDown ? 'bottom-menu' : 'right-menu'"
      :navigation-list="navigationList"
      @logoutConfirm="switchLogoutConfirm"
    ></component>

    <h1 class="mb-10">Настройки</h1>
    <div class="settings__user mb-12 pb-10">
      <span class="custom-subheader">Пользователь</span>
      <v-row>
        <v-col cols="6">
          <h3 class="mt-2">Имя</h3>
          <v-text-field v-model="user.firstName"></v-text-field>
        </v-col>
        <v-col cols="6">
          <h3 class="mt-2">Фамилия</h3>
          <v-text-field v-model="user.secondName"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h3 class="mt-2">Учебное заведение</h3>
          <v-autocomplete
            prepend-icon="mdi-school"
            :items="getSchoolItems()"
            v-model="user.school"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="9">
          <h3 class="mt-2">Загрузить аватар</h3>
          <v-file-input
            :rules="rules"
            accept="image/png, image/jpeg"
            placeholder="Загрузите изображение"
            prepend-icon="mdi-camera"
            v-model="user.avatar"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-btn color="success" @click="saveUserSettings">Сохранить</v-btn>
    </div>

    <v-snackbar timeout="5000" color="error" v-model="showErrorUpdateUser">
      Ошибка обновления
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="showErrorUpdateUser = false">
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar timeout="5000" color="success" v-model="showOkUpdateUser">
      Обновлено успешно
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="showOkUpdateUser = false">
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model="showLogoutDialog" max-width="300">
      <v-card>
        <v-card-title>Подтвердите действие</v-card-title>
        <v-card-text>Вы действительно хотите покинуть приложение?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="switchLogoutConfirm">Нет</v-btn>
          <v-btn text color="success" @click="logout">Да</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import FindSchool from "../components/schoolNumber";
import RightMenu from "../components/RightMenu";
import BottomMenu from "../components/BottomMenu";

const navigationList = [
  {
    icon: "mdi-widgets",
    routeName: "Profile"
  },
  {
    icon: "mdi-logout",
    returnAction: "logoutConfirm"
  }
];

export default {
  name: "Settings",
  components: {
    RightMenu,
    BottomMenu
  },
  data() {
    return {
      user: {
        firstName: "",
        secondName: "",
        school: "",
        avatar: null
      },
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!"
      ],
      navigationList,
      showLogoutDialog: false,
      showOkUpdateUser: false,
      showErrorUpdateUser: false
    };
  },
  methods: {
    saveUserSettings() {
      this.$store
        .dispatch({
          type: "updateUserSettings",
          user: this.user
        })
        .then(() => {
          this.showOkUpdateUser = true;
          this.$auth.fetch().then(resp => {
            this.$auth.user(resp.data);
          });
        })
        .catch(() => {
          this.showErrorUpdateUser = true;
        });
    },
    setUserSettings() {
      const user = this.$auth.user();
      this.user.firstName = user.firstName;
      this.user.secondName = user.secondName;
      this.user.school = user.school;
    },
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
    switchLogoutConfirm() {
      this.showLogoutDialog = !this.showLogoutDialog;
    },
    logout() {
      this.$auth.logout();
    }
  },
  mounted() {
    this.setUserSettings();
  },
  metaInfo: {
    title: "Настройки"
  }
};
</script>

<style scoped>
.settings {
  padding: 10px 30px;
}

.settings__user {
}
</style>
