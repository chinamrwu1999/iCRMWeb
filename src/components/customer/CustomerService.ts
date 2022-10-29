import CommonService from "../../services/CommonService";
import http from "../../services/HttpClient"

class CustomerService{
     async save(obj:any){
        return http.post(`${CommonService.baseURL}/customer/add`,obj).then(x => x.data)
      }
      async fetchCustomer(customerId:number){
        return http.get(`${CommonService.baseURL}/customer/${customerId}`).then(x => x.data)
      }
  

      async updateCustomer(obj:any){
        return http.post(`${CommonService.baseURL}/customer/update`,obj).then(x => x.data)
      }

      /********************************************************** */
      async MyCustomers(){
        return http.get(`${CommonService.baseURL}/myCustomers`).then(x => x.data)
      }

      async queryCustomers(obj:any){
        return http.post(`${CommonService.baseURL}/customers/list`,obj).then(x => x.data)
      }
      async pageCustomers(obj:any,pageSize:number,pageIndex:number){
        return http.post(`${CommonService.baseURL}/customers/list?size=${pageSize}&page=${pageIndex}&count=1`,obj).then(x => x.data)
      }
      async Test(){
        return http.get(`${CommonService.baseURL}/testme`).then(x => x.data)
      }
}
export default new CustomerService