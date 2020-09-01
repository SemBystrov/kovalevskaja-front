import Vue from "vue";

import auth from "@websanova/vue-auth";
// import authBearer from "@websanova/vue-auth/drivers/auth/bearer.js";
import httpAxios from "@websanova/vue-auth/drivers/http/axios.1.x.js";
import routerVueRouter from "@websanova/vue-auth/drivers/router/vue-router.2.x.js";

Vue.use(auth, {
  // auth: authBearer,
  auth: {
    request: function(req, token) {
      this.http.setHeaders.call(this, req, {
        Authorization: "Bearer " + token
      });
    },

    response: function(res) {
      let token = res.data.jwt;
      if (token) {
        return token;
      }
    }
  },
  http: httpAxios, // Axios
  router: routerVueRouter,
  storage: ["storage"],
  rolesKey: { role: "type" },
  registerData: {
    url: "auth/local/register",
    method: "POST",
    redirect: "/profile"
  },
  loginData: {
    url: "auth/local",
    method: "POST",
    redirect: "/",
    staySignedIn: true,
    fetchUser: true
  },
  fetchData: {
    url: "users/me",
    method: "GET",
    enabled: true
  },
  refreshData: {
    enabled: false
  }
});
