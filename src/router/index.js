import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import VueRouterMultiguard from 'vue-router-multiguard'
import store from '../store'

Vue.use(VueRouter)

const isLoggedIn = (to, from, next) => {
  const user = store.state.playerInfo.pseudo
  if(user) {
    next()
  } else {
    next('/firstConnection')
  }
}

const alreadyLog = (to, from, next) => {
  const user = store.state.playerInfo.pseudo
  if(!user) {
    next()
  } else {
    next('/')
  }
}

const bleManagerSet = (to, from, next) => {
  const bleManager = store.state.bleManager
  if(bleManager) {
    next()
  } else {
    next()
    //next('/gamemode')
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: VueRouterMultiguard([isLoggedIn])
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    beforeEnter: VueRouterMultiguard([isLoggedIn])
  },
  {
    path: '/gamemode',
    name: 'Gamemode',
    component: () => import('../views/GameMode.vue'),
    beforeEnter: VueRouterMultiguard([isLoggedIn])
  },
  {
    path: '/touchmode',
    name: 'Touchmode',
    component: () => import('../views/Touchmode.vue'),
    beforeEnter: VueRouterMultiguard([isLoggedIn, bleManagerSet])
  },
  {
    path: '/gyromode',
    name: 'Gyromode',
    component: () => import('../views/Gyromode.vue'),
    beforeEnter: VueRouterMultiguard([isLoggedIn, bleManagerSet])
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: () => import('../views/Leaderboard.vue'),
    beforeEnter: VueRouterMultiguard([isLoggedIn])
  },
  {
    path: '/profile/:user',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    beforeEnter: VueRouterMultiguard([isLoggedIn])
  },
  {
    path: '/firstConnection',
    name: 'FirstConnection',
    component: () => import('../views/FirstConnection.vue'),
    beforeEnter: VueRouterMultiguard([alreadyLog])
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('../views/Result.vue'),
    beforeEnter: VueRouterMultiguard([isLoggedIn])
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
