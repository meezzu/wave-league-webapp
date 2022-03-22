import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      name: "home",
      component: HomeView,
    },
    {
      path: "/pick-squad",
      name: "pick-squad",
      component: () => import("../views/squad/PickSquadView.vue"),
    },
    {
      path: "/view-squad",
      name: "view-squad",
      component: () => import("../views/squad/ViewSquad.vue"),
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
          name: "auth-sign-in",
          component: () => import("@/views/authentication/SignIn.vue"),
        },
        {
          path: "sign-up",
          name: "auth-sign-up",
          component: () => import("@/views/authentication/SignUp.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (!authStore.userSignedIn && !to.name.includes("auth")) {
    return { name: "auth-sign-in" };
  } else if (to.name.includes("auth") && authStore.userSignedIn) {
    return { name: "home" };
  }
});

export default router;
