<template>
  <div class="time-card text-center">
    <div class="flex gap-x-1 ">
      <div
        v-for="item, index in time.split('')"
        :key="index"
        class="card-block text-center px-4 py-6 sm:p-6 md:py-8 md:px-6"
      >
        <div class="card-time">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["time"],
};
</script>

<style lang="scss" scoped>
.card-block {
  background: #ffffff;
  box-shadow: 0px -1px 15px rgba(78, 78, 78, 0.1),
    0px 2px 15px rgba(78, 78, 78, 0.1);

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  .card-time {
    font-weight: bold;
    font-size: 32px;
    line-height: 38px;
    color: $secondary;
    text-shadow: 0px 2px 3px rgba(78, 78, 78, 0.25);
  }
}

.card-footer {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: $grey1;
}
</style>