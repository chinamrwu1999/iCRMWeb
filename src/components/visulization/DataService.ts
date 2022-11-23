import CommonService from "../../services/CommonService";
import http from "../../services/HttpClient"

class DataService {
    // async save(obj: any) {
    //     return http.post(`${CommonService.baseURL}/estimate/save`, obj).then(x => x.data)
    // }

    // async HistoryEstimals(customerId:number,productId:string,year:number) {
    //     let obj={
    //         CustomerId:customerId,
    //         ProductId:productId,
    //         Year:year
    //     }
    //     return http.post(`${CommonService.baseURL}/estimate/query`, obj).then(x => x.data)
    // }

}
export default new DataService