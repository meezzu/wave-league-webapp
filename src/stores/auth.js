import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    userGoogleProfile: null,
    userSignedIn: false,
    waveProfile: null,
  }),
  getters: {
    accessToken: (state) => {
      return state.waveProfile.token;
    },
    playerDetails: (state) => state.waveProfile.player,
    googleMail: (state) => {
      return state.userGoogleProfile.Du.tv;
    },
    googleName: (state) => {
      return `${state.userGoogleProfile.Du.VX} ${state.userGoogleProfile.Du.iW}`;
    },
  },
  actions: {
    updateUserGoogleProfile(payload) {
      this.userGoogleProfile = payload;
    },
  },
});
