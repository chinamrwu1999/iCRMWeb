import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import User from '../components/User.vue'
import CustomerMain  from '../components/Customer.vue'
import CustomerAdd from '../components/CustomerAdd.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/user',
      name:'user',
      component:User,
    },
    {
      path:'/customer',
      name:'coustomer',
      component:CustomerMain,
      children:[{
         path: 'new',
         component:CustomerAdd
      }]
    }
  ]
})

export default router
