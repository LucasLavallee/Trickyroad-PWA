import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"


Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    paths: ['playerInfo', 'config']
  })],
  state: {
    playerInfo: {
      pseudo: null
    },
    config: {
      sound: true,
    },
    achievementQueue: []
  },
  mutations: {
    SET_PSEUDO (state, pseudo) {
      state.playerInfo.pseudo = pseudo
    }
  },
  actions: {
    setPseudo: (store, pseudo) => {
      store.commit('SET_PSEUDO', pseudo)
    }
  },
  getters: {
    getCurrentConfig: state => state.config,
    getPseudo: state => state.playerInfo.pseudo
  },
  modules: {
  }
})
