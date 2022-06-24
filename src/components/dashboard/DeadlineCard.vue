<template>
  <section class="timer">
    <div class="card">
      <div class="card-header py-4 px-8 text-primary">
        <h3 class="capitalize text-xl font-semibold">Transfer Deadline</h3>
      </div>

      <div class="card-body py-10 px-8 flex gap-x-6 md:gap-x-12 items-center justify-center">
        <div class="flex flex-col gap-y-4 items-center">
          <TimeCard :time="days" />
          <p class="uppercase font-medium">Days</p>
        </div>

        <!-- <span class="text-4xl font-bold pb-8">:</span> -->

        <div class="flex flex-col gap-y-4 items-center">
          <TimeCard :time="hours" />
          <p class="uppercase font-medium">Hours</p>
        </div>

        <!-- <span class="text-4xl font-bold pb-8">:</span> -->

        <div class="flex flex-col gap-y-4 items-center">
          <TimeCard :time="minutes" />
          <p class="uppercase font-medium">Minutes</p>
        </div>
      </div>
    </div>

    <p
      class="font-medium text-base mt-4"
    >Team lock: {{ moment().day(7).startOf("day").format("Do MMM, hh:mm A") }}</p>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import moment from "moment";
import TimeCard from "./timer/TimeCard.vue";

let days = ref("");
let hours = ref("");
let minutes = ref("");
let seconds = ref("");
let countDownDate = ref("");

let timeInterval = null;

onMounted(() => {
  initTimer();
  timeInterval = setInterval(initTimer, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timeInterval);
});

function appendZero(num) {
  if (typeof num !== Number) Number(num);
  const result = num < 10 ? "0" + num : num.toString();
  return result;
}

function initTimer() {
  //   const countDownDate = new Date("May 01, 2022 00:00:00");
  countDownDate.value = moment().day(7).startOf("day");
  const currentTime = new Date().getTime();
  const timeLeft = Math.abs(countDownDate.value - currentTime);

  days.value = appendZero(Math.floor(timeLeft / (1000 * 60 * 60 * 24)));

  hours.value = appendZero(
    Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  minutes.value = appendZero(
    Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  );
  // seconds.value = Math.floor((timeLeft % (1000 * 60)) / 1000);
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
}
</style>
