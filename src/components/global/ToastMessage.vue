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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #333333;
  border-radius: 8px;
  color: white;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding: 1rem 1.5rem;
  font-weight: 500;
  font-size: 14px;
  z-index: 15;
  width: fit-content;
  max-width: 75%;
}
</style>
    
