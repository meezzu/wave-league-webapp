<template>
  <section class="p-2 sm:px-8 md:px-12 lg:px-24">
    <deadline-card v-show="!newUser" class="mt-24 mb-16" />
    <details-card class="mt-24 mb-16" :newUser="newUser" :week="currentWeek" />

    <div class="my-16">
      <div
        v-if="!newUser"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-row-3 md:grid-row-2 gap-y-8 sm:gap-8"
      >
        <TopArtistesOfTheWeek class="row-span-1 col-span-1 md:col-span-2" />
        <ThisWeekChart class="row-span-3 col-span-1 md:col-span-2 lg:col-span-1" />
        <MusicWeekDiff class="col-span-1 md:col-span-2 lg:col-span-2" />
      </div>

      <div v-else class="gap-y-8 sm:gap-8">
        <TopArtistesOfTheWeek class :newUser="newUser" />
      </div>

      <div v-if="!newUser" class="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
        <TopTransfersIn />
        <TopTransferOut />
      </div>

      <div v-else class="grid grid-cols-2 flex-col gap-y-16 gap-x-8 lg:gap-x-16 mt-16">
        <select-team class="col-span-2 lg:col-span-1" />
        <scout-tips class="col-span-2 lg:col-span-1" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useApiCall from "@/composition/useApiCall";
import { useAuthStore } from "@/stores/auth.js";
import { useSquadStore } from "@/stores/squad";
import DeadlineCard from "../components/dashboard/DeadlineCard.vue";
import DetailsCard from "../components/dashboard/DetailsCard.vue";
import TopArtistesOfTheWeek from "../components/dashboard/statistics/TopArtistesOfTheWeek.vue";
import ThisWeekChart from "../components/dashboard/statistics/ThisWeekChart.vue";
import MusicWeekDiff from "../components/dashboard/statistics/MusicWeekDiff.vue";
import TopTransfersIn from "../components/dashboard/statistics/TopTransfersIn.vue";
import TopTransferOut from "../components/dashboard/statistics/TopTransferOut.vue";
import ScoutTips from "../components/dashboard/new-user/ScoutTips.vue";
import SelectTeam from "../components/dashboard/new-user/SelectTeam.vue";

const squadStore = useSquadStore();
const authStore = useAuthStore();
const { getPlayerSquad, getCurrentWeek } = useApiCall();
const newUser = ref(null);
const currentWeek = ref(1);

onMounted(() => {
  getSquad();
  fetchWeek();
});

const getSquad = async () => {
  const playerId = authStore.waveProfile.player.id;

  await getPlayerSquad(playerId)
    .then((response) => {
      if (response === null || !response.artistes.length) {
        squadStore.currentSquad = [];
        newUser.value = true;
      } else {
        squadStore.squad = response;
        squadStore.currentSquad = response.artistes;
        newUser.value = false;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const fetchWeek = async () => {
  await getCurrentWeek()
    .then((response) => {
      currentWeek.value = response.week_number;
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>

<style lang="scss" scoped>
</style>