import CommonService from "../../services/CommonService";
import http from "../../services/HttpClient"

class ProxyService{
     async save(obj:any){
        return http.post(`${CommonService.baseURL}/proxy/add`,obj).then(x => x.data)
      }
      async fetchProxy(customerId:number){
        return http.get(`${CommonService.baseURL}/proxy/${customerId}`).then(x => x.data)
      }
  

      async updateProxy(obj:any){
        return http.post(`${CommonService.baseURL}/proxy/update`,obj).then(x => x.data)
      }

      /********************************************************** */
      async MyProxys(){
        return http.get(`${CommonService.baseURL}/myProxys`).then(x => x.data)
      }

      async queryProxys(obj:any){
        return http.post(`${CommonService.baseURL}/proxys/list`,obj).then(x => x.data)
      }
      async pageProxys(obj:any,pageSize:number,pageIndex:number){
        return http.post(`${CommonService.baseURL}/proxys/list?size=${pageSize}&page=${pageIndex}&count=1`,obj).then(x => x.data)
      }
     
}
export default new ProxyService