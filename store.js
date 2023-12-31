import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      user: null
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    }
  },
  getters: {
    userEmail: state => state.user? state.user.email : null,
  }
});
