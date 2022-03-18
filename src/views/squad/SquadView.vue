<template>
  <section class="squads">
    <article class="header flex pt-24 justify-center flex-col items-center w-5/12 m-auto">
      <div class="card w-full">
        <div class="card-body p-4 rounded-t bg-white text-center">
          <h2 class="text-xl font-semibold">Squad Selection</h2>
          <small class="text-grey3">You can ‘Auto Select’ your squad if you’re short of time</small>
        </div>

        <div class="card-footer text-center py-2 px-4 bg-primary">
          <p class="text-white text-sm font-semibold">
            MusicWeek1 deadline:
            <span class="text-secondary">Sun 1 Jan 2022</span>
          </p>
        </div>
        <div class="py-1 rounded-b px-4 bg-secondary"></div>
      </div>

      <div class="w-full flex justify-around items-center mt-8">
        <div class="flex flex-col items-center">
          <button
            @click="autoSelectSquad"
            type="button"
            class="text-white bg-secondary font-medium rounded-lg text-sm px-8 py-2 text-center"
          >Auto Select</button>
          <p class="text-grey4 mt-3">Selected Squad</p>
          <p class="text-secondary font-semibold">{{squadStore.currentSquad.length}}/8</p>
        </div>

        <div class="flex flex-col items-center">
          <button
            @click="resetSquad"
            type="button"
            class="text-white bg-secondary font-medium rounded-lg text-sm px-8 py-2 text-center"
          >Reset</button>
          <p class="text-grey4 mt-3">Money Remaining</p>
          <p class="text-secondary font-semibold">₦{{squadStore.totalSquadValue}}m</p>
        </div>
      </div>
    </article>

    <SquadsTable class="table z-10" :artistes="allArtistes" @selectArtiste="addPlayerToSquad"></SquadsTable>

    <SquadFormation />

    <CreateSquadModal
      v-show="showCreateSquadModal"
      @close="showCreateSquadModal = false"
      @submitted="createNewSquad"
    ></CreateSquadModal>
  </section>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import SquadsTable from "../../components/squads/SquadsTable.vue";
import SquadFormation from "../../components/squads/SquadFormation.vue";
import { useAuthStore } from "@/stores/auth.js";
import { useSquadStore } from "../../stores/squad";
import useApiCall from "@/composition/useApiCall";
import CreateSquadModal from "../../components/squads/CreateSquadModal.vue";

const showCreateSquadModal = ref(false);
const authStore = useAuthStore();
const squadStore = useSquadStore();

const { getPlayerSquad, createSquad, getAllArtistes, addToSquad } =
  useApiCall();

const squadCalled = ref(false);
const squadDetails = ref({});
const artistesQuery = reactive({
  page: 1,
  per_page: 10,
});
const allArtistes = ref({});

onMounted(() => {
  getSquad();
  getArtistes();
});

const getSquad = () => {
  const playerId = authStore.waveProfile.player.id;

  getPlayerSquad(playerId)
    .then((response) => {
      squadCalled.value = true;
      if (response === null) return openCreateSquadModal();
      else {
        squadStore.squad = response;
        squadDetails.value = response;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const createNewSquad = (squadName) => {
  const payload = {
    player: authStore.waveProfile.player.id,
    squad_name: squadName,
  };
  createSquad(payload)
    .then((response) => {
      squadDetails.value = response;
      squadStore.squad = response;
    })
    .catch((error) => console.error(error));
};

const getArtistes = () => {
  getAllArtistes(artistesQuery)
    .then((response) => {
      allArtistes.value = response;
    })
    .catch((error) => console.error(error));
};

const addPlayerToSquad = (artiste) => {
  squadStore.addToCurrentSquad(artiste);
};

const autoSelectSquad = () => {
  const shuffled = allArtistes.value.result.sort(function () {
    return 0.5 - Math.random();
  });
  const selected = shuffled.slice(0, 8);
  squadStore.emptyCurrentSquad();
  squadStore.addToCurrentSquad(selected);
};

const resetSquad = () => {
  squadStore.emptyCurrentSquad();
};

const openCreateSquadModal = () => {
  showCreateSquadModal.value = true;
};
</script>

<style lang="scss" scoped>
.squads {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, #000022 0%, #004f86 43.8%, #013e67 100%);

  .table {
    position: absolute;
    top: 5%;
    left: 1%;
  }
}
</style>