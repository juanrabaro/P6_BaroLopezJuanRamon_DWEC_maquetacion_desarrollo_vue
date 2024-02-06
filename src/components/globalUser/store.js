import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    setUser({commit}, user) {
      commit('SET_USER', user)
    }
  },
  getters: {
    user: state => state.user,
    isUserLoggedIn: state => !!state.user
  }
})