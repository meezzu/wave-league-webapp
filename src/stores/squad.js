import { defineStore } from "pinia";
import { useToastStore } from "./toast";

export const useSquadStore = defineStore({
  id: "squad",
  state: () => ({
    squad: {},
    currentSquad: [],
  }),

  getters: {
    squadName: (state) => state.squad?.squad_name,
    squadId: (state) => state.squad?.id,
    currentSquadLength: (state) => state.currentSquad?.length,
    totalSquadValue: (state) => {
      const value = state.currentSquad.reduce((a, b) => {
        return a + b.price;
      }, 0);
      if (!value) return 0;
      return value;
    },
    squadComplete: (state) => {
      if (state.squad.artistes && state.squad?.artistes.length === 8) return true;
      else return false;
    },
    squadPosition: (state) => {
      let squad = [];
      state.squad.artistes.map((artiste, artisteIndex) => {
        let temp = { ...artiste, ...state.squad.roster[artisteIndex] };
        squad.push(temp);
      });
      return squad;
    },
    benchArtistes() {
      return this.squadPosition.filter((artiste) => {
        return artiste.location === "bench";
      });
    },
    stageArtistes() {
      return this.squadPosition.filter((artiste) => {
        return artiste.location === "stage";
      });
    },
    currentSquadValue: (state) => {
      return state.currentSquad.reduce((prev, curr) => {
        return prev + curr.price;
      }, 0);
    },
  },

  actions: {
    addToCurrentSquad(artiste) {
      const toastStore = useToastStore();
      if (this.currentSquad.length >= 8) {
        toastStore.displayToast("Squad is complete!");
        return false;
      }
      const duplicate = this.currentSquad.filter((current) => current._id === artiste._id);
      if (duplicate.length) {
        return false;
      }
      if (this.totalSquadValue + artiste.price > 100) {
        toastStore.displayToast("Squad value cannot be more than 100m!");
        return false;
      }
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
