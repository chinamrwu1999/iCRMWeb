import CommonService from "../../services/CommonService";
import http from "../../services/HttpClient"

class EstimateService {
    async save(obj: any) {
        return http.post(`${CommonService.baseURL}/estimate/save`, obj).then(x => x.data)
    }

}
export default new EstimateService