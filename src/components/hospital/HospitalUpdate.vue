<script setup lang="ts">
import { ref, watch, defineProps } from "vue"
import { onMounted } from 'vue'
import CommonService from "../../services/CommonService"
import service from "./HospitalService"
const model = ref({
    Name: '',
    Code: '',
    HType: '',
    Grade: ''
})
const hospitalTypes = ref(Array<any>())

const grades = ref(Array<any>())
const province=ref("")
const codes = [hospitalTypes, grades]
const provinces = ref(Array<any>())
const citys = ref(Array<any>())

const error = ref(null)

/*******************************    props */
const props = defineProps<{
    hospitalId: number
}>()
defineEmits(['closeWindow'])
/*****************************************business function ***************************************** */
function fetchAllCodes() {
    let codeTypes: string[] = ["hospitalType", "hospitalGrade"]
    for (let i = 0; i < codeTypes.length; i++) {
        CommonService.fetchCodes(codeTypes[i]).then(data => codes[i].value = data)
    }
}
function provinceChange(e:any) {
      CommonService.fetchChildCitys(model.value.Code).then(data => citys.value = data)
    model.value.Code = ''
}

function submit() {
    service.updateHospital(model.value).then(x => console.log(x))
}

function initData() {
    service.fetchHospital(props.hospitalId).then(res => {
       
        model.value = res
        province.value=model.value.Code.substring(0,2)+"0000"
       // console.log(province.value)
        CommonService.fetchChildCitys(province.value).then(x => {
            citys.value=x;
        })
    }).catch(msg => error.value = msg);
}


/********************************************************************************** */
onMounted(() => {
    fetchAllCodes()
    CommonService.fetchProvinces().then(data => provinces.value = data)
    initData()
})
</script>


<template>
    <div class="modal">
        <div class="form1">
            <header><span>修改医院信息</span></header>
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
                              <select id="provinces" @change="provinceChange($event)" v-model="province">
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
                <button @click="submit()">提交</button>
                <button @click='$emit("closeWindow")'>关闭</button>
                <span></span>
                <span></span>
            </div>
        </div>

    </div>
</template>
<style scoped>

</style>