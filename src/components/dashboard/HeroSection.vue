<template>
  <section>
    <CountdownTimer />
    <DetailsCard></DetailsCard>
  </section>
</template>

<script>
import CountdownTimer from "./timer/CountdownTimer.vue";
import DetailsCard from "./DetailsCard.vue";
export default {
  components: {
    CountdownTimer,
    DetailsCard,
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
</style>