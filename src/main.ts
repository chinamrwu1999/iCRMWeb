import { createApp } from 'vue'
import App from "./App.vue"
import router from './router'
import './assets/main.css'

import axios  from "axios";
const app = createApp(App)

app.use(router)

 const intercepter=axios.interceptors.request.use(  request => {
     if( ! request.headers?.common?.get("token")){
        request.url="/login"
     }
     return request
    })

    app.use(intercepter)

app.mount('#app')

