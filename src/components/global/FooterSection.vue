<template>
  <section class="footer">
    <div
      class="screen-container flex flex-col sm:flex-row justify-center sm:justify-between items-center py-8 border-t border-[#1E2E47]"
    >
      <div
        class="flex order-last sm:order-first w-full text-sm justify-center sm:w-1/5 py-4 sm:py-0"
      >COPYRIGHT © 2022 WAVE LEAGUE</div>

      <div
        class="w-3/5 flex flex-col text-sm sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
      >
        <a href="#">Terms and Conditions</a>
        <a href="#">Policies</a>
        <a href="#">Cookie Policy</a>
        <!-- <a class="text-secondary" href="#">Back to Top</a> -->
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.footer {
  @apply bg-primary text-white px-4 sm:px-8 md:px-16 lg:px-32;
}
</style>

