import { defineStore } from "pinia";

export const useArtistesStore = defineStore({
  id: "artistes",
  state: () => ({
    allArtistes: null,
  }),
  getters: {
    artistes: (state) => state.allArtistes.result,
  },
  actions: {},
});
