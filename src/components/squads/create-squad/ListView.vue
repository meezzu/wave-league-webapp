<template>
  <section class="stage">
    <div class="squad">
      <table class="table table__squad">
        <thead class="table__head">
          <th class="table__heading">Artiste</th>
          <th class="table__heading">Price</th>
          <th class="table__heading">Points</th>
        </thead>

        <tbody class="table__body">
          <tr
            v-for="artiste in squadStore.currentSquad"
            :key="artiste._id"
            class="table__row"
            @click="removeArtiste(artiste)"
          >
            <td class="table__data flex items-center gap-x-4">
              <img
                class="rounded-full h-12 w-12 border border-grey4 drop-shadow-sm"
                :src="artiste.avatar"
                :alt="artiste.artiste_name"
                width="30"
                height="30"
              />
              <p>{{ artiste.artiste_name }}</p>
            </td>
            <td class="table__data">{{ artiste.price }}m</td>
            <td class="table__data">--</td>
          </tr>

          <!-- empty slots  -->
          <tr
            v-for="item, index in emptySlots"
            :key="index"
            class="table__row"
            @click="openAllArtistesModal"
          >
            <td class="table__data flex items-center gap-x-4">
              <img
                src="../../../assets/icons/unknown-artiste.svg"
                alt="unknown artiste"
                width="30"
                height="30"
              />
              <p>--</p>
            </td>
            <td class="table__data">--</td>
            <td class="table__data">--</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { useSquadStore } from "@/stores/squad";
import { computed, ref } from "vue";

const showAllArtistesModal = ref(false);

const squadStore = useSquadStore();

const removeArtiste = (artiste) => {
  squadStore.removeFromCurrentSquad(artiste);
  openAllArtistesModal();
};

const emptySlots = computed(() => {
  const empty = 8 - squadStore.currentSquad.length;
  return Array.from(Array(empty).keys());
});

const openAllArtistesModal = () => {
  document.body.classList.add("modal-open");
  showAllArtistesModal.value = true;
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
    padding: 20px;
    text-align: left;
    border: none;
  }

  .table__data {
    padding: 20px;
    border-bottom: 1px solid #d9d9d9;
    text-align: left;
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