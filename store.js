import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || null,
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    }
  },
  actions: {
    setUser({ commit }, userData) {
      commit('setUser', userData);
    },
    logout({ commit }) {
      commit('clearUser');
    },
  },
  getters: {
    userEmail: state => state.user ? state.user.email : null,
  }
});
