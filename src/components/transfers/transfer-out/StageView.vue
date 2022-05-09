<template>
  <section class="stage">
    <div class="field md:rounded-t py-8 px-4 sm:py-16 sm:px-8">
      <div class="flex justify-between p-6 items-center">
        <StageArtiste
          v-for="artiste in squadStore.currentSquad.slice(0,3)"
          :key="artiste._id"
          :artiste="artiste"
          @click="selectArtiste(artiste)"
        />
      </div>
      <div class="flex items-center p-6 justify-around">
        <StageArtiste
          v-for="artiste in squadStore.currentSquad.slice(3,5)"
          :key="artiste._id"
          :artiste="artiste"
          @click="selectArtiste(artiste)"
        />
        <!-- :class="{'inactive': Object.keys(transfersStore.selected).length && transfersStore.selected.id !== artiste.id}" -->
      </div>
      <div class="flex items-center p-6 justify-between">
        <StageArtiste
          v-for="artiste in squadStore.currentSquad.slice(5, 8)"
          :key="artiste._id"
          :artiste="artiste"
          @click="selectArtiste(artiste)"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import StageArtiste from "./ui/StageArtiste.vue";
import { useSquadStore } from "../../../stores/squad";
import { useTransfersStore } from "../../../stores/transfers";

const emits = defineEmits(["artiste-selected"]);

const squadStore = useSquadStore();
const transfersStore = useTransfersStore();

const selectArtiste = (artiste) => {
  transfersStore.selected = artiste;
  emits("artiste-selected", artiste);
};
</script>

<style lang="scss" scoped>
.stage {
  .field {
    width: 100%;
    max-width: 570px;
    margin: auto;
    // height: 600px;
    background-image: url(../../../assets/icons/field-bg.svg),
      linear-gradient(180deg, #013e67 0%, #004f86 43.8%, #013e67 100%);
  }

  .sub {
    width: 100%;
    max-width: 570px;
    margin: auto;
  }
}

.inactive {
  opacity: 0.5;
}
</style>