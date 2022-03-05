import { createApp, watch } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

if (sessionStorage.getItem("state")) {
  pinia.state.value = JSON.parse(sessionStorage.getItem("state"));
}

watch(
  pinia.state,
  (state) => {
    sessionStorage.setItem("state", JSON.stringify(state));
  },
  { deep: true }
);

app.use(pinia);
app.use(router);

app.mount("#app");
