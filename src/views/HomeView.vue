<template>
  <main class="px-4 sm:px-8 md:px-12 lg:px-24">
    <HeroSection />
    <DashboardStatistics />
  </main>
</template>

<script>
import { onMounted } from "vue";
import HeroSection from "../components/dashboard/HeroSection.vue";
import DashboardStatistics from "../components/dashboard/statistics/DashboardStatistics.vue";

export default {
  components: {
    HeroSection,
    DashboardStatistics,
  },
  setup() {
    onMounted(() => {});

    
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>