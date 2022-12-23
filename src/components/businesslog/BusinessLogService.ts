import CommonService from "../../services/CommonService";
import http from "../../services/HttpClient"

class LogsService{
     async save(obj:any){
        return http.post(`${CommonService.baseURL}/Blogs/add`,obj).then(x => x.data)
      }
      async queryEmployeeLogs(obj:any,size=20){
        return http.post(`${CommonService.baseURL}/EmployeeLogs?size=${size}`,obj).then(x => x.data)
      }

      async queryOrgLogs(obj:any,size=20){
        return http.post(`${CommonService.baseURL}/OrgBlogs?size=${size}`,obj).then(x => x.data)
      }


      async queryLogs(obj:any,size=20){
        console.log(obj)
        return http.post(`${CommonService.baseURL}/QueryLogs?size=${size}`,obj).then(x => x.data)
      }

      
      async pageLogs(obj:any,pageSize:number,pageIndex:number){
        return http.post(`${CommonService.baseURL}/Blogs/list?size=${pageSize}&page=${pageIndex}&count=1`,obj).then(x => x.data)
      }
      async Test(){
        return http.get(`${CommonService.baseURL}/testme`).then(x => x.data)
      }
}
export default new LogsService