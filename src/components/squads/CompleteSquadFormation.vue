<template>
  <section class="squad-substitute my-20">
    <div>
      <template v-if="currentSelection.length > 0">
        <div class="flex justify-center items-center flex-col">
          <div class="subs z-10 flex justify-center items-center gap-x-16">
            <div
              v-for="selection in benchArtistes"
              :key="selection.id"
              class="cursor-pointer"
              @click="changeArtiste(selection)"
            >
              <div class="mb-4 text-center w-11/12 m-auto">
                <p
                  class="bg-primary rounded py-1 text-secondary text-xs"
                >{{ selection.artiste_name.split(" ")[1] }}</p>
              </div>
              <div class="flex justify-between items-center">
                <img
                  class="cursor-pointer"
                  src="../../assets/icons/substitute.svg"
                  alt="remove artiste"
                  width="20"
                  height="20"
                />
                <img
                  class="cursor-pointer"
                  src="../../assets/icons/info-primary.svg"
                  alt="info"
                  width="20"
                  height="20"
                />
              </div>
              <div class="flex flex-col items-center gap-2">
                <img
                  class="rounded-full h-16 w-16 border-2 border-grey4 drop-shadow-sm"
                  :src="selection.avatar"
                  alt="artiste"
                  width="50"
                  height="50"
                />
                <img src="../../assets/icons/unknown-artiste-shadow.svg" alt="artiste" width="50" />
              </div>
            </div>
          </div>

          <div
            class="z-0 h-[2rem] bg-secondary w-[22rem] rounded border-grey1 border mb-0 skew-x-12 mt-[-40px]"
          ></div>
        </div>
      </template>
    </div>
  </section>

  <section class="squad-formation flex flex-col justify-center items-center">
    <div class="pb-0">
      <div class="grid grid-cols-3 gap-x-24 gap-y-12 items-end place-content-evenly">
        <template v-if="currentSelection.length > 0">
          <div
            v-for="selection in stageArtistes.slice(0, 3)"
            :key="selection.id"
            class="selection w-[80px] place-items-center cursor-pointer"
            :class="{'inactive': Object.keys(selected).length && selected.id !== selection.id}"
            @click.stop="selectArtiste(selection)"
          >
            <div class="flex justify-between items-center">
              <img
                class="cursor-pointer"
                src="../../assets/icons/substitute.svg"
                alt="remove artiste"
                width="20"
                height="20"
              />
              <img
                class="cursor-pointer"
                src="../../assets/icons/info-primary.svg"
                alt="info"
                width="20"
                height="20"
              />
            </div>
            <div class="flex flex-col items-center gap-2">
              <img
                class="artiste-img rounded-full h-16 w-16 border-2 border-grey4 drop-shadow-sm"
                :src="selection.avatar"
                alt="artiste"
                width="50"
                height="50"
              />
              <img src="../../assets/icons/unknown-artiste-shadow.svg" alt="artiste" width="55" />
            </div>
            <div class="mt-2 text-center w-11/12 m-auto">
              <p
                class="bg-primary rounded py-1 text-secondary text-xs"
              >{{ selection.artiste_name.split(" ")[1] }}</p>
              <!-- <p class="bg-white text-xs rounded-b">{{ selection.price }}m</p> -->
            </div>
          </div>
        </template>
      </div>

      <div class="flex justify-center items-center mt-8 gap-x-24">
        <template v-if="currentSelection.length > 0">
          <div
            v-for="selection in stageArtistes.slice(3,5)"
            :key="selection.id"
            @click="selectArtiste(selection)"
            :class="{'inactive': Object.keys(selected).length && selected.id !== selection.id}"
            class="selection w-[80px] place-items-center"
          >
            <div class="flex justify-between items-center">
              <img
                class="cursor-pointer"
                src="../../assets/icons/substitute.svg"
                alt="remove artiste"
                width="20"
                height="20"
              />
              <img
                class="cursor-pointer"
                src="../../assets/icons/info-primary.svg"
                alt="info"
                width="20"
                height="20"
              />
            </div>
            <div class="flex flex-col items-center gap-2">
              <img
                class="artiste-img rounded-full h-16 w-16 border-2 border-grey4 drop-shadow-sm"
                :src="selection.avatar"
                alt="artiste"
                width="50"
                height="50"
              />
              <img src="../../assets/icons/unknown-artiste-shadow.svg" alt="artiste" width="55" />
            </div>
            <div class="mt-2 text-center w-11/12 m-auto">
              <p
                class="bg-primary rounded py-1 text-secondary text-xs"
              >{{ selection.artiste_name.split(" ")[1] }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, defineEmits, nextTick } from "vue";
import { useSquadStore } from "../../stores/squad";

const squadStore = useSquadStore();
const selected = ref({});
const emits = defineEmits(["sub-artiste"]);

const changeArtiste = async (artiste) => {
  if (!Object.keys(selected.value).length) return;
  const payload = {
    squadId: squadStore.squad.id,
    artistes: {
      out: selected.value.id,
      in: artiste.id,
    },
  };

  emits("sub-artiste", payload);
  await nextTick();
  selected.value = {};
};

const selectArtiste = (artiste) => {
  selected.value = artiste;
};

const currentSelection = computed(() => {
  return squadStore.squad.artistes;
});

const benchArtistes = computed(() => {
  return squadStore.squadPosition.filter((artiste) => {
    return artiste.location === "bench";
  });
});

const stageArtistes = computed(() => {
  return squadStore.squadPosition.filter((artiste) => {
    return artiste.location === "stage";
  });
});
</script>

<style lang="scss" scoped>
.squad-formation {
  background: url("../../assets/imgs/squads-bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 11rem 0;
  // padding-bottom: 4rem;
}

.squad-substitute {
  margin-top: 5rem;
  margin-bottom: 0rem;

  .subs {
    position: relative;
  }
}

.artiste-img {
  &::after {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    top: 0%;
    left: 0%;
    border-radius: 50%;
    box-shadow: 0 0 6px #d8d8d8;
    animation: glow-grow 2s ease-out infinite;
    animation-delay: 0s;
  }
}

.inactive {
  opacity: 0.5;
}

@keyframes glow-grow {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: scale(1.3);
    opacity: 0;
  }
}
</style>
