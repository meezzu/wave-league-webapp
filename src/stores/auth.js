import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    userGoogleProfile: null,
    userSignedIn: false,
  }),
  getters: {
    accessToken: (state) => {
      return state.userGoogleProfile.wc.access_token;
    },
  },
  actions: {
    updateUserGoogleProfile(payload) {
      this.userGoogleProfile = payload;
    },
  },
});
