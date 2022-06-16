<template>
  <div class="artiste w-[80px] cursor-pointer">
    <div class="flex items-center flex-col justify-center">
      <div class="relative flex items-start">
        <div>
          <img
            class="rounded-full h-16 w-16 border-2 border-grey4 drop-shadow-sm"
            :src="artiste.avatar"
            alt="artiste"
            width="50"
            height="50"
          />
          <!-- <img
            v-if="Object.keys(transferStore.selected).length && transferStore.selected._id === artiste.id"
            class="rounded-full h-16 w-16 border-2 border-grey4 drop-shadow-sm"
            src="@/assets/icons/unknown-artiste.svg"
            alt="artiste"
            width="50"
            height="50"
          />-->
          <!-- <img src="@/assets/icons/unknown-artiste-shadow.svg" alt="artiste" width="50" /> -->
        </div>

        <img
          class="absolute top-0 left-[-20px] cursor-pointer"
          src="@/assets/icons/info-primary.svg"
          alt="view artiste info"
          width="20"
          height="20"
        />

        <img
          class="absolute top-0 right-[-20px] cursor-pointer"
          src="@/assets/icons/delete-red.svg"
          alt="remove artiste"
          width="20"
          height="20"
        />
      </div>

      <div class="mt-2 text-center m-auto w-full">
        <p
          class="bg-primary rounded py-1.5 px-3 text-secondary text-xs"
        >{{ artiste.artiste_name.split(" ")[0] }}</p>
        <p
          class="bg-white rounded-b py-1 px-2 text-black text-sm font-semibold"
        >{{ artiste.price }}m</p>

        <!-- <p
          v-if="Object.keys(transferStore.selected).length && transferStore.selected._id === artiste.id"
          class="bg-primary rounded py-1.5 px-3 text-secondary text-xs"
        >--</p>-->
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  artiste: {
    type: Object,
    required: true,
  },
});
</script>