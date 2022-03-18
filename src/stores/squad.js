import { defineStore } from "pinia";

export const useSquadStore = defineStore({
  id: "squad",
  state: () => ({
    squad: null,
    currentSquad: [],
  }),
  getters: {
    squadId: (state) => state.squad.id,
    currentSquadLength: (state) => state.currentSquad.length,
    totalSquadValue: (state) => {
      const value = state.currentSquad.reduce((a, b) => {
        return a + b.price;
      }, 0);
      if (!value) return 0;
      return value;
    },
  },
  actions: {
    addToCurrentSquad(artiste) {
      if (this.currentSquad.length >= 8) return;
      if (this.currentSquad.includes(artiste)) return;
      if (Array.isArray(artiste)) this.currentSquad = [...this.currentSquad, ...artiste];
      else this.currentSquad = [...this.currentSquad, artiste];
    },
    removeFromCurrentSquad(artiste) {
      let current = this.currentSquad.filter((squad) => squad._id !== artiste._id);
      this.currentSquad = current;
    },
    emptyCurrentSquad() {
      this.currentSquad = [];
    },
    autoSelectCurrentSquad() {
      // this.currentSquad
    },
  },
});
