import { createApp, watch } from "vue";
import { createPinia } from "pinia";
import Notifications from "@kyvg/vue3-notification";

import App from "./App.vue";
import router from "./router";

const pinia = createPinia();
const app = createApp(App);

if (localStorage.getItem("state")) {
  pinia.state.value = JSON.parse(localStorage.getItem("state"));
}

watch(
  pinia.state,
  (state) => {
    localStorage.setItem("state", JSON.stringify(state));
  },
  { deep: true }
);

app.use(pinia);
app.use(router);
app.use(Notifications);

app.mount("#app");
