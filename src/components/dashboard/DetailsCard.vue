<template>
  <div class="card">
    <div class="card-body grid grid-cols-3 gap-4">
      <div class="p-8 self-center">
        <h2 class="text-2xl text-primary font-semibold">Music Week 1</h2>
        <button
          class="text-white bg-primary mt-6 font-medium rounded-lg text-base px-12 py-3 text-center"
        >My Squad</button>
      </div>

      <div class="card-images relative col-span-2">
        <img
          class="absolute right-80 bottom-0"
          src="@/assets/imgs/dija-single.png"
          alt="joeboy"
        />
        <img
          class="absolute right-56 bottom-0"
          src="@/assets/imgs/joeboy-single.png"
          alt="joeboy"
        />
        <img
          class="absolute right-24 bottom-0"
          src="@/assets/imgs/yemi-single.png"
          alt="joeboy"
        />
        <img
          class="absolute right-0 bottom-0"
          src="@/assets/imgs/omah-lay-single.png"
          alt="joeboy"
        />
      </div>
    </div>

    <div class="card-footer flex justify-evenly items-center bg-primary">
      <div class="text-center p-6 my-2">
        <p class="text-secondary font-medium text-sm">Highest Point</p>
        <p class="text-white">99</p>
      </div>
      <div class="text-center p-6 my-2">
        <p class="text-secondary font-medium text-sm">Average Point</p>
        <p class="text-white">99</p>
      </div>
      <div class="text-center p-6 my-2">
        <p class="text-secondary font-medium text-sm">Transfers Made</p>
        <p class="text-white">99,000</p>
      </div>
      <div class="text-center p-6 my-2">
        <p class="text-secondary font-medium text-sm">Most Transferred In</p>
        <p class="text-white">Wizkid</p>
      </div>
      <div class="text-center p-6 my-2">
        <p class="text-secondary font-medium text-sm">Most Transferred Out</p>
        <p class="text-white">Fireboy</p>
      </div>
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
    background-image: url("@/assets/icons/wavy-strings.svg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 270px;

    .card-images {
      height: 100%;
    }
  }

  .card-footer {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
}
</style>