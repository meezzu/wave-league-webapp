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
            @click="autoSelectArtistes"
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

    <SquadsTable class="table z-10" @selectArtiste="addPlayerToSquad"></SquadsTable>

    <SquadFormation @delete="deleteSingleArtisteFromSquad" />

    <CreateSquadModal
      v-show="showCreateSquadModal"
      @close="showCreateSquadModal = false"
      @submitted="createNewSquad"
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

const { getPlayerSquad, createSquad, addToSquad, removeFromSquad } =
  useApiCall();

squadStore.$onAction(({ after }) => {
  after((result) => {
    if (!result) return;
    if (squadStore.currentSquad.length === 8) saveArtisteToSquad();
  });
}, true);

watchEffect(async () => {
  const isComplete = squadStore.squadComplete;
  if (isComplete) router.push({ name: "view-squad" });
});

onMounted(async () => {
  await getSquad();
  if (squadStore.squadComplete) router.push({ name: "view-squad" });
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

const saveArtisteToSquad = () => {
  const artistes = squadStore.currentSquad.map((artiste) => artiste._id);
  const payload = {
    squadId: squadStore.squad._id,
    artistes: { artistes },
  };
  addToSquad(payload)
    .then((response) => {
      squadStore.squad.artistes = response.artistes;
      squadStore.currentSquad = response.artistes;
      toastStore.displayToast("Squad selection complete");
    })
    .catch((error) => console.error(error));
};

const deleteSingleArtisteFromSquad = (artisteInfo) => {
  const artistes = [artisteInfo._id];
  const payload = {
    squadId: squadStore.squad._id,
    artistes: { artistes },
  };
  removeFromSquad(payload)
    .then((response) => {
      squadStore.squad.artistes = response.artistes;
      squadStore.currentSquad = response.artistes;
    })
    .catch((error) => console.error(error));
};

const createNewSquad = (squadName) => {
  const payload = {
    player: authStore.waveProfile.player.id,
    squad_name: squadName,
  };
  createSquad(payload)
    .then((response) => {
      squadStore.squad = response;
      showCreateSquadModal.value = false;
    })
    .catch((error) => console.error(error));
};

const addPlayerToSquad = (artiste) => {
  squadStore.addToCurrentSquad(artiste);
};

const resetSquad = () => {
  removeAllArtistes();
};

const removeAllArtistes = () => {
  if (squadStore.currentSquad.length === 0) return;
  const artistes = squadStore.currentSquad.map((artiste) => artiste._id);
  const payload = {
    squadId: squadStore.squad._id,
    artistes: { artistes },
  };
  removeFromSquad(payload)
    .then((response) => {
      squadStore.squad.artistes = response.artistes;
      squadStore.currentSquad = response.artistes;
    })
    .catch((error) => console.error(error));
};

const autoSelectArtistes = () => {
  const artistes = squadStore.currentSquad.map((artiste) => artiste._id);
  const payload = {
    squadId: squadStore.squad._id,
    artistes: { artistes },
  };
  if (squadStore.squad.artistes.length) {
    removeFromSquad(payload)
      .then((response) => {
        squadStore.squad.artistes = response.artistes;
        squadStore.currentSquad = response.artistes;
      })
      .catch((error) => console.error(error));
  }

  // const shuffled = artistesStore.artistes.sort(function () {
  //   return 0.5 - Math.random();
  // });
  const shuffled = shuffleArray(artistesStore.artistes);
  const selected = shuffled.slice(0, 8);
  squadStore.emptyCurrentSquad();
  squadStore.addToCurrentSquad(selected);
};

// const selectRandomArtistes = (artistes) => {
//   const selected = [];

//   // const shuffled = artistes.sort(function () {
//   //   return 0.5 - Math.random();
//   // });
//   const shuffled = artistes.sort(function () {
//     return 0.5 - Math.random();
//   });
//   const selected = shuffled.slice(0, 8);
// };

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
  min-height: 100vh;
  background: linear-gradient(180deg, #000022 0%, #004f86 43.8%, #013e67 100%);
  position: relative;
  .table {
    position: absolute;
    top: 5%;
    left: 1%;
  }
}
</style>