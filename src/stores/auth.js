import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
      userGoogleProfile: null,
      userSignedIn: false
  }),
  getters: {},
  actions: {
    updateUserGoogleProfile(payload) {
      this.userGoogleProfile = payload;
    },
  },
});
