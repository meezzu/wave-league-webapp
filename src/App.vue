<script setup>
// import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <RouterView :key="$route.fullPath" />
</template>

<style>
@import "@/assets/styles/index.scss";

#app {
  font-weight: normal;
}
</style>
