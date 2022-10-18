import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import User from '../components/User.vue'
import CustomerMain  from '../components/customer/Customer.vue'
import CustomerAdd from '../components/customer/CustomerAdd.vue'
import CustomerList from "../components/customer/customerList.vue"
import HospitalMain from "../components/hospital/Hospital.vue"
import Login from "../components/user/Login.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    
    {
      path: '/login',
      name: 'login',
      component: Login
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
      },
      {
        path: "list",
        component:CustomerList
      }
    
    ]
    },
    {
      path:'/hospital',
      name:'hospital',
      component:HospitalMain,
      }
  ]
})

export default router
