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
    bleManager: null,
    notificationManager: null
  },
  mutations: {
    SET_PSEUDO (state, pseudo) {
      state.playerInfo.pseudo = pseudo
    },
    SET_BLE_MANAGER (state, manager) {
      state.bleManager = manager
    },
    SET_NOTIFICATION_MANAGER (state, manager) {
      state.notificationManager = manager
    }
  },
  actions: {
    setPseudo: (store, pseudo) => {
      store.commit('SET_PSEUDO', pseudo)
    },
    setBleManager: (store, manager) => {
      store.commit('SET_BLE_MANAGER', manager)
    },
    setNotificationManager: (store, manager) => {
      store.commit('SET_NOTIFICATION_MANAGER', manager)
    }
  },
  getters: {
    getCurrentConfig: state => state.config,
    getPseudo: state => state.playerInfo.pseudo,
    getBleManager: state => state.bleManager,
    getNotificationManager: state => state.notificationManager
  },
  modules: {
  }
})
