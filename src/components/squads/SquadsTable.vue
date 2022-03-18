<template>
  <section class="w-80">
    <div class="form-area">
      <div class="boxes rounded-t">
        <div class="box box1 rounded-t"></div>
      </div>

      <form class="bg-grey5 p-4 rounded-tr">
        <div class="field my-4">
          <input
            type="text"
            class="w-full px-4 py-2 outline-none rounded border"
            placeholder="All Artistes"
          />
        </div>
        <div class="field my-4">
          <input
            type="text"
            class="w-full px-4 py-2 outline-none rounded border"
            placeholder="Search"
          />
        </div>
        <div class="field my-4">
          <select name="points" id="points" class="w-full px-4 py-2 outline-none rounded border">
            <option value disabled selected>Total points</option>
          </select>
        </div>
        <div class="field my-4">
          <select name="points" id="points" class="w-full px-4 py-2 outline-none rounded border">
            <option value disabled selected>Price (Range)</option>
          </select>
        </div>
      </form>
    </div>

    <div class="bg-primary max-h-[350px] overflow-y-scroll rounded-b">
      <table class="relative w-full bg-primary block text-white table-auto border-collapse">
        <thead class="sticky top-0 z-10">
          <tr class="text-center">
            <th class="p-4 text-center border-b bg-[#0D0D34] border-[#28254D]">Artiste</th>
            <th class="p-4 text-center border-b bg-[#0D0D34] border-[#28254D]">₦</th>
            <th class="p-4 text-center border-b bg-[#0D0D34] border-[#28254D]">Points</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="artiste in filteredArtistes" :key="artiste.id">
            <tr class="text-center cursor-pointer" @click="selectArtiste(artiste)">
              <td class="p-4 border-b bg-primary border-[#28254D]">{{ artiste.artiste_name }}</td>
              <td class="p-4 border-b bg-primary border-[#28254D]">{{ artiste.price }}</td>
              <td class="p-4 border-b bg-primary border-[#28254D]">{{ artiste.points }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  artistes: {
    type: Object,
    required: false,
    default: () => {},
  },
});

const emits = defineEmits(["select-artiste"]);

const filteredArtistes = computed(() => {
  return props.artistes.result;
});

const selectArtiste = (artiste) => {
  emits("select-artiste", artiste);
};
</script>

<style lang="scss" scoped>
.boxes {
  .box {
    height: 50px;
    width: 100%;
    background-image: linear-gradient(
      to top right,
      $grey5 50%,
      transparent 50%
    );
  }
}
</style>