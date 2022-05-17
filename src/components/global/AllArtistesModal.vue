<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container relative rounded">
          <div
            class="modal-header text-center font-semibold text-base border-b flex justify-between items-center px-4 py-4"
          >
            <p class="text-black1">Select Artiste</p>
            <p v-if="!allLoading" class="text-grey3">
              Money Left:
              <span
                v-if="squadStore.squad"
                class="font-semibold text-primary"
              >{{ squadStore.squad.in_the_bank - squadStore.currentSquadValue }}m</span>
            </p>
          </div>

          <div class="modal-body flex flex-col justify-center items-center gap-y-6">
            <template v-if="!allLoading">
              <!-- form area  -->
              <form class="form">
                <div class="form__field">
                  <input class="form__input" type="text" placeholder="All Artistes" disabled />
                </div>
                <div class="form__field">
                  <input
                    class="form__input"
                    type="text"
                    name="artiste"
                    v-model.lazy.trim="artistesQuery.name"
                    placeholder="Artiste name"
                  />
                </div>
                <div class="form__field">
                  <select v-model="artistesQuery.sort" class="form__select">
                    <option value="record_label">Record Label</option>
                    <option value="-price">Price (High to Low)</option>
                    <option value="price">Price (Low to High)</option>
                    <option value="artiste_name">Artiste Name</option>
                  </select>
                </div>
                <div class="form__field">
                  <select v-model.number="artistesQuery.max_price" class="form__select">
                    <option value selected disabled>Price Range</option>
                    <option value="25">Up to 25</option>
                    <option value="20">Up to 20</option>
                    <option value="15">Up to 15</option>
                    <option value="10">Up to 10</option>
                    <option value="5">Up to 5</option>
                  </select>
                </div>
              </form>

              <!-- table area - all artistes  -->
              <div class="table-area">
                <table class="table">
                  <thead class="table__head">
                    <tr>
                      <th class="table__heading">Artiste</th>
                      <th class="table__heading">Price</th>
                      <th class="table__heading">Points</th>
                    </tr>
                  </thead>

                  <tbody class="table__body">
                    <tr
                      v-for="artiste in filteredArtistes"
                      :key="artiste._id"
                      class="table__row"
                      :class="{'opacity-25 cursor-not-allowed pointer-events-none': currentArtiste(artiste) }"
                      @click="selectArtiste(artiste)"
                    >
                      <td class="table__data">{{ artiste.artiste_name }}</td>
                      <td class="table__data">{{ artiste.price }}</td>
                      <td class="table__data">{{ artiste.points }}</td>
                    </tr>
                  </tbody>
                </table>

                <div class="more my-8 flex justify-center items-center">
                  <app-button
                    v-if="!moreLoading && artistesQuery.page < artistesStore.allArtistes.total_pages"
                    text="More"
                    type="secondary"
                    @clicked="fetchMoreArtistes"
                  />
                  <div v-if="moreLoading">
                    <img
                      src="@/assets/icons/loader-rolling.svg"
                      alt="loading"
                      height="40"
                      width="40"
                    />
                  </div>
                </div>
              </div>
            </template>

            <template v-else>
              <div class="loader">
                <img src="@/assets/icons/loader-rolling.svg" alt="loading" height="40" width="40" />
              </div>
            </template>
          </div>

          <div class="modal-footer"></div>

          <img
            class="absolute top-[-12px] right-[-12px] cursor-pointer"
            src="@/assets/icons/delete-primary.svg"
            @click="$emit('close')"
            alt="cancel"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import AppButton from "@/components/global/AppButton.vue";
import { onMounted, computed, watch, reactive, ref } from "vue";
import { useSquadStore } from "@/stores/squad";
import { useArtistesStore } from "@/stores/artistes";
import useApiCall from "@/composition/useApiCall";
import { useToastStore } from "@/stores/toast";

const squadStore = useSquadStore();
const artistesStore = useArtistesStore();
const toastStore = useToastStore();
const { getAllArtistes } = useApiCall();
const emits = defineEmits(["select-artiste", "close"]);

const artistesQuery = reactive({
  page: 1,
  per_page: 10,
  name: "",
  min_price: 1,
  max_price: 20,
  sort: "price",
});
const allLoading = ref(false);
const moreLoading = ref(false);
const responseInfo = ref({});

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
  allLoading.value = true;
  getAllArtistes(artistesQuery)
    .then((response) => {
      allLoading.value = false;
      artistesStore.allArtistes = response;
    })
    .catch((error) => console.error(error));
};

const fetchMoreArtistes = async () => {
  moreLoading.value = true;
  incrementPage();

  getAllArtistes(artistesQuery)
    .then((response) => {
      moreLoading.value = false;
      responseInfo.value = response;
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

const currentArtiste = (artiste) => {
  const selected = squadStore.currentSquad.filter(function (selection) {
    return selection._id === artiste._id;
  });
  if (selected.length) return true;
  return false;
};

const selectArtiste = (artiste) => {
  if (Number(artiste.price) + Number(squadStore.totalSquadValue) > 100) {
    toastStore.displayToast("Ooops, Artiste is too expensive!");
    return;
  }
  emits("selectArtiste", artiste);
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 400px;
  width: auto;
  margin: 0px auto;
  // padding: 20px 30px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;

  @media only screen and (max-width: 600px) {
    width: 90%;
    margin-top: 4rem;
  }
}

.modal-header {
  margin-top: 0;
}

.modal-body {
  margin: 20px 0;

  .loader {
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.form {
  width: 100%;
  padding: 16px;

  &__field {
    width: 100%;
    margin-bottom: 1rem;
  }

  &__input,
  &__select {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid $grey4;
    border-radius: 4px;
    outline: none;
  }
}

.table-area {
  min-width: 100%;
  height: 300px;
  max-width: 320px;
  overflow-y: scroll;
  position: relative;

  .table__head th {
    position: sticky;
    top: 0;
    z-index: 1;
  }
}

.table {
  width: 100%;
  border-collapse: collapse;

  &__body {
  }

  &__head {
  }

  &__row {
    cursor: pointer;
  }

  &__heading {
    font-weight: 500;
    font-size: 16px;
    padding: 12px;
    text-align: center;
    border: none;
    color: $primary;
    background-color: $grey5;
  }

  &__data {
    padding: 20px;
    border-bottom: 1px solid #d9d9d9;
    text-align: center;
  }
}
</style>