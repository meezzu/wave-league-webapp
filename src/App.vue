<template>
  <AppNavbar v-if="!isAuthRoute" />
  <RouterView :key="$route.fullPath" />
  <FooterSection v-if="!isAuthRoute" />
  <notifications />
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppNavbar from "./components/global/AppNavbar.vue";
import FooterSection from "./components/global/FooterSection.vue";
// import { notify } from "@kyvg/vue3-notification";

export default {
  setup() {
    const route = useRoute();
    const isAuthRoute = computed(() => {
      return route.path.includes("auth");
    });
    return {
      isAuthRoute,
    };
  },
  components: { AppNavbar, FooterSection },
};
</script>

<style>
@import "@/assets/styles/index.scss";

#app {
  font-weight: normal;
}
</style>
