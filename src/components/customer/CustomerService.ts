import CommonService from "../../services/CommonService";
import http from "../../services/HttpClient"

class CustomerService{
     async save(obj:any){
        return http.post(`${CommonService.baseURL}/customer/add`,obj).then(x => x.data)
      }
      async fetchCustomer(customerId:number){
        return http.get(`${CommonService.baseURL}/customer/${customerId}`).then(x => x.data)
      }
      async listCustomer(){
        return http.get(`${CommonService.baseURL}/customer/list`).then(x => x.data)
      }

      async updateCustomer(obj:any){
        return http.post(`${CommonService.baseURL}/customer/update`,obj).then(x => x.data)
      }
}
export default new CustomerService