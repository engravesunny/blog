import { createApp } from "vue";
import pinia from "./store";
import App from "./App.vue";
import "./assets/font/font.css";
import "./assets/icon/iconfont/iconfont.css";
import "./style/index.css";
import "./style/root.css";
import router from "./router";
import "amfe-flexible";
import PromiseControl from "@/plugins/promises";

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(PromiseControl);

app.mount("#app");
