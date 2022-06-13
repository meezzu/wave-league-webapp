<template>
  <div class="card">
    <div class="card-header py-4 px-8 text-white bg-primary">
      <h3 class="capitalize text-base font-medium text-center">{{ squadStore.squadName }}</h3>
    </div>

    <div class="card-body py-8">
      <div class="flex items-center justify-between border-b p-4">
        <h4 class="capitalize text-sm text-[#4f4f4f] font-medium">Total Points</h4>
        <p class="text-black">{{ squadStore.squad.total_points }}</p>
      </div>

      <div class="flex items-center justify-between border-b p-4">
        <h4 class="capitalize text-sm text-[#4f4f4f] font-medium">Total Rank</h4>
        <p class="text-black">{{ squadStore.squad.squad_ranking }}</p>
      </div>

      <div class="flex items-center justify-between border-b p-4">
        <h4 class="capitalize text-sm text-[#4f4f4f] font-medium">Total Transfers</h4>
        <p class="text-black">{{ squadStore.squad.transfer_count }}</p>
      </div>

      <div class="flex items-center justify-between border-b p-4">
        <h4 class="capitalize text-sm text-[#4f4f4f] font-medium">Squad Value</h4>
        <p class="text-black">₦{{ squadStore.totalSquadValue }}m</p>
      </div>

      <div class="flex items-center justify-between p-4">
        <h4 class="capitalize text-sm text-[#4f4f4f] font-medium">In the Bank</h4>
        <p
          v-if="squadStore.squad !== null"
          class="text-black"
        >₦{{ squadStore.squad.in_the_bank }}m</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSquadStore } from "@/stores/squad";

const squadStore = useSquadStore();
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
}
</style>
