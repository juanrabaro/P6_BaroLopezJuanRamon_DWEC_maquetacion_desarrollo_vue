import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

// Define las rutas de la aplicación
const routes = [
  { path: '/:pathMatch(.*)*', component: () => import('../pages/Pag404.vue')},
  { path: '/', component: HomePage },
  { path: '/world-time', component: () => import('../pages/WorldTime.vue') },
  { path: '/search-history', component: () => import('../pages/SearchHistoryPage.vue') },
  { path: '/compare-weathers', component: () => import('../pages/CompareWeathersPage.vue') },
  { path: '/contact', component: () => import('../pages/ContactPage.vue') },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router