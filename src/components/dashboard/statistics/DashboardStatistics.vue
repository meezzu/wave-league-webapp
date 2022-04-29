<template>
  <section class="my-32">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-row-3 md:grid-row-2 gap-y-8 sm:gap-8"
    >
      <TopOfTheWeek class="row-span-1 col-span-1 md:col-span-2" />
      <ThisWeekChart class="row-span-3 col-span-1 md:col-span-2 lg:col-span-1" />
      <MusicWeekDiff class="col-span-1 md:col-span-2 lg:col-span-2" />
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
      <TopTransfersIn />
      <TopTransferOut />
    </div>
  </section>
</template>

<script>
import TopOfTheWeek from "./TopOfTheWeek.vue";
import ThisWeekChart from "./ThisWeekChart.vue";
import MusicWeekDiff from "./MusicWeekDiff.vue";
import TopTransfersIn from "./TopTransfersIn.vue";
import TopTransferOut from "./TopTransferOut.vue";
export default {
  components: {
    TopOfTheWeek,
    ThisWeekChart,
    MusicWeekDiff,
    TopTransfersIn,
    TopTransferOut,
  },
};
</script>

<style lang="scss" scoped>
</style>
