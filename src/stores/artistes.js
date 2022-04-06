import { defineStore } from "pinia";

export const useArtistesStore = defineStore({
  id: "artistes",
  state: () => ({
    allArtistes: {},
  }),
  getters: {
    artistes: (state) => state.allArtistes?.result,
  },
  actions: {},
});
