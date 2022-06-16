<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container relative rounded">
          <div class="modal-header text-center font-semibold bg-primary text-base p-4 rounded-t">
            <div class="flex items-center justify-start gap-x-4">
              <img
                :src="artiste.avatar"
                :alt="artiste.artiste_name"
                width="80"
                height="80"
                class="rounded-full border-2-white"
              />
              <p class="text-secondary">{{ artiste.artiste_name }}</p>
            </div>
            <div v-if="artisteInfo" class="flex justify-between mt-4">
              <div class="px-2">
                <p class="text-grey3">Form</p>
                <p class="text-white font-bold text-lg">{{ artisteInfo.form }}</p>
              </div>
              <div>
                <p class="text-grey3">Total Points</p>
                <p class="text-white font-bold text-lg">{{ artisteInfo.total_points }}</p>
              </div>
              <div>
                <p class="text-grey3">Price</p>
                <p class="text-white font-bold text-lg">{{ artisteInfo.price }}</p>
              </div>
            </div>
          </div>

          <div class="modal-body">
            <div v-if="artisteInfo">
              <div class="flex flex-col justify-start items-start gap-y-6">
                <p class="text-lg text-black1 px-2">This Season</p>

                <table class="table w-full">
                  <thead class="table__head">
                    <tr>
                      <th class="table__heading">MW</th>
                      <th class="table__heading">Form</th>
                      <th class="table__heading">Price</th>
                      <th class="table__heading">Points</th>
                    </tr>
                  </thead>

                  <tbody class="table__body">
                    <tr
                      v-for="(artiste, index) in artisteInfo.history.slice(0, 4)"
                      :key="index"
                      class="table__row"
                    >
                      <td class="table__data text-black1 font-semibold">{{ artiste.week_number }}</td>
                      <td class="table__data">{{ artiste.form }}</td>
                      <td class="table__data">{{ artiste.price }}m</td>
                      <td class="table__data">{{ artiste.points }}pts</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div v-else class="min-h-[150px] flex items-center justify-center min-w-full">
              <img src="@/assets/icons/loader-rolling.svg" alt="loading" height="40" width="40" />
            </div>
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
import { onMounted, ref } from "vue";
import AppButton from "@/components/global/AppButton.vue";
import useApiCall from "../../composition/useApiCall";

const { getSingleArtiste } = useApiCall();
const artisteInfo = ref(null);

const props = defineProps({
  artiste: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  getArtisteInfo();
});

const getArtisteInfo = async () => {
  try {
    artisteInfo.value = await getSingleArtiste(props.artiste.id);
  } catch (error) {
    console.error(error);
  }
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
    width: 80%;
  }
}

.modal-header {
  margin-top: 0;
}

.modal-body {
  margin: 20px 0;
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
    text-align: left;
    border: none;
    color: $primary;
    background-color: $grey5;
  }

  &__data {
    padding: 20px;
    border-bottom: 1px solid #d9d9d9;
    text-align: left;
  }
}
</style>