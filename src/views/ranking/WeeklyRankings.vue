<template>
  <section class="app-content">
    <div class="content">
      <div class="title text-lg font-medium px-4">
        <p>Rankings</p>
      </div>

      <div class="mt-8 flex flex-col items-center justify-between gap-y-16">
        <form class="w-full flex justify-center px-4">
          <select
            name="week"
            id="week"
            class="w-full sm:w-4/5 outline-0 px-2 py-4 rounded-lg border-[#e8e8e8] border text-black3 font-medium text-center"
          >
            <option value="all" selected>Overall</option>
            <!-- <option value="1">Music Week 1</option>
            <option value="2">Music Week 2</option> -->
          </select>
        </form>

        <table class="table">
          <thead class="table__head">
            <th class="table__heading">Rank</th>
            <th class="table__heading">Team & Manager</th>
            <th class="table__heading">MW Point</th>
            <th class="table__heading">Total</th>
          </thead>

          <tbody class="table__body">
            <tr v-for="(rank, index) in ranking" :key="index" class="table__row">
              <td class="table__data">{{ index + 1 }}</td>
              <td class="table__data">
                <p class="capitalize font-semibold">{{ rank.squad_name }}</p>
                <small class="text-grey3">{{ rank.player_name}}</small>
              </td>
              <td class="table__data font-semibold">{{ rank.week }}</td>
              <td class="table__data font-semibold">{{ rank.points }}</td>
            </tr>
          </tbody>
        </table>

        <!-- <app-button text="Next" width="full"></app-button> -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useSquadStore } from "@/stores/squad";
import useApiCall from "@/composition/useApiCall";
import AppButton from "@/components/global/AppButton.vue";

const squadStore = useSquadStore();

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
.app-content {
  width: 100%;
  //   padding: 0 1rem;
  margin: 2rem auto;
  max-width: 1024px;

  @media only screen and (min-width: 500px) {
    padding: 0 2rem;
    margin: 2rem auto;
    width: 85%;
  }

  @media only screen and (min-width: 768px) {
    width: 75%;
  }

  @media only screen and (min-width: 1024px) {
    width: 75%;
    margin: 4rem auto;
  }

  @media only screen and (min-width: 1440px) {
    width: 50%;
  }
}

.content {
  margin: auto;
  width: 100%;
  max-width: 570px;
}

.table {
  width: 100%;
  border-collapse: collapse;

  &__row {
    cursor: pointer;

    .table__data:nth-of-type(2) {
      text-align: left;
    }
  }

  &__heading {
    font-weight: 500;
    font-size: 16px;
    padding: 12px;
    text-align: center;
    border: none;
    color: $white;
    background-color: $primary;
  }

  &__data {
    padding: 20px;
    border-bottom: 1px solid #d9d9d9;
    text-align: center;
  }
}
</style>

