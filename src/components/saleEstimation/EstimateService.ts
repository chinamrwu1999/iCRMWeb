import CommonService from "../../services/CommonService";
import http from "../../services/HttpClient"

class EstimateService {
    async save(obj: any) {
        return http.post(`${CommonService.baseURL}/estimate/save`, obj).then(x => x.data)
    }

    async HistoryEstimates(customerId:number,productId:string,year:number) {
        let obj={
            CustomerId:customerId.toString(),
            ProductId:productId,
            Year:year.toString()
        }
        console.log(obj)
        return http.post(`${CommonService.baseURL}/estimate/history`, obj).then(x => x.data)
    }

    TestMe(){
        console.log("I am here")
    }

}
export default new EstimateService