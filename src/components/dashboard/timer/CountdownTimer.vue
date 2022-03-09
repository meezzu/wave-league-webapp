<template>
  <section class="timer py-32 flex items-stretch justify-center space-x-4">
    <div v-for="time, index in state.times" :key="index" class="flex items-center">
      <TimeCard :time="time"></TimeCard>
      <div v-if="index < state.times.length - 1" class="timer-divider mx-4 mb-8">:</div>
    </div>
  </section>
</template>

<script>
import { reactive, onMounted } from "vue";
import TimeCard from "./TimeCard.vue";
import moment from "moment";

export default {
  components: {
    TimeCard,
  },
  setup() {
    const state = reactive({
      times: [
        { id: 0, text: "Days", time: 1 },
        { id: 1, text: "Hours", time: 1 },
        { id: 2, text: "Minutes", time: 1 },
        { id: 3, text: "Seconds", time: 1 },
      ],
      // startTime: "December 7, 2020 12:03:00",
      // endTime: "July 9, 2022 14:55:00",
      startTime: moment("2022-03-01", "YYYY-MM-DD"),
      endTime: moment().startOf("day"),

      progress: 100,
      timeInterval: undefined,
    });

    onMounted(() => {
      updateTimer();
      state.timeInterval = setInterval(updateTimer, 1000);
    });

    function updateTimer() {
      if (
        state.times[3].time > 0 ||
        state.times[2].time > 0 ||
        state.times[1].time > 0 ||
        state.times[0].time > 0
      ) {
        getTimeRemaining();
        updateProgressBar();
      } else {
        clearTimeout(state.timeInterval);
        // this.times[3].time = this.times[2].time = this.times[1].time = this.times[0].time = 0;
        state.progress = 0;
      }
    }

    function getTimeRemaining() {
      let timeRange = Math.abs(
        moment.duration(state.startTime.diff(state.endTime)).asDays()
      );

      if (timeRange >= 0) {
        state.times[3].time =
          Math.floor(
            Math.abs(
              moment.duration(state.startTime.diff(state.endTime)).asSeconds()
            ) / 1000
          ) % 60; //seconds
        state.times[2].time = Math.floor(
          (Math.abs(
            moment.duration(state.startTime.diff(state.endTime)).asMinutes()
          ) /
            1000 /
            60) %
            60
        ); //minutes
        state.times[1].time = Math.floor(
          (Math.abs(
            moment.duration(state.startTime.diff(state.endTime)).asHours()
          ) /
            (1000 * 60 * 60)) %
            24
        ); //hours
        state.times[0].time = Math.abs(
          moment.duration(state.startTime.diff(state.endTime)).asDays()
        ); //days
      } else {
        state.times[3].time =
          state.times[2].time =
          state.times[1].time =
          state.times[0].time =
            0;
        state.progress = 0;
      }
    }

    function updateProgressBar() {
      let startTime = Date.parse(new Date(state.startTime));
      let currentTime = Date.parse(new Date());
      let endTime = Date.parse(new Date(state.endTime));
      let interval = parseFloat(
        ((currentTime - startTime) / (endTime - startTime)) * 100
      ).toFixed(2);
      state.progress = 100 - interval;
    }

    return { state };
  },
};
</script>

<style lang="scss" scoped>
.timer-divider {
  font-size: 58px;
}
</style>