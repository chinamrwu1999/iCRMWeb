import axios from 'axios'
import Auth from "../services/Authentication"
import router from "../router/index"

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: "/iCRM",
  // 超时
  timeout: 1000000
})
// request拦截器
service.interceptors.request.use(config => {
   console.log("intercepting ....")
   console.log(Auth.isAuthenticated())
  if (!Auth.isAuthenticated() && ! config.url?.startsWith("/login")){
      console.log("没有授权————You need login before using this model， ")
      // router.push("/login")
      
  }
  return config
}, error => {
    // console.log(error)
    
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    console.log()
  
    return res
  },
  error => {
    // console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    }
    else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    }
    else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
   
    return Promise.reject(error)
  }
)

export default service
