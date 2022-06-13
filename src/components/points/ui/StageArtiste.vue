<template>
  <div class="artiste w-[80px] cursor-pointer">
    <div class="flex items-center flex-col justify-center">
      <div class="relative flex items-start">
        <div>
          <img
            class="rounded-full h-16 w-16 border-2 border-grey4 drop-shadow-sm"
            :src="artiste.avatar"
            alt="artiste"
            width="50"
            height="50"
          />
        </div>
      </div>

      <div class="mt-2 text-center w-full">
        <p
          class="bg-primary rounded py-1.5 px-3 text-secondary text-xs"
        >{{ artiste.artiste_name.split(" ")[0] }}</p>

        <p
          v-if="artisteData"
          class="bg-white rounded-b py-1 px-2 text-black text-sm font-semibold"
        >{{ artisteData.points }}pts</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import useApiCall from "@/composition/useApiCall";

const { getPlayerPoints } = useApiCall();
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