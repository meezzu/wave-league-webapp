<template>
  <section class="transfers">
    <article class="header flex pt-20 justify-center flex-col items-center w-full md:w-5/12 m-auto">
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

const authStore = useAuthStore();
const squadStore = useSquadStore();
const transfersStore = useTransfersStore();

const { getPlayerSquad, getAllArtistes, transferArtistes } = useApiCall();

const artistesQuery = reactive({
  page: 1,
  per_page: 10,
});
const allArtistes = ref({});

onMounted(() => {
  getSquad();
  getArtistes();
});

onUnmounted(async () => {
  transfersStore.selected = {};
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

const swapArtistes = (artisteIn) => {
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

const getArtistes = () => {
  getAllArtistes(artistesQuery)
    .then((response) => {
      allArtistes.value = response;
    })
    .catch((error) => console.error(error));
};
</script>

<style lang="scss" scoped>
.transfers {
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