import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Tarot from '@/views/Tarot.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/tarot',
      name: 'Tarot',
      component: Tarot
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})

export default router