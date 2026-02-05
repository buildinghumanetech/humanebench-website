import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MarkdownPage from '../views/MarkdownPage.vue'
import CaseStudiesPage from '../views/CaseStudiesPage.vue'
import ModelsPage from '../views/ModelsPage.vue'
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
      },
      {
        path: 'case-studies',
        name: 'case-studies',
        component: CaseStudiesPage
      },
      {
        path: 'models',
        name: 'models',
        component: ModelsPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

export default router
