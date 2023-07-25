import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import mycomponents from "./components/basic";

const app = createApp(App)
app.use(createPinia())
for (const { name, component } of mycomponents) {
  app.component(name, component)
}

app.use(router).mount("#app");
