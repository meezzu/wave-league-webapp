<template>
  <section class="squads">
    <article class="header flex pt-24 justify-center flex-col items-center w-5/12 m-auto">
      <div class="card rounded w-full">
        <div class="card-body rounded p-4 rounded-t text-center">
          <table class="border-collapse w-full">
            <thead>
              <tr>
                <th class="bg-primary p-4 rounded-tl text-white font-normal">Free Transfer</th>
                <th class="bg-primary p-4 text-white font-normal">Cost</th>
                <th class="bg-primary p-4 text-white font-normal">Money left Value</th>
                <th class="bg-primary p-4 rounded-tr text-white font-normal"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="bg-white border-none border-0 rounded-bl font-medium text-black2">1</td>
                <td
                  class="bg-white font-medium text-black2"
                >{{ Object.keys(transfersStore.selected).length ? `- ${transfersStore.selected.price}` : 0 }} pts</td>
                <td
                  class="bg-white border-none border-0 font-medium text-black2"
                >{{squadStore.squad.in_the_bank}}m</td>
                <td class="bg-white p-2 rounded-br font-medium text-black2 flex flex-col gap-y-2">
                  <button
                    type="button"
                    class="text-white bg-grey3 font-medium rounded-lg text-sm px-3 py-2 text-center cursor-pointer"
                  >Auto Select</button>
                  <button
                    type="button"
                    class="text-white bg-grey3 font-medium rounded-lg text-sm px-3 py-2 text-center cursor-pointer"
                  >Reset</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </article>

    <SquadsTable class="table z-10" :artistes="allArtistes" @selectArtiste="swapArtistes"></SquadsTable>

    <TransfersFormation />
  </section>
</template>

<script setup>
import { ref, onMounted, reactive, onUnmounted } from "vue";
import SquadsTable from "../../components/squads/SquadsTable.vue";
import { useAuthStore } from "@/stores/auth.js";
import { useSquadStore } from "../../stores/squad";
import useApiCall from "@/composition/useApiCall";
import TransfersFormation from "@/components/transfers/TransfersFormation.vue";
// import { useRouter } from "vue-router";
import { useTransfersStore } from "../../stores/transfers";

const showCreateSquadModal = ref(false);
const authStore = useAuthStore();
const squadStore = useSquadStore();
const transfersStore = useTransfersStore();

const { getPlayerSquad, getAllArtistes, transferArtistes } = useApiCall();

const squadCalled = ref(false);
const artistesQuery = reactive({
  page: 1,
  per_page: 10,
});
const allArtistes = ref({});

onMounted(async () => {
  await getSquad();
  getArtistes();
});

onUnmounted(async () => {
  transfersStore.selected = {};
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

const swapArtistes = (artisteIn) => {
  console.log(artisteIn);
  if (!Object.keys(transfersStore.selected).length) return;
  const payload = {
    squadId: squadStore.squad.id,
    artistes: {
      in: artisteIn._id,
      out: transfersStore.selected.id,
    },
  };
  transferArtistes(payload)
    .then(() => {
      getSquad();
      transfersStore.selected = {};
    })
    .catch((error) => {
      console.error(error);
    });
};
// const saveArtisteToSquad = () => {
//   const artistes = squadStore.currentSquad.map((artiste) => artiste._id);
//   const payload = {
//     squadId: squadStore.squad._id,
//     artistes: { artistes },
//   };
//   addToSquad(payload)
//     .then((response) => {
//       squadStore.squad.artistes = response.artistes;
//       squadStore.currentSquad = response.artistes;
//     })
//     .catch((error) => console.error(error));
// };

const getArtistes = () => {
  getAllArtistes(artistesQuery)
    .then((response) => {
      allArtistes.value = response;
    })
    .catch((error) => console.error(error));
};

// const addPlayerToSquad = (artiste) => {
//   squadStore.addToCurrentSquad(artiste);
// };

// const resetSquad = () => {
//   removeAllArtistes();
// };

// const removeAllArtistes = () => {
//   const artistes = squadStore.currentSquad.map((artiste) => artiste._id);
//   const payload = {
//     squadId: squadStore.squad._id,
//     artistes: { artistes },
//   };
//   removeFromSquad(payload)
//     .then((response) => {
//       squadStore.squad.artistes = response.artistes;
//       squadStore.currentSquad = response.artistes;
//     })
//     .catch((error) => console.error(error));
// };

// const autoSelectArtistes = () => {
//   const artistes = squadStore.currentSquad.map((artiste) => artiste._id);
//   const payload = {
//     squadId: squadStore.squad._id,
//     artistes: { artistes },
//   };
//   if (squadStore.squad.artistes.length) {
//     removeFromSquad(payload)
//       .then((response) => {
//         squadStore.squad.artistes = response.artistes;
//         squadStore.currentSquad = response.artistes;
//       })
//       .catch((error) => console.error(error));
//   }

//   const shuffled = allArtistes.value.result.sort(function () {
//     return 0.5 - Math.random();
//   });
//   const selected = shuffled.slice(0, 8);
//   squadStore.emptyCurrentSquad();
//   squadStore.addToCurrentSquad(selected);
// };

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