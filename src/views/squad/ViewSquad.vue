<template>
  <section class="squads">
    <article class="header flex p-32 justify-center flex-col items-center w-5/12 m-auto">
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
    </article>

    <CompleteSquadFormation @delete="deleteSingleArtisteFromSquad" />
  </section>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import CompleteSquadFormation from "../../components/squads/CompleteSquadFormation.vue";
import { useAuthStore } from "@/stores/auth.js";
import { useSquadStore } from "../../stores/squad";
import useApiCall from "@/composition/useApiCall";
import router from "../../router";

const showCreateSquadModal = ref(false);
const authStore = useAuthStore();
const squadStore = useSquadStore();

const {
  getPlayerSquad,

  addToSquad,
  removeFromSquad,
} = useApiCall();

const squadCalled = ref(false);

squadStore.$onAction(({ after }) => {
  after((result) => {
    if (!result) return;
    saveArtisteToSquad();
  });
}, true);

onMounted(() => {
  getSquad();
});

watchEffect(async () => {
  const isComplete = squadStore.squadComplete;
  if (!isComplete) router.push({ name: "pick-squad" });
});

const getSquad = () => {
  const playerId = authStore.waveProfile.player.id;

  getPlayerSquad(playerId)
    .then((response) => {
      squadCalled.value = true;
      if (response === null) return openCreateSquadModal();
      else {
        squadStore.squad = response;
        squadStore.currentSquad = response.artistes;
        // squadDetails.value = response;
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