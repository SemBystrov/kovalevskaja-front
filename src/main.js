import Vue from "vue";
import http from "./http";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import LoadScript from "vue-plugin-load-script";
import config from "./auth";
import "./registerServiceWorker";
import App from "./App.vue";
import "katex/dist/katex.min.css";
import "./remarkable";

Vue.use(LoadScript);
// Vue.loadScript("https://cdn.jsdelivr.net/npm/marked/marked.min.js");
Vue.config.productionTip = false;
Vue.prototype.$uploadApi = process.env.VUE_APP_API_URL;

new Vue({
  router,
  store,
  http,
  vuetify,
  config,
  render: h => h(App)
}).$mount("#app");

window.Vue = Vue;
Vue.loadScript("http://127.0.0.1:8887/applet.min.js");
