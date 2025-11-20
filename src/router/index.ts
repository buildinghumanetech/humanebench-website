import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
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
        component: MarkdownPage,
        props: { pageName: 'index' }
      },
      {
        path: 'whitepaper',
        name: 'whitepaper',
        component: MarkdownPage,
        props: { pageName: 'whitepaper' }
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
