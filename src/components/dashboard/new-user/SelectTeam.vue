<template>
  <div class="card">
    <div class="card-body text-center px-4 py-8">
      <h3 class="text-xl font-semibold leading-loose">Select your Team</h3>
      <p
        class="text-base my-4 mx-auto w-full lg:max-w-lg"
      >You too can create a team and compete with your friends and family from all over the world. Select a team of eight artists from the Wave League using your budget.</p>
      <router-link to="/squad">
        <app-button width="full" text="Team Select" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import AppButton from "../../global/AppButton.vue";
</script>


<style lang="scss" scoped>
.card {
  background: $white;
  box-shadow: -4px -4px 15px rgba(216, 216, 216, 0.15),
    4px 4px 15px rgba(169, 168, 168, 0.15);
  border-radius: 8px;

  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
  }

  .card-footer {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
}
</style>