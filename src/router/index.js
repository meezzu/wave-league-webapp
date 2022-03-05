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
      beforeEnter: [checkUserSignedIn],
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

router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.userSignedIn) {
    return {
      path: "/auth/sign-in",
      // save the location we were at to come back later
      // query: { redirect: to.fullPath },
    };
  }
});

function checkUserSignedIn(to, from, next) {
  const authStore = useAuthStore();
  if (authStore.userSignedIn) return next({ name: "home" });
}

export default router;
