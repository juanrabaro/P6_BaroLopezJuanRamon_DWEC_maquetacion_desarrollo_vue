import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../weather/pages/HomePage.vue'

const routes = [
  // { path: '/:pathMatch(.*)*', component: Pag404, redirect: '/'},
  { path: '/:pathMatch(.*)*', component: () => import('../others/pages/Pag404.vue')},
  { path: '/', component: HomePage },
  { path: '/world-time', component: () => import('../time/pages/WorldTime.vue') },
  { path: '/search-history', component: () => import('../weather/pages/SearchHistoryPage.vue') },
  { path: '/compare-weathers', component: () => import('../weather/pages/CompareWeathersPage.vue') },
  { path: '/contact', component: () => import('../others/pages/ContactPage.vue') },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router