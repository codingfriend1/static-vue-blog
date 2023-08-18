// routes.js
import { createRouter, createWebHistory } from 'vue-router'
import page from './pages/page.vue'
import home from './pages/home.vue'

const routes = [
  {
    path: '/',
    component: home
  },
  { path: '/articles/:article', 
    component: page,
  },
  {
    path: '/:page',
    component: page
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

export default router