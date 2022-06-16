<template>
  <tr class="table__row">
    <td class="table__data">
      <img
        src="@/assets/icons/info-primary.svg"
        alt="artiste information"
        @click="$emit('viewInfo', artiste)"
      />
    </td>
    <td class="table__data flex items-center gap-x-4 text-secondary">
      <img
        :src="artiste.avatar"
        :alt="artiste.artiste_name"
        height="35"
        width="35"
        class="rounded-full shadow-lg"
      />
      {{ artiste.artiste_name }}
    </td>
    <td class="table__data">{{ artiste.price }}m</td>
    <td v-if="artisteData" class="table__data">{{ artisteData.points }}pts</td>
  </tr>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import useApiCall from "@/composition/useApiCall";
import { useAuthStore } from "@/stores/auth.js";
import { useSquadStore } from "@/stores/squad";

const authStore = useAuthStore();
const squadStore = useSquadStore();
const { getPlayerPoints, getPlayerSquad } = useApiCall();
const artisteData = ref(null);

const props = defineProps({
  artiste: {
    type: Object,
    required: true,
  },
  week: {
    type: Number,
    required: true,
  },
});

defineEmits(["viewInfo"]);
watch(
  () => props.week,
  async () => {
    await getPoints();
  },
  { deep: true }
);

onMounted(async () => {
  await getPoints();
});

const getPoints = async () => {
  const response = await getPlayerPoints({
    weekId: props.week,
    artisteId: props.artiste.id,
  });
  artisteData.value = response;
};
</script>