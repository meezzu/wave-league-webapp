<template>
  <section class="w-80">
    <div class="form-area">
      <div class="boxes rounded-t">
        <div class="box box1 rounded-t"></div>
      </div>

      <form class="bg-grey5 p-4 rounded-tr">
        <div class="field my-4">
          <input
            type="text"
            value="All Artitstes"
            disabled
            class="w-full px-4 py-2 outline-none rounded border"
            placeholder="All Artistes"
          />
        </div>
        <div class="field my-4">
          <input
            type="text"
            v-model.lazy.trim="artistesQuery.name"
            class="w-full px-4 py-2 outline-none rounded border"
            placeholder="Search"
          />
        </div>
        <div class="field my-4">
          <select
            name="points"
            id="points"
            v-model="artistesQuery.sort"
            class="w-full px-4 py-2 outline-none rounded border"
          >
            <option value="record_label">Record Label</option>
            <option value="-price">Price (High to Low)</option>
            <option value="price">Price (Low to High)</option>
            <option value="artiste_name">Artiste Name</option>
          </select>
        </div>
        <div class="field my-4">
          <select
            name="points"
            id="points"
            v-model.number="artistesQuery.max_price"
            class="w-full px-4 py-2 outline-none rounded border"
          >
            <option value disabled selected>Price (Range)</option>
            <option value="14">Up to 25</option>
            <option value="14">Up to 15</option>
            <option value="13">Up to 13</option>
            <option value="12">Up to 12</option>
            <option value="11">Up to 11</option>
            <option value="10">Up to 10</option>
            <option value="9">Up to 9</option>
          </select>
        </div>
      </form>
    </div>

    <div
      v-if="filteredArtistes.length"
      class="bg-primary max-h-[350px] overflow-y-scroll rounded-b"
    >
      <table class="relative w-full bg-primary block text-white table-auto border-collapse">
        <thead class="sticky top-0 z-10">
          <tr class="text-center">
            <th class="p-4 text-center border-b bg-[#0D0D34] border-[#28254D]">Artiste</th>
            <th class="p-4 text-center border-b bg-[#0D0D34] border-[#28254D]">₦</th>
            <th class="p-4 text-center border-b bg-[#0D0D34] border-[#28254D]">Points</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="artiste in filteredArtistes" :key="artiste.id">
            <tr
              class="text-center cursor-pointer"
              :class="{'opacity-25 cursor-not-allowed': artisteSelected(artiste) }"
              @click="selectArtiste(artiste)"
            >
              <td
                class="p-4 border-b bg-primary text-secondary border-[#28254D]"
              >{{ artiste.artiste_name }}</td>
              <td class="p-4 border-b bg-primary border-[#28254D]">{{ artiste.price }}</td>
              <td class="p-4 border-b bg-primary border-[#28254D]">{{ artiste.points }}</td>
            </tr>
          </template>
        </tbody>
      </table>

      <div v-if="filteredArtistes.length" class="w-full bg-primary py-8 text-center">
        <button
          class="text-white bg-secondary rounded-lg text-sm px-6 py-2 text-center"
          @click="fetchMoreArtistes"
        >Load More</button>
      </div>
    </div>

    <div v-else class="h-[200px] bg-primary flex justify-center items-center">
      <img src="../../assets/icons/loader-rolling.svg" alt="loading" height="40" width="40" />
    </div>
  </section>
</template>

<script setup>
import { computed, defineEmits, onMounted, reactive, watch } from "vue";
import { useSquadStore } from "../../stores/squad";
import { useArtistesStore } from "../../stores/artistes";
import useApiCall from "@/composition/useApiCall";
// import { debounce } from "lodash";

const squadStore = useSquadStore();
const artistesStore = useArtistesStore();
const { getAllArtistes } = useApiCall();
const emits = defineEmits(["select-artiste"]);

const artistesQuery = reactive({
  page: 1,
  per_page: 10,
  name: "",
  min_price: 1,
  max_price: 13,
  sort: "price",
});

onMounted(() => {
  getArtistes();
});

watch(
  () => [artistesQuery.max_price, artistesQuery.sort, artistesQuery.name],
  () => {
    getArtistes();
  },
  { deep: true }
);

const filteredArtistes = computed(() => {
  if (artistesStore.artistes?.length) return artistesStore.artistes;
  return {};
});

const getArtistes = () => {
  getAllArtistes(artistesQuery)
    .then((response) => {
      artistesStore.allArtistes = response;
    })
    .catch((error) => console.error(error));
};

const fetchMoreArtistes = async () => {
  incrementPage();

  getAllArtistes(artistesQuery)
    .then((response) => {
      const newArtistesList = response.result;
      const oldArtistesList = artistesStore.allArtistes.result;
      const allArtistesFetched = [...oldArtistesList, ...newArtistesList];
      artistesStore.$patch((state) => {
        state.allArtistes.result = allArtistesFetched;
      });
    })
    .catch((error) => console.error(error));
};

const incrementPage = () => {
  artistesQuery.page++;
};

const artisteSelected = (artiste) => {
  const selected = squadStore.currentSquad.filter(function (selection) {
    return selection._id === artiste._id;
  });
  if (selected.length) return true;
  return false;
};

const selectArtiste = (artiste) => {
  emits("select-artiste", artiste);
};
</script>

<style lang="scss" scoped>
.boxes {
  .box {
    height: 50px;
    width: 100%;
    background-image: linear-gradient(
      to top right,
      $grey5 50%,
      transparent 50%
    );
  }
}
</style>