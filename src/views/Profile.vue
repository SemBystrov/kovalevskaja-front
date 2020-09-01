<template>
  <v-card class="profile">
    <template v-if="loadFetchUser && !$auth.user()">
      <h1>Загрузка</h1>
    </template>
    <template v-else>
      <v-card-actions>
        <v-avatar size="130" class="elevation-4">
          <template v-if="$auth.user().avatar">
            <img
              :src="$uploadApi + $auth.user().avatar.formats.thumbnail.url"
              alt="User's avatar"
            />
          </template>
          <template v-else>
            <img src="../assets/userAvatar.png" alt="User's default avatar" />
          </template>
        </v-avatar>
      </v-card-actions>

      <div class="profile__main">
        <v-list class="profile__right-menu">
          <v-list-item class="mb-2 profile__menu-item">
            <v-btn
              icon
              class="menu-item__btn"
              color="#7F22FD"
              elevation="2"
              link
              to="/settings"
            >
              <v-icon size="30">mdi-cog</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>

        <div class="profile__info">
          <h1 class="mb-1">
            {{ $auth.user().firstName + " " + $auth.user().secondName }}
          </h1>
          <span class="custom-subheader user__school">{{ userSchool }}</span>
        </div>
      </div>

      <div class="profile__apps">
        <span class="custom-subheader apps__head">Приложения</span>
        <app-card></app-card>
      </div>
    </template>
  </v-card>
</template>

<script>
import AppCard from "../components/AppCard";
import SchoolFind from "../components/schoolNumber";

export default {
  name: "Profile",
  components: { AppCard },
  created() {
    this.fetchUser();
  },
  computed: {
    userSchool: ({ $auth }) => {
      return SchoolFind[$auth.user().school];
    }
  },
  data() {
    return {
      loadFetchUser: true
    };
  },
  methods: {
    async fetchUser() {
      const user = await this.$auth.fetch();
      this.$auth.user(user.data);
      this.loadFetchUser = false;
    }
  }
};
</script>

<style scoped lang="scss">
.profile {
  padding: 15px;
  background-image: url("../assets/1.jpeg");
  background-size: 200px;
  background-repeat: repeat;
  min-height: 100vh;
  .custom-subheader {
    font-size: 14px;
  }
}

.profile__statistics {
}

.profile__main,
.profile__statistics {
  padding: 10px;
  margin-top: 10px;
}

.profile__main {
  padding: 10px;
  position: relative;
  min-height: 100px;
}
.profile__info {
  margin-right: 35px;
}
.profile__right-menu {
  position: absolute;
  margin-right: -15px;
  right: 0;
  top: 0;
}
.profile__menu-item,
.profile__right-menu {
  background-color: rgba(0, 0, 0, 0) !important;
}
.user__school {
  font-size: 14px !important;
  line-height: 0.8;
}

.menu-item__btn {
  background-color: white;
}
.apps__head {
  margin-left: 10px;
}

.profile__apps {
  margin-top: 25px;
}

.profile__leaderboard {
  margin-right: 40px;
}

.develop__msg {
  height: 200px;
}
.develop__card {
  margin-top: 8px;
  background-color: #fafafa;
  min-height: 150px;
}

.link {
  text-align: right;
  font-size: 10px !important;
  margin-top: 50px !important;
}
</style>
