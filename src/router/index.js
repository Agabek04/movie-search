import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../components/HomeView.vue";
import SignUp from "../components/SignUp.vue";
import SignIn from "../components/LoginPage.vue";
import Favourites from "../components/Favourites.vue";
import Toprated from "../components/NowPlaying.vue";
import Upcoming from "../components/Upcoming.vue";
import Popular from "../components/Popular.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/nowplaying",
    name: "nowplaying",
    component: Toprated,
  },
  {
    path: "/upcoming",
    name: "upcoming",
    component: Upcoming,
  },
  {
    path: "/popular",
    name: "popular",
    component: Popular,
  },

  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn,
  },
  {
    path: "/favourites",
    name: "favourites",
    component: Favourites,
  },
  {
    path: "/movie/:id",
    name: "MovieInfo",
    component: () => import("../components/MovieInfo.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const element = document.querySelector(to.hash);
          const navbarHeight = 80;

          if (element) {
            const top =
              element.getBoundingClientRect().top +
              window.scrollY -
              navbarHeight;
            window.scrollTo({ top, behavior: "smooth" });
          }

          resolve();
        }, 300);
      });
    } else {
      return { top: 0 };
    }
  },
});

export default router;
