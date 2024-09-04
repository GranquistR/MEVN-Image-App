import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddImageView from '@/views/AddImageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/upload',
      name: 'upload',
      component: AddImageView
    }
  ]
})

// router.beforeEach((to, from) => {
//   if (from.name === 'upload') {
//     if (!confirm('Are you sure you want to leave this page?')) {
//       return false
//     }
//   }
// })

export default router
