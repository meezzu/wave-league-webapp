import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // home view
    {
      path: "",
      name: "home",
      component: HomeView,
    },

    // authentication views
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

    // squad views
    {
      path: "/squad",
      component: () => import("../views/squad/SquadView.vue"),
      children: [
        {
          path: "",
          redirect: { name: "create-squad" },
        },
        {
          path: "create-squad",
          name: "create-squad",
          component: () => import("../views/squad/create-squad/CreateSquad.vue"),
        },
        {
          path: "manage-squad",
          name: "manage-squad",
          component: () => import("../views/squad/manage-squad/ManageSquad.vue"),
        },
      ],
    },

    // user account views
    {
      path: "/account",
      name: "account",
      component: () => import("@/views/account/AccountView.vue"),
      children: [
        {
          path: "/update-profile",
          name: "account-update-profile",
          component: () => import("@/views/account/UpdateProfile.vue"),
        },
        {
          path: "/send-feedback",
          name: "account-send-feedback",
          component: () => import("@/views/account/SendFeedback.vue"),
        },
      ],
    },

    // transfers views
    {
      path: "/transfers",
      name: "transfers",
      component: () => import("../views/transfers/TransferOut.vue"),
    },

    // rankings views
    {
      path: "/rankings",
      name: "rankings",
      component: () => import("../views/ranking/WeeklyRankings.vue"),
    },

    // points views
    {
      path: "/points",
      name: "points",
      component: () => import("../views/points/PointsView.vue"),
    },

    // utility
    {
      path: "/loading",
      name: "loading",
      component: () => import("../components/global/FullLoadingScreen.vue"),
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
