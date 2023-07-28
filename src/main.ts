import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import axios from "axios";
import mycomponents from "./components/basic";

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token') || ''
axios.interceptors.request.use((config) => {
  return config
}, (e) => {
  console.log(e)
})

const app = createApp(App)
app.use(createPinia())
for (const { name, component } of mycomponents) {
  app.component(name, component)
}

app.use(router).mount("#app");
