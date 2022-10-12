<script setup lang="ts">
import { ref } from "vue"
import { onMounted } from 'vue'
import CommonService from "../../services/CommonService"
import service from "./HospitalService"
const model = ref({
    Name: '',
    Code: '',
    Grade: '',
    HType: '',
})
const hospitalTypes = ref(Array<any>())
const grades = ref(Array<any>())
const codes = [hospitalTypes,grades]
const provinces=ref(Array<any>())
const citys=ref(Array<any>())
/*****************************************business function ***************************************** */
function fetchAllCodes() {
    let codeTypes: string[] = ["hospitalType", "hospitalGrade"]
    for (let i = 0; i < codeTypes.length; i++) {
        CommonService.fetchCodes(codeTypes[i]).then(data => codes[i].value = data)
    }
}
function provinceChange(e:any){
     console.log("province select changed")
     console.log(e.target.value)
     CommonService.fetchChildCitys(e.target.value).then(data => citys.value=data)
     model.value.Code=''
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
            <header><span>添加新医院</span></header>
            <div class="fields">
                <div class="row">
                    <span class="fieldLabel">医院名称</span>
                    <span class="field"><input type="text" name="Name" v-model="model.Name" /></span>
                </div>
               
                
                <div class="row">
                    <span class="fieldLabel">医院级别</span>
                    <span class="field radios">
                        <span v-for="item in grades">
                            <input type="radio" name="grade" :value="item.Code" v-model="model.Grade" />
                            {{item.Label}}
                        </span>


                    </span>
                </div>
               
                <div class="row">
                    <span class="fieldLabel">医院性质</span>
                    <span class="field radios">
                        <span v-for="item in hospitalTypes">
                            <input type="radio" name="hospitalType" :value="item.Code" v-model="model.HType" />
                            {{item.Label}}
                        </span>


                    </span>
                </div>
                <div class="row">
                    <span class="fieldLabel">国家/省市</span>
                    <span class="field">
                          <span>
                              <label for="provinces">省</label>
                              <select id="provinces" @change="provinceChange($event)">
                                <option value="">请选择省份</option>
                                  <option :value="item.Code" v-for="item in provinces">{{item.Name}}</option>
                              </select>
                          </span>
                          <span v-if="citys">
                             <label for="citys">市</label>
                              <select id="citys" v-model="model.Code">
                                  <option value="">请选择城市</option>
                                  <option :value="item.Code" v-for="item in citys">{{item.Name}}</option>
                              </select>
                          </span>
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
    text-align: center;
   /* background: linear-gradient(#141e30, #243b55);*/
    
}



</style>