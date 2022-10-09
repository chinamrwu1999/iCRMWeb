import CommonService from "../../services/CommonService";
import http from "../../services/HttpClient"

class CustomerService{
     async save(obj:any){
        return http.post(`/customer/add`,obj).then(x => x.data)
      }
}
export default new CustomerService