import CommonService from "../../services/CommonService";
import http from "../../services/HttpClient"

class HospitalService{
     async save(obj:any){
        return http.post(`${CommonService.baseURL}/hospital/add`,obj).then(x => x.data)
      }
      async fetchHospital(hospitalId:number){
        return http.get(`${CommonService.baseURL}/hospital/${hospitalId}`).then(x => x.data)
      }
    /*  async listHospitals(){
        return http.get(`${CommonService.baseURL}/hospital/list`).then(x => x.data)
      }
      
      async LikeName(like:string){
        return http.get(`${CommonService.baseURL}/hospital/like`,{
          params:{name:like}
          }).then(x => x.data)
      }
    */
     /* async pageLikeName(like:string,pageSize:number,pageIndex:number){
        return http.get(`${CommonService.baseURL}/hospital/like?size=${pageSize}&page=${pageIndex}&count=1`,{
          params:{name:like}
          }).then(x => x.data)
      }
   */
     

      async updateHospital(obj:any){
        return http.post(`${CommonService.baseURL}/hospital/update`,obj).then(x => x.data)
      }

      async queryHospitals(obj:any){
        return http.post(`${CommonService.baseURL}/hospitals/list`,obj).then(x => x.data)
      }
      async pageHospitals(obj:any,pageSize:number,pageIndex:number){
        return http.post(`${CommonService.baseURL}/hospitals/list?size=${pageSize}&page=${pageIndex}&count=1`,obj).then(x => x.data)
      }
      async Test(){
        return http.get(`${CommonService.baseURL}/testme`).then(x => x.data)
      }
}
export default new HospitalService