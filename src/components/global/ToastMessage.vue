<template>
  <div v-if="toastStore.show" class="toast">{{ toastStore.message }}</div>
</template>

<script setup>
import { useToastStore } from "../../stores/toast";

const toastStore = useToastStore();
</script>

<style lang="scss" scoped>
.toast {
  position: absolute;
  top: 25%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */
  transform: translate(-50%, -50%);
  background: #333333;
  border-radius: 8px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  font-weight: 500;
}
</style>
    
