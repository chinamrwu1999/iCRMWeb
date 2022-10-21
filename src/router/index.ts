import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CustomerMain from '../components/customer/Customer.vue'
import CustomerAdd from '../components/customer/CustomerAdd.vue'
import CustomerList from "../components/customer/customerList.vue"
import HospitalMain from "../components/hospital/Hospital.vue"
import LoginForm from "../components/user/Login.vue"
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
      component: LoginForm
    },


    {
      path: '/customer',
      name: 'coustomer',
      component: CustomerMain,
      children: [{
        path: 'new',
        component: CustomerAdd
      },
      {
        path: "list",
        component: CustomerList
      }

      ]
    },
    {
      path: '/hospital',
      name: 'hospital',
      component: HospitalMain,
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("AMSTOKEN")
  console.log("beforeEach is calling")
  if (to.name !== 'login' && !token) { // 无token，登录从服务器获取token
    next({  path: 'login'})
  } else { //有token
    if (token && to.name === 'login') { next({ name: 'home' }) }
    else { next() }

  }

})


export default router
