import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../pages/login')
  },
  {
    path: '/project',
    name: 'project',
    component: () => import('../pages/project')
  },
  {
    path: '/pages',
    name: 'page',
    component: () => import('../pages/pages')
  },
  {
    path: '/details',
    name: 'details',
    component: () => import('../pages/details')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
