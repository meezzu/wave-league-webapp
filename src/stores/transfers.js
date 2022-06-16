import { defineStore } from "pinia";

export const useTransfersStore = defineStore({
  id: "transfers",
  state: () => ({
    selected: {},
    currentTransfersOut: [],
    currentTransfersIn: [],
  }),
  getters: {
    playerOutValue: (state) => (Object.keys(state.selected).length ? state.selected.price : 0),
  },
});
