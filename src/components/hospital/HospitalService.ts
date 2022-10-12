import CommonService from "../../services/CommonService";
import http from "../../services/HttpClient"

class HospitalService{
     async save(obj:any){
        return http.post(`${CommonService.baseURL}/hospital/add`,obj).then(x => x.data)
      }
      async fetchHospital(hospitalId:number){
        return http.get(`${CommonService.baseURL}/hospital/${hospitalId}`).then(x => x.data)
      }
      async listHospitals(){
        return http.get(`${CommonService.baseURL}/hospital/list`).then(x => x.data)
      }

      async updateHospital(obj:any){
        return http.post(`${CommonService.baseURL}/hospital/update`,obj).then(x => x.data)
      }

      async Test(){
        return http.get(`${CommonService.baseURL}/testme`).then(x => x.data)
      }
}
export default new HospitalService