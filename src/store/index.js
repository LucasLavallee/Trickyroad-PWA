import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"


Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    paths: ['playerInfo', 'config', 'achievements', 'updateDatas']
  })],
  state: {
    playerInfo: {
      pseudo: null,
      games: null
    },
    achievements: null,
    config: {
      sound: true,
    },
    bleManager: null,
    notificationManager: null,
    updateDatas: {
      needPushUpdate: {
        achievements: false,
        games: false
      }
    }
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
    },
    SET_PUSH_ACHIEVEMENT (state, needPush) {
      state.updateDatas.needPushUpdate.achievements = needPush
    },
    SET_ACHIEVEMENTS (state, achievements) {
      state.achievements = achievements
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
    },
    setAchievements: (store, achievements) => {
      store.commit('SET_ACHIEVEMENTS', achievements)
    },
    setPushAchievement: (store, needPush) => {
      store.commit('SET_PUSH_ACHIEVEMENT', needPush)
    }
  },
  getters: {
    getCurrentConfig: state => state.config,
    getPseudo: state => state.playerInfo.pseudo,
    getBleManager: state => state.bleManager,
    getNotificationManager: state => state.notificationManager,
    getAchievements: state => state.achievements,
    getGames: state => state.playerInfo.games,
    getPushUpdateRequest: state => state.updateDatas.needPushUpdate
  },
  modules: {
  }
})
