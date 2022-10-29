import CommonService from "../../services/CommonService";
import http from "../../services/HttpClient"

class MarketService{
  
      async fetchHospital(hospitalId:number){
        return http.get(`${CommonService.baseURL}/hospital/${hospitalId}`).then(x => x.data)
      }
    

}
export default new MarketService