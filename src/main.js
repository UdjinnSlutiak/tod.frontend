import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import authCheckService from "./services/middlewares/authCheckService";

router.beforeEach(authCheckService);

createApp(App).use(store).use(router).mount("#app");
