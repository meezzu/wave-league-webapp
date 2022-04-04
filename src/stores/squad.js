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
    squadComplete: (state) => state.squad.artistes.length === 8,
    squadPosition: (state) => {
      let squad = [];
      state.squad.artistes.map((artiste, artisteIndex) => {
        let temp = { ...artiste, ...state.squad.roster[artisteIndex] };
        squad.push(temp);
      });
      return squad;
    },
  },
  actions: {
    addToCurrentSquad(artiste) {
      if (this.currentSquad.length >= 8) return false;
      const duplicate = this.currentSquad.filter((current) => current._id === artiste._id);
      if (duplicate.length) return false;
      if (Array.isArray(artiste)) {
        this.currentSquad = [...this.currentSquad, ...artiste];
        return true;
      } else {
        this.currentSquad = [...this.currentSquad, artiste];
        return true;
      }
    },

    removeFromCurrentSquad(artiste) {
      let current = this.currentSquad.filter((squad) => squad._id !== artiste._id);
      this.currentSquad = current;
    },

    emptyCurrentSquad() {
      this.currentSquad = [];
    },
  },
});
