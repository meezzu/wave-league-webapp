import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    googleUser: {},
    userSignedIn: false,
    waveProfile: null,
  }),
  getters: {
    accessToken: (state) => {
      return state.waveProfile?.token;
    },
    playerDetails: (state) => state.waveProfile?.player,
  },
  actions: {
  },
});
