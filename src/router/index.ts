import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CustomerMain from '../components/customer/Customer.vue'
import CustomerAdd from '../components/customer/CustomerAdd.vue'
import HospitalMain from "../components/hospital/Hospital.vue"
import LoginForm from "../components/user/Login.vue"
import LogWriter from "../components/businesslog/Mylogs.vue"
import NewEstimate from "../components/saleEstimation/NewEstimate.vue"
import DataBoard from "../components/visulization/DataBoard.vue"
import EstimateTable from "../components/visulization/EstimateTable.vue"
import Explorer from "../components/visulization/Explorer.vue"
 import LogBoard from "../components/businesslog/LogBoard.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/businesslog',
      name: 'log',
      component: LogWriter
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
     

      ]
    },
    {
      path: '/hospital',
      name: 'hospital',
      component: HospitalMain,
    },
    {
      path: '/saleEstimate',
      name: 'estimate',
      component: NewEstimate,
    },
    {
      path: '/databoard',
      name: 'dataview',
      component: DataBoard,
      children: [
        {
          name:'estimateView',
          path:'estimateView',
          component: EstimateTable
        }
          
      ]
    },
    {
      path : '/logBoard',
      name:'logBoard',
      component: LogBoard
    },
    {
      path : '/testIt',
      name:'test',
      component: Explorer
    }

  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("AMSTOKEN")
  //console.log("beforeEach is calling")
  if (to.name !== 'login' && !token) { // ???token???????????????????????????token
    next({  path: 'login'})
  } else { //???token
    if (token && to.name === 'login') { next({ name: 'home' }) }
    else { next() }

  }

})


export default router
