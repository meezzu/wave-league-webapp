import { defineStore } from "pinia";

export const useTransfersStore = defineStore({
  id: "transfers",
  state: () => ({
    selected: {},
    currentTransfersOut: [],
    currentTransfersIn: [],
  }),
  getters: {},
  actions: {},
});
