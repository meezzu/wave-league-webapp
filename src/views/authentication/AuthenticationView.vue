<template>
  <main class="auth">
    <!-- <AuthNavbarSection class="nav" /> -->
    <router-view :key="$route.fullPath" />
  </main>
</template>

<script setup>
import AuthNavbarSection from "@/components/global/AuthNavbarSection.vue";
</script>

<style lang="scss" scoped>
.auth {
  min-height: 100vh;
  color: white;
  position: relative;
  background: hsla(0, 76%, 47%, 1);
  background: radial-gradient(
    circle,
    hsla(0, 76%, 47%, 0.7) 0%,
    hsla(271, 80%, 12%, 1) 90%
  );

  background: -moz-radial-gradient(
    circle,
    hsla(0, 76%, 47%, 0.7) 0%,
    hsla(271, 80%, 12%, 1) 90%
  );

  background: -webkit-radial-gradient(
    circle,
    hsla(0, 76%, 47%, 0.7) 0%,
    hsla(271, 80%, 12%, 1) 90%
  );

  .nav {
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
}
</style>
