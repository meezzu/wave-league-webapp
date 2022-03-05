import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "",
      redirect: { name: "home" },
    },
    {
      path: "/auth",
      component: () => import("@/views/authentication/AuthenticationView.vue"),
      meta: { requiresAuth: false },
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
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (!authStore.userSignedIn && to.meta.requiresAuth) {
    return {
      path: "/auth/sign-in",
    };
  } else if (authStore.userSignedIn && !to.meta.requiresAuth) {
    return { path: to.path };
  }
});

export default router;
