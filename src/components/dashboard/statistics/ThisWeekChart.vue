<template>
  <div class="card">
    <div class="card-header bg-primary py-4">
      <h3
        class="card-header capitalize text-xl text-white bg-primary py-4 px-8 font-semibold"
      >Top Squads of the Week</h3>
    </div>

    <div class="card-body">
      <table class="table-auto w-full border-collapse">
        <thead>
          <tr class="border-b font-semibold text-grey3">
            <th class="p-3">Rank</th>
            <th class="p-3 text-left">Squad</th>
            <th class="p-3">Points</th>
          </tr>
        </thead>
        <tbody v-if="ranking" class="text-center">
          <tr
            v-for="team, index in ranking.slice(0, 10)"
            :key="index"
            class="text-black2"
            :class="{'border-b': index !== 10}"
          >
            <td class="p-4 text-bold">{{ index + 1 }}.</td>
            <td class="capitalize text-left">{{ team.squad_name }}</td>
            <td>{{ team.points }}</td>
          </tr>
        </tbody>
      </table>

      <div v-if="!ranking" class="min-h-[200px] flex items-center justify-center min-w-full">
        <img src="@/assets/icons/loader-rolling.svg" alt="loading" height="40" width="40" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useApiCall from "../../../composition/useApiCall";

const ranking = ref(null);
const { leagueRanking } = useApiCall();

onMounted(() => {
  getLeagueRanking();
});

async function getLeagueRanking() {
  try {
    ranking.value = await leagueRanking();
  } catch (error) {
    console.error(error);
  }
}
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