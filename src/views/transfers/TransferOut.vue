<template>
  <section
    class="app-content"
    :class="showTransferTableModal ? 'overflow-hidden' : 'overflow-auto' "
  >
    <div class="flex justify-between items-center">
      <p
        v-if="squadStore && squadStore.squad !== null"
        class="font-medium px-4 text-lg"
      >{{ squadStore.squadName }}</p>
      <div
        class="text-secondary flex items-center justify-between space-x-2 cursor-pointer p-2 sm:p-0"
      >
        <p class="block">Artiste List</p>
        <img src="../../assets/icons/arrow-right-secondary.svg" alt="arrow" width="20" height="10" />
      </div>
    </div>

    <div class="content">
      <div class="actions mt-8 mb-12 p-2 sm:p-0">
        <!-- buttons  -->
        <div class="flex justify-around sm:justify-between sm:justify-around items-center">
          <AppButton text="Auto Select" width="auto" type="primary" :disabled="true" />
          <AppButton text="Reset Team" width="auto" type="primary" @clicked="resetTransfer" />
        </div>

        <!-- small cards  -->
        <div class="flex justify-around mt-12">
          <div class="card text-center py-4 px-2">
            <p class="text-base">2</p>
            <p class="text-sm text-grey3">Free Transfers</p>
          </div>
          <div class="card text-center py-4 px-2">
            <p class="text-base">0 pts</p>
            <p class="text-sm text-grey3">Cost</p>
          </div>
          <div class="card text-center py-4 px-2">
            <p class="text-base">5m</p>
            <p class="text-sm text-grey3">Money Left</p>
          </div>
        </div>
      </div>

      <template v-if="squadStore.currentSquad.length">
        <ViewSelector class="mt-6" @viewStage="toggleView('stage')" @viewList="toggleView('list')" />

        <div class="views mt-8">
          <StageView v-show="view === 'stage'" @artiste-selected="openTransferActionModal" />
          <ListView v-show="view === 'list'" @artiste-selected="openTransferActionModal" />
        </div>

        <div class="confirm-btn my-8 flex items-center justify-center">
          <AppButton
            text="Make Transfer"
            width="full"
            @clicked="openConfirmPromptModal"
            :disabled="!Object.keys(transferStore.currentTransfersOut).length"
          />
        </div>
      </template>

      <template v-else>
        <div class="my-16 text-lg text-center font-medium">
          <p>You cannot make transfers at the moment. Please go to Squad Page to select your Squad.</p>
          <router-link to="/squad">
            <app-button text="Go to Squad" type="secondary" class="mt-8"></app-button>
          </router-link>
        </div>
      </template>

      <div class="squad-card-wrapper mt-12 px-3 sm:px-0">
        <SquadDataCard class="squad-card" />
      </div>
    </div>

    <TransferActionModal
      v-show="showTransferActionModal"
      @close="closeTransferActionModal"
      @start-transfer="openTransferTableModal"
    ></TransferActionModal>

    <TransferTableModal
      v-show="showTransferTableModal"
      @close="closeTransferTableModal"
      @select-artiste="startTransfer"
    ></TransferTableModal>

    <ConfirmPromptModal
      v-show="showConfirmPromptModal"
      msg="Are you sure you want to make this transfer?"
      @close="closeConfirmPromptModal"
      @continue="confirmTransfer"
    />

    <ResultModal v-show="showResultModal" msg="Transfer Successful" @close="closeResultModal" />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useApiCall from "@/composition/useApiCall";
import { useSquadStore } from "@/stores/squad";
import { useToastStore } from "@/stores/toast";
import { useTransfersStore } from "@/stores/transfers";
import { useAuthStore } from "@/stores/auth.js";
import ViewSelector from "@/components/global/ViewSelector.vue";
import SquadDataCard from "@/components/squads/SquadDataCard.vue";
import StageView from "@/components/transfers/transfer-out/StageView.vue";
import ListView from "@/components/transfers/transfer-out/ListView.vue";
import AppButton from "@/components/global/AppButton.vue";
import TransferActionModal from "@/components/transfers/transfer-out/ui/TransferActionModal.vue";
import TransferTableModal from "../../components/transfers/transfer-out/ui/TransferTableModal.vue";
import ConfirmPromptModal from "@/components/global/ConfirmPromptModal.vue";
import ResultModal from "../../components/global/ResultModal.vue";

const { getPlayerSquad, transferArtistes } = useApiCall();

const squadStore = useSquadStore();
const authStore = useAuthStore();
const toastStore = useToastStore();
const transferStore = useTransfersStore();
const view = ref("stage");
const showTransferActionModal = ref(false);
const showTransferTableModal = ref(false);
const showConfirmPromptModal = ref(false);
const showResultModal = ref(false);

onMounted(() => {
  getSquad();
  transferStore.selected = {};
  transferStore.currentTransfersIn = {};
  transferStore.currentTransfersOut = {};
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

function startTransfer(artiste) {
  closeTransferTableModal();
  transferStore.currentTransfersOut = transferStore.selected;
  transferStore.currentTransfersIn = artiste;

  squadStore.removeFromCurrentSquad(transferStore.currentTransfersOut);
  squadStore.addToCurrentSquad(transferStore.currentTransfersIn);
  openConfirmPromptModal();
}

function confirmTransfer() {
  if (!Object.keys(transferStore.currentTransfersOut).length) return;
  closeConfirmPromptModal();
  const payload = {
    squadId: squadStore.squad.id,
    artistes: {
      in: transferStore.currentTransfersIn._id,
      out: transferStore.currentTransfersOut._id,
    },
  };
  transferArtistes(payload)
    .then(() => {
      openResultModal();
      getSquad();
      transferStore.selected = {};
      transferStore.currentTransfersIn = {};
      transferStore.currentTransfersOut = {};
    })
    .catch((error) => {
      console.error(error);
    });
}

function resetTransfer() {
  transferStore.selected = {};
  transferStore.currentTransfersIn = {};
  transferStore.currentTransfersOut = {};

  getSquad();
}

// modal functions
function openTransferActionModal() {
  document.body.classList.add("modal-open");
  showTransferActionModal.value = true;
}

function closeTransferActionModal() {
  document.body.classList.remove("modal-open");
  showTransferActionModal.value = false;
}

function openTransferTableModal() {
  closeTransferActionModal();
  document.body.classList.add("modal-open");
  showTransferTableModal.value = true;
}

function closeTransferTableModal() {
  document.body.classList.remove("modal-open");
  showTransferTableModal.value = false;
}

function openConfirmPromptModal() {
  document.body.classList.add("modal-open");
  showConfirmPromptModal.value = true;
}

function closeConfirmPromptModal() {
  document.body.classList.remove("modal-open");
  showConfirmPromptModal.value = false;
}

function openResultModal() {
  document.body.classList.add("modal-open");
  showResultModal.value = true;
}

function closeResultModal() {
  document.body.classList.remove("modal-open");
  showResultModal.value = false;
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
