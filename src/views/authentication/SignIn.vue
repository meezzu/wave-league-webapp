<template>
  <section class="sign-in flex justify-center items-center p-2">
    <div
      class="card flex flex-col justify-center text-center items-center bg-grey5 p-8 text-black rounded-lg w-full lg:w-7/12"
    >
      <div class="card__logo mt-12">
        <img
          src="@/assets/icons/wave-league-logo-orange.svg"
          alt="wave league logo"
          width="120"
          height="120"
        />
      </div>

      <div class="card__body mt-12 flex flex-col items-center justify-center">
        <div class="text-secondary font-medium text-2xl">Welcome Back!</div>

        <div class="text-base text-gray-500 text-center mt-8">
          Sign in to your account to continue with
          <a href="#" class="text-secondary">Wave League</a>
        </div>

        <div class="card__btn mt-12">
          <button class="flex items-center space-x-4 bg-white text-primary shadow rounded-lg py-3 px-16">
            <img
              src="@/assets/icons/google-icon.svg"
              alt="sign in with google"
              width="40"
              height="40"
            />
            <span>Log in with Google</span>
          </button>
        </div>
      </div>

      <div class="card__footer mt-16">
        <div class="text-sm text-black2 font-semibold">COPYRIGHT © 2022 WAVE LEAGUE</div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.sign-in {
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
