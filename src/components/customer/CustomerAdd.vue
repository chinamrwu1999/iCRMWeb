<script setup lang="ts">
import { ref } from "vue"
import { onMounted } from 'vue'
import CommonService from "../../services/CommonService"
import service from "./CustomerService"
const model = ref({
    FullName: '河北明志康华生物科技有限公司',
    ShortName: '明志康华',
    CType: '',
    Scale: '',
    Status: '',
    Level: '',
    GetWay: '',
    Nation: '',
    Province: '',
    City: '',
    Address: '保定市竞秀区御风路保定大学科技园光阳园2A号楼2楼',
    Description: '',
})
const customerTypes = ref(Array<any>())
const scales = ref(Array<any>())
const status = ref(Array<any>())
const grades = ref(Array<any>())
const getWays = ref(Array<any>())
const codes = [customerTypes, scales, status, grades, getWays]
const provinces=ref(Array<any>())
const citys=ref(Array<any>())
/*****************************************business function ***************************************** */
function fetchAllCodes() {
    let codeTypes: string[] = ["customerType", "scale", "customerStatus", "customerGrade", "customerWay"]
    for (let i = 0; i < codeTypes.length; i++) {
        CommonService.fetchCodes(codeTypes[i]).then(data => codes[i].value = data)
    }
}
function provinceChange(){
     console.log("province select changed")
     console.log(model.value.Province)

     CommonService.fetchChildCitys(model.value.Province).then(data => citys.value=data)
     model.value.City=''
}

function submit() {
    service.save(model.value).then(x => console.log(x))
}

function Test(){
      console.log(model.value)
 
}
/********************************************************************************** */
onMounted(() => {
    fetchAllCodes()
    CommonService.fetchProvinces().then(data => provinces.value=data)
})

</script>
<template>
    <div class="main">
        
        <div class="form1">
            <header><span>添加新客户(代理)</span></header>
            <div class="fields">
                <div class="row">
                    <span class="fieldLabel">客户名称</span>
                    <span class="field"><input type="text" name="customerName" v-model="model.FullName" /></span>
                </div>
                <div class="row">
                    <span class="fieldLabel">客户简称</span>
                    <span class="field"><input type="text" name="shortName" v-model="model.ShortName" /></span>
                </div>
                <div class="row">
                    <span class="fieldLabel">类型</span>
                    <span class="field radios">
                        <span v-for="item in customerTypes">
                            <input type="radio" name="customerType" :value="item.Code" v-model="model.CType" />
                            {{item.Label}}
                        </span>


                    </span>
                </div>
                <div class="row">
                    <span class="fieldLabel">规模</span>
                    <span class="field radios">
                        <span v-for="item in scales">
                            <input type="radio" name="scale" :value="item.Code" v-model="model.Scale" />
                            {{item.Label}}
                        </span>
                    </span>
                </div>
                <div class="row">
                    <span class="fieldLabel">当前状态</span>
                    <span class="field radios">
                        <span v-for="item in status">
                            <input type="radio" name="status" :value="item.Code" v-model="model.Status" />
                            {{item.Label}}
                        </span>


                    </span>
                </div>
                <div class="row">
                    <span class="fieldLabel">等级</span>
                    <span class="field radios">
                        <span v-for="item in grades">
                            <input type="radio" name="grade" :value="item.Code" v-model="model.Level" />
                            {{item.Label}}
                        </span>


                    </span>
                </div>
                <div class="row">
                    <span class="fieldLabel">获得方式</span>
                    <span class="field">
                        <span v-for="item in getWays">
                            <input type="radio" name="getways" :value="item.Code" v-model="model.GetWay" />
                            {{item.Label}}
                        </span>


                    </span>
                </div>
                <div class="row">
                    <span class="fieldLabel">国家/省市</span>
                    <span class="field">
                          <span>
                              <label for="provinces">省</label>
                              <select id="provinces" v-model="model.Province" @change="provinceChange">
                                <option value="">请选择省份</option>
                                  <option :value="item.Code" v-for="item in provinces">{{item.Name}}</option>
                              </select>
                          </span>
                          <span v-if="citys">
                             <label for="citys">市</label>
                              <select id="citys" v-model="model.City">
                                  <option value="">请选择城市</option>
                                  <option :value="item.Code" v-for="item in citys">{{item.Name}}</option>
                              </select>
                          </span>
                    </span>
                </div>

                <div class="row">
                    <span class="fieldLabel">地址</span>
                    <span class="field">
                        <input type="text" name="address" v-model="model.Address" />
                    </span>
                </div>
                <div class="row">
                    <span class="fieldLabel">描述</span>
                    <span class="field">
                        <input type="text" name="description" v-model="model.Description" />
                    </span>
                </div>
            </div>
            <div class="buttons">
                <span></span>
                <span></span>
                <button @click="submit()">Do it</button>
                <button @click="Test()">Do it</button>
                <span></span>
                <span></span>
            </div>
        </div>
       
    </div>
</template>
<style scoped>
.main {
    width: 100%;
    height: 100%;
   /* background: linear-gradient(#141e30, #243b55);*/
    
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


</style>