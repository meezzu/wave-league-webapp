<template>
  <section class="squads">
    <article
      class="header flex pt-20 pb-12 justify-center flex-col items-center w-full md:w-5/12 m-auto"
    >
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

      <div class="w-full flex justify-around items-start mt-8">
        <div class="flex flex-col items-center">
          <button
            @click.prevent="autoSelectArtistes"
            type="button"
            class="text-white bg-secondary font-medium rounded-lg text-sm px-8 py-2 text-center"
          >Auto Select</button>
          <p class="text-grey4 mt-3">Selected Squad</p>
          <p class="text-secondary font-semibold">{{squadStore.currentSquad.length}}/8</p>
        </div>

        <div class="flex flex-col items-center">
          <button
            type="button"
            class="text-white bg-secondary font-medium rounded-lg text-sm px-8 py-2 text-center cursor-pointer disabled:bg-grey3 disabled:cursor-not-allowed"
            :disabled="squadStore.currentSquadLength !== 8"
            @click.prevent="saveSquad"
          >Save Squad</button>
        </div>

        <div class="flex flex-col items-center">
          <button
            @click.prevent="resetSquad"
            type="button"
            class="text-white bg-secondary font-medium rounded-lg text-sm px-8 py-2 text-center cursor-pointer disabled:bg-grey3 disabled:cursor-not-allowed"
            :disabled="squadStore.squadComplete || !squadStore.currentSquad.length"
          >Reset</button>
          <p class="text-grey4 mt-3">Money Remaining</p>
          <p class="text-secondary font-semibold">₦{{squadStore.totalSquadValue}}m</p>
        </div>
      </div>
    </article>

    <SquadsTable class="table z-10" @selectArtiste="addPlayerToSquad"></SquadsTable>

    <SquadFormation @delete="deleteArtisteFromSquad" />

    <CreateSquadModal
      v-show="showCreateSquadModal"
      @close="showCreateSquadModal = false"
      @submitted="createNewSquadName"
    ></CreateSquadModal>
  </section>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import SquadsTable from "../../components/squads/SquadsTable.vue";
import SquadFormation from "../../components/squads/SquadFormation.vue";
import { useAuthStore } from "@/stores/auth.js";
import { useSquadStore } from "../../stores/squad";
import useApiCall from "@/composition/useApiCall";
import CreateSquadModal from "../../components/squads/CreateSquadModal.vue";
import { useRouter } from "vue-router";
import { useArtistesStore } from "../../stores/artistes";
import { useToastStore } from "../../stores/toast";

const squadStore = useSquadStore();
const authStore = useAuthStore();
const router = useRouter();
const artistesStore = useArtistesStore();
const toastStore = useToastStore();

const showCreateSquadModal = ref(false);

const { getPlayerSquad, createSquad, addToSquad } = useApiCall();

watchEffect(async () => {
  const isComplete = squadStore.squadComplete;
  if (isComplete) router.push({ name: "manage-squad" });
});

onMounted(async () => {
  await getSquad();
  if (squadStore.squadComplete) router.push({ name: "manage-squad" });
});

const getSquad = () => {
  const playerId = authStore.waveProfile.player.id;

  getPlayerSquad(playerId)
    .then((response) => {
      if (response === null) return openCreateSquadModal();
      else {
        squadStore.squad = response;
        squadStore.currentSquad = response.artistes;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const saveSquad = () => {
  const currentSquad = squadStore.currentSquad;
  const payload = {
    squadId: squadStore.squad._id,
    artistes: { currentSquad },
  };
  addToSquad(payload)
    .then((response) => {
      squadStore.squad.artistes = response.artistes;
      squadStore.currentSquad = response.artistes;
      toastStore.displayToast("Squad saved successfully!");
    })
    .catch((error) => console.error(error));
};

const deleteArtisteFromSquad = (artiste) => {
  squadStore.removeFromCurrentSquad(artiste);
};

// creates new squad name
const createNewSquadName = (squadName) => {
  const payload = {
    player: authStore.waveProfile.player.id,
    squad_name: squadName,
  };
  createSquad(payload)
    .then((response) => {
      squadStore.squad = response;
      showCreateSquadModal.value = false;
      toastStore.displayToast("Squad name updated!");
    })
    .catch((error) => console.error(error));
};

// update current selection in store
const addPlayerToSquad = (artiste) => {
  squadStore.addToCurrentSquad(artiste);
};

const resetSquad = () => {
  squadStore.emptyCurrentSquad();
};

const autoSelectArtistes = () => {
  resetSquad();
  // const shuffled = artistesStore.artistes.sort(function () {
  //   return 0.5 - Math.random();
  // });
  const shuffled = shuffleArray(artistesStore.artistes);
  const selected = shuffled.slice(0, 8);
  squadStore.emptyCurrentSquad();
  squadStore.addToCurrentSquad(selected);
};

const shuffleArray = (array) => {
  var tmp,
    current,
    top = array.length;

  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }

  return array;
};

const openCreateSquadModal = () => {
  showCreateSquadModal.value = true;
};
</script>

<style lang="scss" scoped>
.squads {
  position: relative;
  min-height: calc(100vh - (#{$nav-height} + #{$footer-height}));
  background: linear-gradient(180deg, #000022 0%, #004f86 43.8%, #013e67 100%);
  position: relative;
  .table {
    position: absolute;
    top: 5%;
    left: 1%;
  }
}
</style>