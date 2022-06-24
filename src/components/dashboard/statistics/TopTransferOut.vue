<template>
  <div class="card">
    <div class="card-header bg-primary py-4 px-4 flex justify-between items-center">
      <h3 class="capitalize text-xl text-white font-semibold">Top Transfers Out</h3>
      <!-- <div class="flex space-x-4">
        <span class="text-base font-bold text-white">More</span>

        <img src="@/assets/icons/arrow-right.svg" alt="arrow-right" />
      </div>-->
    </div>

    <div class="card-body">
      <table class="table-auto w-full border-collapse">
        <thead>
          <tr class="border-b font-semibold text-grey3 text-left">
            <th class="p-3">Level</th>
            <th class="p-3">Artistes</th>
            <th class="p-3">Transfers</th>
          </tr>
        </thead>
        <tbody v-if="topTransfers">
          <tr
            v-for="artiste, index in topTransfers.slice(0, 8)"
            :key="index"
            class="text-black2 text-left p-3"
            :class="{'border-b': index !== 10}"
          >
            <td class="p-4 text-bold p-3">{{index + 1}}.</td>
            <td class="flex items-center p-4 gap-x-4 justify-start p-3">
              <img
                :src="artiste.avatar"
                :alt="artiste.artiste_name"
                height="30"
                width="30"
                class="rounded-full shadow-lg"
              />
              <p>{{ artiste.artiste_name }}</p>
            </td>
            <td class="p-3">{{ artiste.transfer_count }}</td>
          </tr>
        </tbody>
      </table>

      <div v-if="!topTransfers" class="min-h-[200px] flex items-center justify-center min-w-full">
        <img src="@/assets/icons/loader-rolling.svg" alt="loading" height="40" width="40" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useApiCall from "@/composition/useApiCall";

const { topTransfersOut } = useApiCall();
const topTransfers = ref(null);

onMounted(async () => {
  await getTopTransfersOut();
});

const getTopTransfersOut = async () => {
  try {
    topTransfers.value = await topTransfersOut();
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped>
.card {
  background: #ffffff;
  box-shadow: -4px -4px 30px rgba(216, 216, 216, 0.25),
    3px 3px 10px rgba(148, 148, 148, 0.25);
  border-radius: 8px;

  .card-header {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .card-body {
    width: 100%;
  }
}
</style>