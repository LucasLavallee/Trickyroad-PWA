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
    notificationQueue: []
  },
  mutations: {
    SET_PSEUDO (state, pseudo) {
      state.playerInfo.pseudo = pseudo
    },
    SET_BLE_MANAGER (state, manager) {
      state.bleManager = manager
    }, 
    ADD_NOTIFICATION (state, notification) {
      state.notificationQueue = [...state.notificationQueue, notification]
    }
  },
  actions: {
    setPseudo: (store, pseudo) => {
      store.commit('SET_PSEUDO', pseudo)
    },
    setBleManager: (store, manager) => {
      store.commit('SET_BLE_MANAGER', manager)
    },
    addNotification: (store, notification) => {
      store.commit('ADD_NOTIFICATION', notification)
    }
  },
  getters: {
    getCurrentConfig: state => state.config,
    getPseudo: state => state.playerInfo.pseudo,
    getBleManager: state => state.bleManager
  },
  modules: {
  }
})
