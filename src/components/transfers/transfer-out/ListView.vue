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
          <tr
            v-for="artiste in squadStore.currentSquad"
            :key="artiste._id"
            class="table__row"
            @click="selectArtiste(artiste)"
          >
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
                class="rounded-full shadow-lg drop-shadow-sm"
              />
              {{ artiste.artiste_name }}
            </td>
            <td class="table__data">{{ artiste.price }}m</td>
            <td class="table__data">{{ artiste.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { useSquadStore } from "../../../stores/squad";
import { useTransfersStore } from "../../../stores/transfers";

const emits = defineEmits(["artiste-selected"]);

const squadStore = useSquadStore();
const transfersStore = useTransfersStore();

const selectArtiste = (artiste) => {
  transfersStore.selected = artiste;
  emits("artiste-selected", artiste);
};
</script>

<style lang="scss" scoped>
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