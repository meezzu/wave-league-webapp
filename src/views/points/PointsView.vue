<template>
  <section class="app-content">
    <div class="flex justify-between items-center">
      <p
        v-if="squadStore && squadStore.squad !== null"
        class="font-medium px-4 text-lg"
      >{{ squadStore.squadName }}</p>
    </div>

    <div class="content">
      <!-- week day scroll  -->
      <div class="w-full mt-8 px-4 sm:px-0 flex justify-center">
        <div class="flex w-full sm:w-4/6 rounded-lg p-3 justify-between items-center bg-primary">
          <img src alt />
          <p class="text-white">MUSIC WEEK 1</p>
          <img src alt />
        </div>
      </div>

      <!-- cards  -->
      <div class="actions px-4 sm:px-0 grid grid-cols-3 grid-rows-2 gap-4 mt-8 mb-12 p-2 sm:p-0">
        <div
          class="card text-center py-4 px-2 col-span-1 row-span-2 flex flex-col items-center justify-center"
        >
          <p class="text-xl font-bold">200</p>
          <p class="text-sm text-grey3">Final Points</p>
        </div>
        <div class="card text-center py-4 px-2 col-span-2 flex justify-around items-center">
          <div>
            <p class="text-xl font-bold">64</p>
            <p class="text-sm text-grey3">Average Pts</p>
          </div>
          <div class="border border-[#EDEDED] h-full"></div>
          <div>
            <p class="text-secondary text-xl font-bold">200</p>
            <p class="text-sm text-grey3">Highest Pts</p>
          </div>
        </div>
        <div class="card text-center py-4 px-2 col-span-2 flex justify-around items-center">
          <div>
            <p class="text-xl font-bold">64</p>
            <p class="text-sm text-grey3">Average Pts</p>
          </div>
          <div class="border border-[#EDEDED] h-full"></div>
          <div>
            <p class="text-secondary text-xl font-bold">200</p>
            <p class="text-sm text-grey3">Highest Pts</p>
          </div>
        </div>
      </div>

      <template v-if="squadStore.currentSquad.length">
        <ViewSelector class="mt-6" @viewStage="toggleView('stage')" @viewList="toggleView('list')" />

        <div class="views mt-8">
          <StageView v-show="view === 'stage'" />
          <ListView v-show="view === 'list'" />
        </div>
      </template>

      <template v-else>
        <div class="my-16 text-lg text-center font-medium">
          <p>You cannot make transfers at the moment. Please go to Squad Page to select your Squad.</p>
          <router-link to="/squad">
            <app-button text="Go to Squad" type="secondary" class="mt-8"></app-button>
          </router-link>
        </div>
      </template>

      <div class="squad-card-wrapper mt-12 px-3 sm:px-0">
        <SquadDataCard class="squad-card" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useApiCall from "@/composition/useApiCall";
import { useSquadStore } from "@/stores/squad";
import { useToastStore } from "@/stores/toast";
import { useTransfersStore } from "@/stores/transfers";
import { useAuthStore } from "@/stores/auth.js";
import ViewSelector from "@/components/global/ViewSelector.vue";
import SquadDataCard from "@/components/squads/SquadDataCard.vue";
import StageView from "@/components/points/StageView.vue";
import ListView from "@/components/points/ListView.vue";
import AppButton from "@/components/global/AppButton.vue";

// const { getPlayerSquad, transferArtistes } = useApiCall();

const squadStore = useSquadStore();
const authStore = useAuthStore();
const toastStore = useToastStore();
const transferStore = useTransfersStore();

const view = ref("stage");

function toggleView(viewType) {
  view.value = viewType;
}
</script>

<style lang="scss" scoped>
.app-content {
  width: 100%;
  //   padding: 0 1rem;
  margin: 2rem auto;
  max-width: 1024px;

  @media only screen and (min-width: 500px) {
    padding: 0 2rem;
    margin: 2rem auto;
    width: 85%;
  }

  @media only screen and (min-width: 768px) {
    width: 75%;
  }

  @media only screen and (min-width: 1024px) {
    width: 75%;
    margin: 4rem auto;
  }

  @media only screen and (min-width: 1440px) {
    width: 50%;
  }
}

.content {
  margin: auto;
  width: 100%;
  max-width: 570px;

  .card {
    background: $white;
    box-shadow: -4px -4px 15px rgba(216, 216, 216, 0.15),
      4px 4px 15px rgba(169, 168, 168, 0.15);
    border-radius: 8px;
    min-width: 100px;
  }
}
</style>

