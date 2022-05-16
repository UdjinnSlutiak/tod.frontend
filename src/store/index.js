import { createStore } from "vuex";

export default createStore({
  state: {
    authObject: localStorage.getItem("authObject") ? JSON.parse(localStorage.getItem("authObject")) : null,
  },
  mutations: {
    authObject(state, newAuthObject) {
      localStorage.setItem("authObject", JSON.stringify(newAuthObject));
      state.authObject = newAuthObject;
    }
  },
  actions: {
    authObject: async function (state, newAuthObject) {
      state.commit("authObject", newAuthObject);
    }
  },
  getters: {
    authObject(state) {
      return state.authObject;
    }
  },
});
