import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/index.vue'
import HumaneBench from '../views/humaneBench/index.vue'
import DefaultLayout from '../layout/default.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: 'humane-bench',
        name: 'humaneBench',
        component: HumaneBench
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router