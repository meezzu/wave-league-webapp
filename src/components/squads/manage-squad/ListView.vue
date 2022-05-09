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
            v-for="artiste in squadStore.stageArtistes"
            :key="artiste._id"
            class="table__row"
            @click="selectArtiste(artiste)"
            :class="{'inactive': Object.keys(selected).length && selected.id !== artiste.id}"
          >
            <td class="table__data">
              <img src="@/assets/icons/info-primary.svg" alt="artiste information" />
            </td>
            <td class="table__data">{{ artiste.artiste_name }}</td>
            <td class="table__data">{{ artiste.price }}m</td>
            <td class="table__data">{{ artiste.price }}</td>
          </tr>
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
          <tr
            v-for="artiste in squadStore.benchArtistes"
            :key="artiste._id"
            class="table__row"
            @click="changeArtiste(artiste)"
          >
            <td class="table__data">
              <img src="@/assets/icons/info-primary.svg" alt="artiste information" />
            </td>
            <td class="table__data">{{ artiste.artiste_name }}</td>
            <td class="table__data">{{ artiste.price }}m</td>
            <td class="table__data">{{ artiste.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { useSquadStore } from "@/stores/squad";
import { ref, nextTick } from "vue";

const squadStore = useSquadStore();
const selected = ref({});
const emits = defineEmits(["sub-artiste"]);

const changeArtiste = async (artisteIn) => {
  if (!Object.keys(selected.value).length) return;
  const payload = {
    squadId: squadStore.squad.id,
    artistes: {
      out: selected.value.id,
      in: artisteIn.id,
    },
  };

  emits("sub-artiste", payload);
  await nextTick();
  selected.value = {};
};

const selectArtiste = (artiste) => {
  selected.value = artiste;
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
      background-color: $grey-5;
    }
  }

  .inactive {
    opacity: 0.5;
  }
}
</style>