<template>
  <section class="squads">
    <article class="header flex pt-20 justify-center flex-col items-center w-5/12 m-auto">
      <div class="card w-full">
        <div class="card-body p-3 rounded-t bg-primary text-center">
          <h2 class="text-xl font-semibold text-white">{{ squadStore.squad.squad_name }}</h2>
        </div>

        <div class="card-footer w-full text-center py-2 px-4 bg-white">
          <table class="table-auto border-collapse w-full">
            <thead>
              <tr>
                <th class="text-grey2 font-normal">Total Points</th>
                <th class="text-grey2 font-normal">Squad</th>
                <th class="text-grey2 font-normal">Squad Value</th>
                <th class="text-grey2 font-normal">In The Bank</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="font-medium text-lg text-black2">-</td>
                <td class="font-medium text-lg text-black2">8</td>
                <td class="font-medium text-lg text-black2">{{ squadStore.totalSquadValue }}</td>
                <td class="font-medium text-lg text-black2">{{ squadStore.squad.in_the_bank }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </article>

    <CompleteSquadFormation @subArtiste="changeArtistes" />
  </section>
</template>

<script setup>
import { onMounted, watchEffect } from "vue";
import CompleteSquadFormation from "../../components/squads/CompleteSquadFormation.vue";
import { useAuthStore } from "@/stores/auth.js";
import { useSquadStore } from "../../stores/squad";
import useApiCall from "@/composition/useApiCall";
import router from "../../router";
import { useToastStore } from "../../stores/toast";

const authStore = useAuthStore();
const squadStore = useSquadStore();
const toastStore = useToastStore();

const { getPlayerSquad, addToSquad, substituteArtiste } = useApiCall();

squadStore.$onAction(({ after }) => {
  after((result) => {
    if (!result) return;
    saveArtisteToSquad();
  });
}, true);

onMounted(() => {
  if (typeof squadStore.squad.roster === "undefined") getSquad();
});

watchEffect(async () => {
  const isComplete = squadStore.squadComplete;
  if (!isComplete) router.push({ name: "pick-squad" });
});

const getSquad = () => {
  const playerId = authStore.waveProfile.player.id;

  getPlayerSquad(playerId)
    .then((response) => {
      squadStore.squad = response;
      squadStore.currentSquad = response.artistes;
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
.squads {
  position: relative;
  min-height: calc(100vh - (#{$nav-height} + #{$footer-height}));
  background: linear-gradient(180deg, #000022 0%, #004f86 43.8%, #013e67 100%);

  .table {
    position: absolute;
    top: 5%;
    left: 1%;
  }
}
</style>