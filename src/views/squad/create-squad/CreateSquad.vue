<template>
  <section v-if="!pageLoading" class="app-content">
    <div class="flex justify-between">
      <p
        v-if="squadStore.squad !== null"
        class="font-medium px-4 text-lg"
      >{{ squadStore.squadName }}</p>
      <div
        class="text-secondary flex items-center justify-between space-x-2 cursor-pointer p-2 sm:p-0"
      >
        <p class="block">Artiste List</p>
        <img src="@/assets/icons/arrow-right-secondary.svg" alt="arrow" width="20" height="10" />
      </div>
    </div>

    <div class="content">
      <div class="actions mt-8 mb-12 p-2 sm:p-0">
        <!-- buttons  -->
        <div class="flex justify-around sm:justify-between sm:justify-around items-center">
          <AppButton text="Auto Select" width="auto" type="primary" :disabled="false" />
          <AppButton
            text="Reset Team"
            width="auto"
            type="primary"
            @clicked="resetTransfer"
            :disabled="true"
          />
        </div>

        <!-- small cards  -->
        <div class="flex justify-center sm:gap-x-12 mt-12">
          <div class="card text-center py-4 px-2 rounded-l-lg border-r sm:rounded-lg sm:border-r-0">
            <p class="text-base text-secondary mb-2">{{ squadStore.currentSquad.length }} / 8</p>
            <p class="text-sm text-grey3">Artiste Selected</p>
          </div>
          <div class="card text-center py-4 px-2 rounded-r-lg border-l sm:rounded-lg sm:border-l-0">
            <p
              v-if="squadStore.squad !== null && Object.keys(squadStore.squad).length"
              class="text-base mb-2"
            >{{ squadStore.squad.in_the_bank - squadStore.currentSquadValue }}m</p>
            <p v-else class="text-base mb-2">-- m</p>
            <p class="text-sm text-grey3">Money Left</p>
          </div>
        </div>
      </div>
      <ViewSelector class="mt-6" @viewStage="toggleView('stage')" @viewList="toggleView('list')" />

      <div class="views mt-8">
        <StageView
          v-show="view === 'stage'"
          @subArtiste="changeArtistes"
          @start-selection="startSelection"
        />
        <ListView v-show="view === 'list'" @subArtiste="changeArtistes" />
      </div>

      <div class="confirm-btn my-8 flex items-center justify-center">
        <AppButton
          v-if="!loading"
          text="Save Squad"
          width="full"
          :disabled="squadStore.currentSquadLength < 8"
          @clicked="saveSquad"
        />

        <div v-if="loading">
          <img
            src="../../../assets/icons/loader-rolling.svg"
            alt="loading indicator"
            height="60"
            width="60"
          />
        </div>
      </div>
    </div>

    <CreateSquadModal
      v-if="showCreateSquadModal"
      @close="showCreateSquadModal = false"
      @submitted="createNewSquadName"
    ></CreateSquadModal>

    <AllArtistesModal
      v-if="showAllArtistesModal"
      @close="closeAllArtistesModal"
      @select-artiste="tempAddToCurrentSquad"
    ></AllArtistesModal>
  </section>

  <template v-if="pageLoading">
    <FullLoadingScreen />
  </template>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import useApiCall from "@/composition/useApiCall";
import CreateSquadModal from "@/components/squads/CreateSquadModal.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { useSquadStore } from "@/stores/squad";
import { useArtistesStore } from "@/stores/artistes";
import { useToastStore } from "@/stores/toast";
import AppButton from "@/components/global/AppButton.vue";
import ViewSelector from "@/components/global/ViewSelector.vue";
import StageView from "../../../components/squads/create-squad/StageView.vue";
import ListView from "../../../components/squads/create-squad/ListView.vue";
import FullLoadingScreen from "../../../components/global/FullLoadingScreen.vue";
import AllArtistesModal from "@/components/global/AllArtistesModal.vue";

const squadStore = useSquadStore();
const authStore = useAuthStore();
const router = useRouter();
const artistesStore = useArtistesStore();
const toastStore = useToastStore();

const showCreateSquadModal = ref(false);
const loading = ref(false);
const view = ref("stage");
const pageLoading = ref(true);
const showAllArtistesModal = ref(false);

const { getPlayerSquad, createSquad, addToSquad } = useApiCall();

watchEffect(async () => {
  const isComplete = await squadStore.squadComplete;
  if (isComplete) router.push({ name: "manage-squad" });
});

onMounted(async () => {
  pageLoading.value = true;
  await getSquad();
  if (squadStore.squadComplete) router.push({ name: "manage-squad" });
  pageLoading.value = false;
});

function toggleView(viewType) {
  view.value = viewType;
}

const getSquad = async () => {
  const playerId = authStore.waveProfile.player.id;

  await getPlayerSquad(playerId)
    .then((response) => {
      if (response === null) {
        squadStore.currentSquad = [];
        return openCreateSquadModal();
      } else {
        squadStore.squad = response;
        squadStore.currentSquad = response.artistes;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

// save squad players
const saveSquad = () => {
  loading.value = true;
  const currentSquad = squadStore.currentSquad;
  const payload = {
    squadId: squadStore.squad._id,
    artistes: { currentSquad },
  };
  addToSquad(payload)
    .then((response) => {
      loading.value = false;
      squadStore.squad.artistes = response.artistes;
      squadStore.currentSquad = response.artistes;
      toastStore.displayToast("Squad saved successfully!");
    })
    .catch((error) => {
      loading.value = false;
      console.error(error);
    });
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

const startSelection = () => {
  if (squadStore.squadName === undefined || squadStore.squad === null) {
    return openCreateSquadModal();
  }
  openAllArtistesModal();
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

const openAllArtistesModal = () => {
  document.body.classList.add("modal-open");
  showAllArtistesModal.value = true;
};

const closeAllArtistesModal = () => {
  document.body.classList.remove("modal-open");
  showAllArtistesModal.value = false;
};
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

    min-width: 140px;
  }
}
</style>
