<template>
  <button
    class="btn"
    :class="[width ? width : '', type ? type : '', disabled ? 'disabled' : '' ]"
    :disabled="disabled"
    @click="$emit('clicked')"
  >{{ text }}</button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
    default: "App Button",
  },
  type: {
    type: String,
    required: false,
    default: "primary", // can pass `primary` or `secondary`
  },
  width: {
    type: String,
    required: false,
    default: "auto", // can pass `auto` or `full`
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.btn {
  border: none;
  color: white;
  padding: 10px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 8px;
  outline: none;
  width: 100%;
  cursor: pointer;
}

.btn.disabled {
  background-color: $grey4;
  color: $white;
}

.primary {
  background-color: $primary;
  color: $white;
}
.secondary {
  background-color: $secondary;
  color: $white;
}

.auto {
  width: auto;
}

.full {
  width: 250px;
  max-width: 250px;
}
</style>