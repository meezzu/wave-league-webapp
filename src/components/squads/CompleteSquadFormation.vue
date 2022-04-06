<template>
  <section class="squad-substitute mt-12">
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

  <div class="squad-wrapper relative">
    <section class="squad-formation flex flex-col justify-center items-center">
      <div class="artistes pb-0">
        <div class="grid grid-cols-3 gap-x-24 gap-y-8 items-end place-content-evenly">
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

        <div class="flex justify-center items-center mt-8 gap-x-16">
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

    <div class="fans absolute bottom-0 left-0 right-0"></div>
  </div>
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

.squad-substitute {
  margin-top: 4rem;
  margin-bottom: 1rem;

  .subs {
    position: relative;
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
