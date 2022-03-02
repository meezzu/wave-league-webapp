import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      redirect: "/auth/sign-in",
    },
    {
      path: "/auth",
      component: () => import("@/views/authentication/AuthenticationView.vue"),
      children: [
        {
          path: "",
          redirect: { name: "sign-in" },
        },
        {
          path: "sign-in",
          name: "sign-in",
          component: () => import("@/views/authentication/SignIn.vue"),
        },
        {
          path: "sign-up",
          name: "sign-up",
          component: () => import("@/views/authentication/SignUp.vue"),
        },
      ],
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
