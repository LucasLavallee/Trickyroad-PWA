import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//import VueRouterMultiguard from 'vue-router-multiguard'
//import store from '../store'

Vue.use(VueRouter)

/*const isLoggedIn = (to, from, next) => {
  const user = store.state.playerInfo.pseudo
  if(user) {
    next()
  }
}*/

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    //beforeEnter: VueRouterMultiguard([isLoggedIn])
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/gamemode',
    name: 'Gamemode',
    component: () => import('../views/GameMode.vue')
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: () => import('../views/Leaderboard.vue')
  },
  {
    path: '/profile/:user',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
