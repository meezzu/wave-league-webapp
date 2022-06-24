<template>
  <div class="card">
    <div class="card-body text-center py-8">
      <h3 class="text-xl font-semibold px-4 leading-loose">Scout Tips</h3>
      <div class="images flex w-full my-2">
        <img class="w-full" src="@/assets/imgs/artistes-group.png" alt="wave artiste">
      </div>

      <p class="text-base my-4 mx-auto w-full px-4 lg:max-w-lg">
        Get the most up-to-date information on
        Wave League's Artiste Selection.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background: $white;
  box-shadow: -4px -4px 15px rgba(216, 216, 216, 0.15),
    4px 4px 15px rgba(169, 168, 168, 0.15);
  border-radius: 8px;

  .card-body {
  }

  .card-footer {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
}
</style>