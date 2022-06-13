<template>
  <section class="stage">
    <div class="squad">
      <table class="table table__squad">
        <thead class="table__head">
          <th class="table__heading"></th>
          <th class="table__heading">Artiste</th>
          <th class="table__heading">Price</th>
          <th class="table__heading">Points</th>
        </thead>

        <tbody class="table__body">
          <ArtisteRow
            class="table__row"
            v-for="(artiste, index) in squadStore.stageArtistes"
            :key="index"
            :artiste="artiste"
            :week="week"
          ></ArtisteRow>
        </tbody>
      </table>
    </div>

    <div class="sub">
      <table class="table table__sub">
        <thead class="table__head">
          <th class="table__heading"></th>
          <th class="table__heading">Substitutes</th>
          <th class="table__heading">Price</th>
          <th class="table__heading">Points</th>
        </thead>

        <tbody class="table__body">
          <ArtisteRow
            class="table__row"
            v-for="(artiste, index) in squadStore.benchArtistes"
            :key="index"
            :artiste="artiste"
            :week="week"
          ></ArtisteRow>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import ArtisteRow from "./ui/ArtisteRow.vue";
import { useSquadStore } from "@/stores/squad";

const squadStore = useSquadStore();
const props = defineProps(["week"]);
</script>

<style lang="scss">
.stage {
  .squad {
    width: 100%;
    max-width: 570px;
    margin: auto;
  }

  .sub {
    width: 100%;
    max-width: 570px;
    margin: auto;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
  }

  .table__row {
    cursor: pointer;
  }
  .table__heading {
    font-weight: 500;
    font-size: 16px;
    padding: 12px;
    text-align: center;
    border: none;
  }

  .table__data {
    padding: 20px;
    border-bottom: 1px solid #d9d9d9;
    text-align: center;
  }

  .table__squad {
    .table__heading {
      color: $white;
      background-color: $primary;
    }
  }

  .table__sub {
    .table__heading {
      color: $primary;
      background-color: $grey5;
    }
  }

  .inactive {
    opacity: 0.5;
  }
}
</style>