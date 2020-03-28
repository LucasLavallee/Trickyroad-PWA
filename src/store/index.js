import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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
  },
  actions: {
  },
  getters: {
    getCurrentConfig: state => state.config,
  },
  modules: {
  }
})
