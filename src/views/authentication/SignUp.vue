<template>
  <section class="sign-up flex justify-center items-center p-2">
    <div
      class="card flex flex-col justify-center text-center items-center bg-white p-8 text-black rounded-lg w-full lg:w-7/12"
    >
      <div class="card__logo mt-12">
        <img
          src="@/assets/icons/wave-league-logo-orange.svg"
          alt="wave league logo"
          width="120"
          height="120"
        />
      </div>

      <div class="card__body mt-16">
        <div class="font-semibold text-2xl text-black2">
          Welcome to
          <span class="text-secondary font-medium text-2xl">Wave League</span>
        </div>

        <div class="card__btn mt-12">
          <button class="flex items-center space-x-4 bg-[#000022] text-white rounded-lg py-3 px-16">
            <img
              src="@/assets/icons/google-icon.svg"
              alt="sign in with google"
              width="40"
              height="40"
            />
            <span>Sign Up with Google</span>
          </button>
        </div>

        <div class="text-sm text-gray-500 text-center mt-4">
          By signing up you agree to our
          <a href="#" class="text-secondary">privacy policy</a>
        </div>
      </div>

      <div class="card__footer mt-16">
        <div class="text-sm text-black2 font-semibold">COPYRIGHT © 2022 WAVE LEAGUE</div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.sign-up {
  height: 100vh;

  .card {
    background-image: url("@/assets/icons/fluid-shape-top-right.svg"),
      url("@/assets/icons/symphony-top-right.svg"),
      url("@/assets/icons/fluid-shape-top-left.svg"),
      url("@/assets/icons/symphony-top-left.svg");
    background-position: right top, right top, left top, left top;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  }
}
</style>
