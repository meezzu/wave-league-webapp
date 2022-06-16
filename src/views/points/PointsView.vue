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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            @click="decreaseWeek"
            class="pointer-cursor"
            height="24"
            width="24"
          >
            <path
              :fill="week === 1 ? 'grey' : 'white'"
              d="M10 21.65 0.35 12 10 2.35 11.425 3.775 3.175 12 11.425 20.225Z"
            />
          </svg>

          <p class="text-white">MUSIC WEEK {{ week }}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            @click="increaseWeek"
            class="pointer-cursor"
            height="24"
            width="24"
          >
            <path
              fill="white"
              d="M8.025 21.65 6.6 20.225 14.825 12 6.6 3.775 8.025 2.35 17.675 12Z"
            />
          </svg>
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
            <p class="text-xl font-bold">2,194</p>
            <p class="text-sm text-grey3">My Rank</p>
          </div>
          <div class="border border-[#EDEDED] h-full"></div>
          <div>
            <p class="text-secondary text-xl font-bold">2</p>
            <p class="text-sm text-grey3">Transfers</p>
          </div>
        </div>
      </div>

      <ViewSelector class="mt-6" @viewStage="toggleView('stage')" @viewList="toggleView('list')" />

      <div class="views mt-8">
        <KeepAlive>
          <StageView v-show="view === 'stage'" :week="week" />
        </KeepAlive>
        <KeepAlive>
          <ListView v-show="view === 'list'" :week="week" @view-info="openArtisteFormModal" />
        </KeepAlive>
      </div>

      <div class="squad-card-wrapper mt-12 px-3 sm:px-0">
        <SquadDataCard class="squad-card" />
      </div>
    </div>
  </section>

  <ArtisteFormModal v-if="showFormModal" @close="closeArtisteFormModal" :artiste="currentArtiste" />
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import useApiCall from "@/composition/useApiCall";
import { useSquadStore } from "@/stores/squad";
import { useAuthStore } from "@/stores/auth.js";
import ViewSelector from "@/components/global/ViewSelector.vue";
import SquadDataCard from "@/components/squads/SquadDataCard.vue";
import StageView from "@/components/points/StageView.vue";
import ListView from "@/components/points/ListView.vue";
import ArtisteFormModal from "@/components/global/ArtisteFormModal.vue";

const { getPlayerSquad } = useApiCall();

const squadStore = useSquadStore();
const authStore = useAuthStore();

const view = ref("stage");
const week = ref(1);
const currentArtiste = ref(null);
const showFormModal = ref(false);

onBeforeMount(async () => {
  await getSquad();
});

function toggleView(viewType) {
  view.value = viewType;
}

const increaseWeek = () => {
  // check for max week
  week.value += 1;
};
const decreaseWeek = () => {
  if (week.value === 1) return;
  week.value -= 1;
};

const getSquad = async () => {
  const playerId = authStore.waveProfile.player.id;

  await getPlayerSquad(playerId)
    .then((response) => {
      squadStore.squad = response;
      squadStore.currentSquad = response.artistes;
    })
    .catch((error) => {
      console.error(error);
    });
};

function openArtisteFormModal(artiste) {
  currentArtiste.value = artiste;
  document.body.classList.add("modal-open");
  showFormModal.value = true;
}

function closeArtisteFormModal() {
  document.body.classList.remove("modal-open");
  showFormModal.value = false;
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

