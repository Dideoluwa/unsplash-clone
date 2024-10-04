import { createApp } from "vue";
import App from "./App.vue";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

import "./styles/variables.scss";

createApp(App)
  .use(ToastPlugin, {
    duration: 5000,
    position: "top-left",
  })
  .mount("#app");
