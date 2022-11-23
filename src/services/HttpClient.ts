import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: "/iCRM",
  // baseURL: "",
  // 超时
  headers:{},
  timeout: 1000000
})
// request拦截器
service.interceptors.request.use((config) => {
  if (!config?.headers) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
  }
  config.headers.token= localStorage.getItem('AMSTOKEN');
  //console.log(config.headers)
  return config;
})


// 响应拦截器
service.interceptors.response.use(res => {
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
