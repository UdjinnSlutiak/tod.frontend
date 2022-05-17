import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Feed from "../views/Feed.vue";
import Topic from "../views/Topic.vue";
import CreateTopic from "../views/CreateTopic.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/feed",
    name: "Feed",
    component: Feed
  },
  {
    path: "/topic/:id",
    name: "Topic",
    component: Topic,
  },
  {
    path: "/topic/create",
    name: "CreateTopic",
    component: CreateTopic,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
