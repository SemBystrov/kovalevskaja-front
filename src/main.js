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
import VueMeta from "vue-meta";
import VueSocialSharing from "vue-social-sharing";

Vue.use(VueSocialSharing);

Vue.use(VueMeta);
Vue.use(LoadScript);
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
Vue.loadScript(process.env.VUE_APP_APPLET_URL);
