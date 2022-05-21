<template>
  <section class="stage">
    <div class="field md:rounded-t py-12 px-4 sm:py-16 sm:px-8">
      <!-- <div class="grid grid-cols-3 gap-y-24 place-items-center items-end"> -->
      <div class="flex flex-wrap gap-y-20 gap-x-10 sm:gap-x-16 justify-around items-center">
        <StageArtiste
          v-for="artiste in squadStore.currentSquad.slice(0, 3)"
          :key="artiste._id"
          :artiste="artiste"
          @remove-artiste="removeArtiste"
        />
        <StageArtiste
          v-for="artiste in squadStore.currentSquad.slice(3, 5)"
          :key="artiste._id"
          :artiste="artiste"
          @remove-artiste="removeArtiste"
        />
        <StageArtiste
          v-for="artiste in squadStore.currentSquad.slice(5, 8)"
          :key="artiste._id"
          :artiste="artiste"
          @remove-artiste="removeArtiste"
        />

        <UnknownArtiste
          v-for="item, index in emptySlots"
          :key="index"
          @click="$emit('startSelection')"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import StageArtiste from "./ui/StageArtiste.vue";
import UnknownArtiste from "./ui/UnknownArtiste.vue";
import { useSquadStore } from "@/stores/squad";
import { useTransfersStore } from "@/stores/transfers";
import { computed } from "vue";

defineEmits(["artiste-selected", "startSelection"]);

const squadStore = useSquadStore();
const transfersStore = useTransfersStore();

const tempAddToCurrentSquad = (artiste) => {
  squadStore.addToCurrentSquad(artiste);
};

const removeArtiste = (artiste) => {
  squadStore.removeFromCurrentSquad(artiste);
  openAllArtistesModal();
};

const emptySlots = computed(() => {
  const empty = 8 - squadStore.currentSquad.length;
  return Array.from(Array(empty).keys());
});
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