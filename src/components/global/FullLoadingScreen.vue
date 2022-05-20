<template>
  <section class="loader">
    <div
      class="card h-[85vh] min-w-full flex flex-col justify-center text-center items-center bg-grey5 p-8 text-black w-full sm:w-10/12 md:w-9/12 lg:w-7/12"
    >
      <div class="card__logo">
        <img
          class="logo"
          src="@/assets/imgs/wave-league-logo.png"
          alt="wave league logo"
          width="120"
          height="120"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.logo {
  animation: pulse 2s infinite ease;
}

@keyframes pulse {
  0% {
    transform: scale(0.9);
  }

  70% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.9);
  }
}
</style>