import { defineStore } from "pinia";

export const useToastStore = defineStore({
  id: "toast",
  state: () => ({
    message: "",
    show: false,
  }),
  actions: {
    async displayToast(value) {
      this.message = value;
      this.show = true;

      setTimeout(() => {
        this.message = "";
        this.show = false;
      }, 4000);
    },
  },
});
