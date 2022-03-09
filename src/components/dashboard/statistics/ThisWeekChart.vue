<template>
  <div class="card">
    <div class="card-header bg-primary py-4 px-8 flex justify-between items-center">
      <h3 class="capitalize text-xl text-white">This Week Chart</h3>
      <small>Top Artist</small>
    </div>

    <div class="card-body">
      <table class="table-auto w-full border-collapse">
        <thead>
          <tr class="border-b font-semibold text-grey3">
            <th class="p-3">Rank</th>
            <th class="p-3">Artiste</th>
            <th class="p-3">Points</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="index in 10" :key="index" class="text-black2" :class="{'border-b': index !== 10}">
            <td class="p-4 text-bold">{{index}}.</td>
            <td>Indiana</td>
            <td>Indianapolis</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {};
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

  .card-body {
    width: 100%;
  }
}
</style>