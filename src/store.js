import Vue from "vue";
import Vuex from "vuex";
import UserService from "./services/UserService";
import BanService from "./services/BanService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    bans: []
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_BANS(state, bans) {
      state.bans = bans;
    }
  },
  actions: {
    fetchUsers({ commit }) {
      UserService.getAll().then(response => {
        commit("SET_USERS", response.data);
      });
    },
    fetchBans({ commit }) {
      BanService.getAll().then(response => {
        commit("SET_BANS", response.data);
      }).catch(error => {
        console.log(error.message)
      });
    },
    // eslint-disable-next-line no-unused-vars
    banEmail({ commit }, email) {
      BanService.doBanEmail(email)
        .then(() => {
          this.dispatch("fetchBans");
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  }
});
