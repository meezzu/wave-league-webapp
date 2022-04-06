<template>
  <div></div>
  <div class="wrapper relative">
    <section class="transfers-formation flex justify-center items-center">
      <div class="pt-4 pb-0">
        <div class="artistes grid grid-cols-4 gap-x-24 gap-y-12 items-end place-content-evenly">
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

    <div class="fans absolute bottom-0 left-0 right-0"></div>

  </div>
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
.wrapper {
  display: inline-block;
  background-color: black;
  background-image: url("../../assets/icons/wave-league-logo-orange.svg");
  background-repeat: repeat;
  background-position: top;
  background-size: 231px 42px;
  padding: 45px 0 0 0;
  margin-top: 4rem;
  -webkit-clip-path: polygon(
    28% 0%,
    72% 0%,
    100% 57%,
    100% 100%,
    70% 100%,
    30% 100%,
    0 100%,
    0 57%
  );
  clip-path: polygon(
    28% 0%,
    72% 0%,
    100% 57%,
    100% 100%,
    70% 100%,
    30% 100%,
    0 100%,
    0 57%
  );
  width: 100%;
}
.transfers-formation {
  background-color: $secondary;
  clip-path: polygon(
    30% 0%,
    70% 0%,
    100% 66%,
    100% 83%,
    70% 100%,
    30% 100%,
    0 81%,
    0 67%
  );
  padding: 1rem;
  .artistes {
    padding: 1rem 0 2rem 0;
    margin-top: 1rem;
    margin-bottom: 8rem;
  }

  .inactive {
    opacity: 0.4;
  }
}

.fans {
  background-image: url("../../assets/imgs/fans-left.png"),
    url("../../assets/imgs/fans-right.png");
  background-position: left bottom, right bottom;
  background-size: 51vw, 51vw;
  background-repeat: no-repeat, no-repeat;
  height: 100%;
  width: 100vw;
}
</style>
