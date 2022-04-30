<template>
  <div class="selector flex items-center justify-center">
    <div
      class="px-8 py-3 rounded-l text-sm font-medium transition-all ease-in duration-300"
      :class="view === 'stage' ? 'bg-primary text-white' : 'bg-white shadow-lg text-black'"
      @click="toggleView('stage')"
    >Stage View</div>
    <div
      class="px-8 py-3 rounded-r text-sm font-medium transition-all ease-in duration-300"
      :class="view === 'list' ? 'bg-primary text-white' : 'bg-white shadow-lg text-black'"
      @click="toggleView('list')"
    >List View</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const view = ref("stage");
const emits = defineEmits(["view-stage", "view-list"]);

function toggleView(toView) {
  view.value = toView;
  emits(`view-${view.value}`);
}
</script>
