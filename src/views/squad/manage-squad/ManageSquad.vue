<template>
  <section class="app-content">
    <div class="font-medium px-4 text-lg">{{ squadStore.squadName }}</div>

    <div class="content">
      <ViewSelector class="mt-6" @viewStage="toggleView('stage')" @viewList="toggleView('list')" />

      <div class="views mt-8">
        <StageView v-show="view === 'stage'" @subArtiste="changeArtistes" />
        <ListView v-show="view === 'list'" />
      </div>

      <div class="squad-card-wrapper mt-12 px-3 sm:px-0">
        <SquadDataCard class="squad-card" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import useApiCall from "@/composition/useApiCall";
import { useSquadStore } from "@/stores/squad";
import { useToastStore } from "@/stores/toast";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import ViewSelector from "@/components/global/ViewSelector.vue";
import SquadDataCard from "@/components/squads/SquadDataCard.vue";
import StageView from "@/components/squads/manage-squad/StageView.vue";
import ListView from "@/components/squads/manage-squad/ListView.vue";

const { getPlayerSquad, substituteArtiste } = useApiCall();

const squadStore = useSquadStore();
const authStore = useAuthStore();
const toastStore = useToastStore();
const router = useRouter();

const view = ref("stage");

onMounted(() => {
  if (typeof squadStore.squad.roster === "undefined") getSquad();
});

watchEffect(async () => {
  const isComplete = squadStore.squadComplete;
  if (!isComplete) router.push({ name: "pick-squad" });
});

function toggleView(viewType) {
  view.value = viewType;
}

function getSquad() {
  const playerId = authStore.waveProfile.player.id;

  getPlayerSquad(playerId)
    .then((response) => {
      squadStore.squad = response;
      squadStore.currentSquad = response.artistes;
    })
    .catch((error) => {
      console.error(error);
    });
}

const changeArtistes = async (payload) => {
  substituteArtiste(payload)
    .then(() => {
      toastStore.displayToast("Substitution complete!");
      getSquad();
    })
    .catch((error) => {
      console.error(error);
    });
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

.squad-card-wrapper {
  width: 100%;

  .squad-card {
    margin: auto;
    width: 100%;
    max-width: 570px;
  }
}
</style>
