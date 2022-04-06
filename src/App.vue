<template>
  <AppNavbar v-if="!isAuthRoute" />
  <RouterView :key="$route.fullPath" />
  <FooterSection v-if="!isAuthRoute" />
  <ToastMessage />
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppNavbar from "./components/global/AppNavbar.vue";
import FooterSection from "./components/global/FooterSection.vue";
import ToastMessage from "./components/global/ToastMessage.vue";

const route = useRoute();
const isAuthRoute = computed(() => {
  return route.path.includes("auth");
});
</script>

<style>
@import "@/assets/styles/index.scss";

#app {
  font-weight: normal;
}
</style>
