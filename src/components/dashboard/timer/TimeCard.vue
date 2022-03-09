<template>
  <div class="time-card text-center">
    <div class="card-block text-center">
      <h4 class="card-title">{{time.time}}</h4>
    </div>
    <div class="card-footer mt-4">{{time.text}}</div>
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
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  .card-title {
    font-weight: bold;
    font-size: 48px;
    line-height: 55px;
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
}</style>