import Vue from "vue";
import VueRouter from "vue-router";
import notFound from "../views/404";

Vue.use(VueRouter);

/* TODO: webpack settings */

const routes = [
  {
    path: "/",
    redirect: "/profile"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
    meta: {
      auth: false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register"),
    meta: {
      auth: false
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile"),
    meta: {
      auth: true
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("../views/Settings"),
    meta: {
      auth: true
    }
  },
  {
    path: "/book",
    component: () => import("../views/EducationMaterialsApp"),
    meta: {
      auth: true
    },
    children: [
      {
        path: "",
        redirect: "tutorials"
      },
      {
        path: "tutorials",
        name: "EM_TOC",
        component: () => import("../apps/EducationalMaterials/views/Toc")
      },
      {
        path: "tutorial/:tutorialSlug",
        name: "EM_Tutorial",
        props: route => ({
          tutorialSlug: route.params.tutorialSlug
        }),
        component: () => import("../apps/EducationalMaterials/views/Tutorial")
      }
    ]
  },
  {
    path: "/404",
    name: "NotFound",
    component: notFound
  },
  {
    path: "*",
    redirect: "/404"
  }
];

Vue.router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default Vue.router;
