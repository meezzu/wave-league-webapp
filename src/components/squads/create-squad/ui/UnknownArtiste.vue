<template>
  <div class="artiste w-[80px] cursor-pointer">
    <div class="flex items-center flex-col justify-center">
      <div class="relative flex items-start">
        <div>
          <img
            class="rounded-full h-16 w-16 border-2 border-grey4 drop-shadow-sm"
            src="@/assets/icons/unknown-artiste.svg"
            alt="artiste"
            width="50"
            height="50"
          />
        </div>

        <!-- <img
          class="absolute top-0 right-[-20px] cursor-pointer"
          src="@/assets/icons/delete-red.svg"
          alt="remove artiste"
          width="20"
          height="20"
        />-->
      </div>

      <div class="mt-2 text-center m-auto">
        <p class="bg-primary rounded py-1.5 px-3 text-secondary text-xs">--</p>
      </div>
    </div>
  </div>
</template>