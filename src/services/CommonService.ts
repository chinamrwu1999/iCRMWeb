import axios from "axios"
import http from "./HttpClient"

class CommonService {

       baseURL="/iCRM"
        /* 获取字典码 */
      async fetchCodes(codeTypes: string): Promise<any> {
            return http.get(`${this.baseURL}/codes/${codeTypes}`).then(x => x.data)

      }

      /* 获取所有省份和直辖市 */
      async fetchProvinces(): Promise<any> {
            return http.get(`${this.baseURL}/provinces`).then(x => x.data)
      }

      /* 获取下一级市、区 */
      async fetchChildCitys(code: string): Promise<any> {
            return http.get(`${this.baseURL}/city/${code}`).then(x => x.data)
      }

      async POST(url: string,obj:any): Promise<any> {
            return http.post(`${this.baseURL}/${url}`,obj).then(x => x.data)
      }
      async GET(url: string): Promise<any> {
            return http.get(`${this.baseURL}/${url}`).then(x => x.data)
      }

      async fetchPOST(url:string,obj:any):Promise<any> {
            const response = await fetch(`${this.baseURL}/${url}`, {
                  method: 'POST', // *GET, POST, PUT, DELETE, etc.
                  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                  credentials: 'same-origin', // include, *same-origin, omit
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  redirect: 'follow', // manual, *follow, error
                  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                  body: JSON.stringify(obj) // body data type must match "Content-Type" header
                });
                return response.json(); // parses JSON response into native JavaScript objects
              }
      
      async AxiosPOST(url:string,payload:any):Promise<any> {
            
            axios({
                  url: `${this.baseURL}/${url}`,
                  method: 'post',
                  data: payload
                })
                .then(x => {
                  console.log(x)
                  console.log(x.data)
                }
                  )
      }
            
      

}

export default new CommonService


