<template>
  <section class="squad-formation flex justify-center items-center">
    <div class="pt-4 pb-0">
      <div class="grid grid-cols-4 gap-x-24 gap-y-12 items-end place-content-evenly">
        <template v-if="currentSelection.length > 0">
          <div
            v-for="selection in currentSelection"
            :key="selection.id"
            class="selection z-10 relative w-[80px] place-items-center"
            :class="{'inactive': Object.keys(transfersStore.selected).length && selection.id === transfersStore.selected.id}"
          >
            <div class="flex justify-between items-center">
              <img
                class="cursor-pointer"
                src="../../assets/icons/delete-red.svg"
                alt="remove artiste"
                @click="selectArtiste(selection)"
              />
              <img class="cursor-pointer" src="../../assets/icons/info-primary.svg" alt="info" />
            </div>
            <div class="flex flex-col items-center gap-2">
              <img
                class="rounded-full h-16 w-16 border-2 border-grey4 drop-shadow-sm"
                :src="selection.avatar"
                alt="artiste"
                width="60"
                height="60"
              />
              <img src="../../assets/icons/unknown-artiste-shadow.svg" alt="artiste" width="55" />
            </div>
            <div class="mt-2 text-center w-11/12 m-auto">
              <p
                class="bg-primary rounded-t text-secondary text-xs"
              >{{ selection.artiste_name.split(" ")[1] }}</p>
              <p class="bg-white text-xs rounded-b">{{ selection.price }}m</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useSquadStore } from "../../stores/squad";
import { useTransfersStore } from "../../stores/transfers";

const squadStore = useSquadStore();
const transfersStore = useTransfersStore();

const selectArtiste = (artiste) => {
  transfersStore.selected = artiste;
};

const currentSelection = computed(() => {
  return squadStore.squad.artistes;
});
</script>

<style lang="scss" scoped>
.squad-formation {
  background: url("../../assets/imgs/squads-bg.png");
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  height: 80vh;

  .inactive {
    opacity: 0.4;
  }
}
</style>
