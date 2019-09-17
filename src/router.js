import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/playsquare',
      name: 'playSquare',
      component: () => import('./views/PlaySquare.vue')
    },
    {
      path: '/topList',
      name: 'topList',
      component: () => import('./views/TopList.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search.vue')
    },
    {
      path: '/topMusic',
      name: 'topMusic',
      component: () => import('./views/TopMusic.vue')
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: () => import('./views/UserCenter.vue')
    }
  ]
})
