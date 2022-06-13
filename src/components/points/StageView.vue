<template>
  <section class="stage">
    <div class="field md:rounded-t py-8 px-4 sm:py-16 sm:px-8">
      <div class="flex justify-between p-6 items-center">
        <StageArtiste
          v-for="artiste in squadStore.stageArtistes.slice(0,2)"
          :key="artiste._id"
          :artiste="artiste"
          :week="week"
          :class="{'inactive': Object.keys(selected).length && selected.id !== artiste.id}"
        />
      </div>
      <div class="flex items-center p-6 justify-center">
        <StageArtiste
          v-for="artiste in squadStore.stageArtistes.slice(2,3)"
          :key="artiste._id"
          :artiste="artiste"
          :week="week"
          :class="{'inactive': Object.keys(selected).length && selected.id !== artiste.id}"
        />
      </div>
      <div class="flex items-center p-6 justify-between">
        <StageArtiste
          v-for="artiste in squadStore.stageArtistes.slice(3, 5)"
          :key="artiste._id"
          :artiste="artiste"
          :week="week"
          :class="{'inactive': Object.keys(selected).length && selected.id !== artiste.id}"
        />
      </div>
    </div>

    <div class="sub bg-[#eee] rounded-b">
      <div class="flex justify-between p-6 items-center">
        <StageArtiste
          v-for="artiste in squadStore.benchArtistes"
          :key="artiste._id"
          :artiste="artiste"
          :week="week"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import StageArtiste from "@/components/points/ui/StageArtiste.vue";
import { useSquadStore } from "@/stores/squad";
import { ref } from "vue";

const squadStore = useSquadStore();
const selected = ref({});
const emits = defineEmits(["sub-artiste"]);
const props = defineProps(["week"]);
</script>

<style lang="scss" scoped>
.stage {
  .field {
    width: 100%;
    max-width: 570px;
    margin: auto;
    // height: 600px;
    background-image: url(@/assets/icons/field-bg.svg),
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