import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import "./style.css";
import App from "./App.vue";

import Home from "./pages/Home.vue";
import Favorites from "./pages/Favorites.vue";
import Profile from "./pages/Profile.vue";
import Checkout from "./pages/Checkout.vue";

const app = createApp(App);
const pinia = createPinia();

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/favorites", name: "Favorites", component: Favorites },
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/checkout", name: "Checkout", component: Checkout },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
app.use(pinia);
app.use(router);
app.use(autoAnimatePlugin);
app.mount("#app");
