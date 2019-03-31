import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Bans from "./views/Bans.vue";
import UserProfile from "./views/UserProfile.vue";
import store from "./store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/bans",
      name: "bans",
      component: Bans
    },
    {
      path: "/user/:id",
      name: "user-show",
      component: UserProfile,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch("fetchUser", routeTo.params.id)
          .then(response => {
            routeTo.params.user = response.data;
            next();
          })
          .catch(error => {
            if (error.response && error.response.status == 404) {
              next({ name: "404", params: { resource: "event" } });
            } else {
              next({ name: "network-issue" });
            }
          });
      }
    }
  ]
});

// This method is run before each route request is served.
router.beforeEach((to, from, next) => {
  const publicPages = ["/"]; // List of publicly accessable pages. These do not require authentication.
  const authRequired = !publicPages.includes(to.path); // All the pages that do require authentication.
  const loggedIn = localStorage.user; // Fetches the user that is logged in. Null if user is not authenticated.

  // If the page requires authentication and the user is not logged in.
  if (authRequired && !loggedIn) {
    return next("/"); // Send user to login.
  }
  return next(); // Send user to the requested route.
});

export default router;
