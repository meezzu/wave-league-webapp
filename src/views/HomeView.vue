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
import { useAxios } from "@vueuse/integrations/useAxios";
// import axios from "axios";
import axiosInstance from "../utils/axiosInstance.js";

export default {
  components: {
    HeroSection,
    DashboardStatistics,
  },
  setup() {
 

    const { data, execute, isFinished } = useAxios(
      "/squads",
      { method: "POST" },
      axiosInstance.config
    );

    onMounted(() => {
      console.log(axiosInstance)
      execute();
    });
    return { data, isFinished };
  },
};
</script>

<style lang="scss" scoped>
</style>