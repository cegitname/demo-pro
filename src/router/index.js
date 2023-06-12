import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect: '/echarts'
  },
  {
    path: '/echarts',
    component: () => import('@/views/echarts/index.vue')
  }
]

const router = new Router({
  routes
})

export default router