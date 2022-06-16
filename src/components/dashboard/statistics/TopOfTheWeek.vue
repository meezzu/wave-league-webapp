<template>
  <div class="card">
    <div
      class="card-header capitalize text-xl text-white bg-primary py-4 px-8 font-semibold"
    >Top Artistes of the Week</div>

    <div class="card-body flex items-stretch justify-between relative">
      <div
        class="w-[34px] bg-[#f8f8f8] rounded-bl-lg cursor-pointer flex justify-center items-center"
        @click="slide('left')"
      >
        <svg
          width="12"
          height="22"
          viewBox="0 0 12 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.3827 0.0760941C11.2 0.00043001 10.9989 -0.0193646 10.8049 0.0192127C10.611 0.05779 10.4328 0.153007 10.2929 0.292829L0.292923 10.2928C0.200055 10.3857 0.126388 10.4959 0.076128 10.6173C0.0258682 10.7386 0 10.8687 0 11C0 11.1313 0.0258682 11.2614 0.076128 11.3827C0.126388 11.504 0.200055 11.6143 0.292923 11.7071L10.2929 21.7071C10.4328 21.847 10.611 21.9422 10.8049 21.9808C10.9989 22.0194 11.2 21.9996 11.3827 21.9239C11.5654 21.8482 11.7216 21.72 11.8315 21.5555C11.9414 21.3911 12 21.1978 12 21V0.999983C12 0.802203 11.9414 0.608867 11.8315 0.444418C11.7216 0.279969 11.5654 0.151792 11.3827 0.0760941Z"
            fill="#BDBDBD"
          />
        </svg>
      </div>

      <div
        ref="imgContainer"
        class="images-container py-8 mx-2 bg-white flex overflow-auto justify-start space-x-12 items-center"
      >
        <template v-if="charts">
          <div v-for="(artiste, index) in charts.result" :key="index" class="image">
            <img
              class="img z-10"
              :src="artiste.avatar"
              :alt="artiste.artiste_name"
              width="110"
              height="110"
            />
            <div class="image-detail text-center bg-[#f8f8f8]">
              <p class="text-secondary">{{ artiste.artiste_name }}</p>
              <p class="font-bold">{{ artiste.points }}pts</p>
            </div>
          </div>
        </template>

        <div v-if="!charts" class="min-h-[150px] flex items-center justify-center min-w-full">
          <img src="@/assets/icons/loader-rolling.svg" alt="loading" height="40" width="40" />
        </div>
      </div>

      <div
        class="w-[34px] bg-[#f8f8f8] rounded-br-lg cursor-pointer flex justify-center items-center rotate-180"
        @click="slide('right')"
      >
        <svg
          width="12"
          height="22"
          viewBox="0 0 12 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.3827 0.0760941C11.2 0.00043001 10.9989 -0.0193646 10.8049 0.0192127C10.611 0.05779 10.4328 0.153007 10.2929 0.292829L0.292923 10.2928C0.200055 10.3857 0.126388 10.4959 0.076128 10.6173C0.0258682 10.7386 0 10.8687 0 11C0 11.1313 0.0258682 11.2614 0.076128 11.3827C0.126388 11.504 0.200055 11.6143 0.292923 11.7071L10.2929 21.7071C10.4328 21.847 10.611 21.9422 10.8049 21.9808C10.9989 22.0194 11.2 21.9996 11.3827 21.9239C11.5654 21.8482 11.7216 21.72 11.8315 21.5555C11.9414 21.3911 12 21.1978 12 21V0.999983C12 0.802203 11.9414 0.608867 11.8315 0.444418C11.7216 0.279969 11.5654 0.151792 11.3827 0.0760941Z"
            fill="#BDBDBD"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useApiCall from "../../../composition/useApiCall";

const imgContainer = ref(null);
const charts = ref(null);
const { weekTopArtistes } = useApiCall();

onMounted(() => {
  getWeekTopArtistes();
});

async function getWeekTopArtistes() {
  const params = {
    page: 1,
    per_page: 10,
  };

  try {
    charts.value = await weekTopArtistes(params);
  } catch (error) {
    console.error(error);
  }
}

function slide(direction) {
  let scrollCompleted = 0;
  let slideVar = setInterval(function () {
    if (direction == "left") {
      imgContainer.value.scrollLeft -= 10;
    } else {
      imgContainer.value.scrollLeft += 10;
    }
    scrollCompleted += 10;
    if (scrollCompleted >= 100) {
      window.clearInterval(slideVar);
    }
  }, 50);
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
    .images-container {
      .image {
        .img {
        }

        .image-detail {
          height: 140px;
          margin-top: -80px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          border-radius: 57px;
          padding-bottom: 1rem;
          margin-right: 8px;
          margin-left: 8px;
        }
      }
    }
  }
}
</style>