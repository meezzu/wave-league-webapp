import { defineStore } from "pinia";

export const useWeekStore = defineStore({
  id: "week",
  state: () => ({
    currentWeek: null,
  }),
  actions: {
    updateCurrentWeek(value) {
      this.currentWeek = value;
    },
  },
});
