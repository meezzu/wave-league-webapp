<template>
  <section class="my-32">
    <div class="grid grid-cols-3 grid-row-2 gap-8">
      <TopOfTheWeek class="col-span-2 row-span-1" />
      <ThisWeekChart class="row-span-2" />
      <MusicWeekDiff class="col-span-2 row-span-1" />
    </div>
    <div class="grid grid-cols-2 gap-16 mt-16">
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
