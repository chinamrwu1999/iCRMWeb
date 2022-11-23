import axios from "axios"
import http from "./HttpClient"

class CommonService {

      baseURL = ""
      /* 获取字典码 */
      async fetchCodes(codeTypes: string): Promise<any> {
            return http.get(`${this.baseURL}/codes/${codeTypes}`).then(x => x.data)

      }

      /* 获取用户权限的顶级区域 */
      async listTopAreas(): Promise<any> {
            return http.get(`${this.baseURL}/topcity`).then(x => x.data)
      }

      /* 获取子级区域 */
      async listChildAreas(code: string): Promise<any> {
            return http.get(`${this.baseURL}/childcity/${code}`).then(x => x.data)
      }

      /* 获取所有省份和直辖市 */
      async fetchProvinces(): Promise<any> {
            return http.get(`${this.baseURL}/provinces`).then(x => x.data)
      }

      /* 获取下一级市、区 */
      async fetchChildCitys(code: string): Promise<any> {
            return http.get(`${this.baseURL}/city/${code}`).then(x => x.data)
      }

      /* 获取所有省份和直辖市 */
      async allProducts(): Promise<any> {
            return http.get(`${this.baseURL}/products`).then(x => x.data)
      }

      async POST(url: string, obj: any): Promise<any> {
            return http.post(`${this.baseURL}/${url}`, obj).then(x => x.data)
      }
      async GET(url: string): Promise<any> {
            return http.get(`${this.baseURL}/${url}`).then(x => x.data)
      }


      async AxiosPOST(url: string, payload: any): Promise<any> {

            return axios({
                  url: `${this.baseURL}/${url}`,
                  method: 'post',
                  data: payload
            })
                  .then(x => x.data)
      }

      UserLogin(obj: any): Promise<any> {

            return http.post(`${this.baseURL}/login`, obj)
      }


      TestIt(){
            console.log("Hello")
      }


}

export default new CommonService


