<template>
  <main v-if="!isAuthRoute">
    <AppNavbar />
    <RouterView :key="$route.fullPath" class="screen-container" />
    <FooterSection />
    <ToastMessage />
  </main>

  <main v-else>
    <section>
      <RouterView :key="$route.fullPath" />
    </section>
  </main>
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
  background-color: #f5f5f5;
}
</style>
