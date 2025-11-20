import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/index.vue'
import Methodology from '../views/methodology.vue'
import MarkdownPage from '../views/MarkdownPage.vue'
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
        path: 'methodology',
        name: 'methodology',
        component: Methodology
      },
      {
        path: 'principles',
        name: 'principles',
        component: MarkdownPage,
        props: { pageName: 'principles' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router