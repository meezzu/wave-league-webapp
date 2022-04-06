<template>
  <section class="squad-wrapper relative">
    <div class="squad-formation flex justify-center items-center">
      <div class="pt-4 pb-0">
        <div class="artistes grid grid-cols-4 gap-x-24 gap-y-12 items-end place-content-evenly">
          <template v-if="currentSelection.length > 0">
            <div
              v-for="selection in currentSelection"
              :key="selection.id"
              class="selection w-[80px] place-items-center"
            >
              <div class="flex justify-between items-center">
                <img
                  class="cursor-pointer"
                  src="../../assets/icons/delete-red.svg"
                  alt="remove artiste"
                  @click="removeArtisteFromSquad(selection)"
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

          <div v-for="item in emptySlots" :key="item" class="selection w-[80px] place-items-center">
            <!-- <div class="flex justify-between items-center">
            <img src="../../assets/icons/delete-red.svg" alt="remove artiste" />
            <img src="../../assets/icons/info-primary.svg" alt="info" />
            </div>-->
            <div class="flex flex-col items-center gap-2">
              <img
                src="../../assets/icons/unknown-artiste.svg"
                alt="artiste"
                width="60"
                height="60"
              />
              <img src="../../assets/icons/unknown-artiste-shadow.svg" alt="artiste" width="55" />
            </div>
            <div class="mt-2 text-center w-11/12 m-auto">
              <p class="bg-primary rounded-t text-secondary text-xs">-</p>
              <p class="bg-white text-xs rounded-b">-</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fans absolute bottom-0 left-0 right-0"></div>
  </section>
</template>

<script setup>
import { computed, defineEmits } from "vue";
import { useSquadStore } from "../../stores/squad";

const squadStore = useSquadStore();
const emits = defineEmits(["delete"]);

const currentSelection = computed(() => {
  return squadStore.currentSquad;
});

const emptySlots = computed(() => {
  return 8 - squadStore.currentSquad.length;
});

const removeArtisteFromSquad = (artiste) => {
  emits("delete", artiste);
};
</script>

<style lang="scss" scoped>
.squad-wrapper {
  display: inline-block;
  background-color: black;
  background-image: url("../../assets/icons/wave-league-logo-orange.svg");
  background-repeat: repeat;
  background-position: top;
  background-repeat-y: no-repeat;
  background-size: 335px 42px;
  // background-size: 231px 42px;
  padding: 45px 0 0 0;
  margin-top: 0rem;
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
.squad-formation {
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
