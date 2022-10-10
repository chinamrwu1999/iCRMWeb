import http from "./HttpClient"
import { ref, isRef, unref, watchEffect, type Ref } from 'vue'

class CommonService {


     


      /* 获取字典码 */
      async fetchCodes(codeTypes: string): Promise<any> {
            return http.get(`/codes/${codeTypes}`).then(x => x.data)

      }

      /* 获取所有省份和直辖市 */
      async fetchProvinces(): Promise<any> {
            return http.get(`/provinces`).then(x => x.data)
      }

      /* 获取下一级市、区 */
      async fetchChildCitys(code: string): Promise<any> {
            return http.get(`/city/${code}`).then(x => x.data)
      }

}

export default new CommonService


