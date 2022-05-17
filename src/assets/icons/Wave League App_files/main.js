import { createApp, watch } from "/node_modules/.vite/vue.js?v=f00be0bf";
import { createPinia } from "/node_modules/.vite/pinia.js?v=f00be0bf";
import Notifications from "/node_modules/.vite/@kyvg_vue3-notification.js?v=f00be0bf";

import App from "/src/App.vue?t=1652789111629";
import router from "/src/router/index.js?t=1652789111629";

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
