import axios  from "axios";
 axios.interceptors.request.use(  request => {
     if( ! request.headers?.common?.get("token")){
        request.url="/login"
     }
     return request
    })
