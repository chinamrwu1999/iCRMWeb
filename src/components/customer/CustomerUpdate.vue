<script setup lang="ts">
import { ref, watch, defineProps } from "vue"
import { onMounted } from 'vue'
import CommonService from "../../services/CommonService"
import service from "./CustomerService"
const model = ref({
    FullName: '',
    ShortName: '',
    CType: '',
    Scale: '',
    Status: '',
    Level: '',
    GetWay: '',
    Nation: '',
    Province: '',
    City: '',
    Address: '',
    Description: '',
})
const customerTypes = ref(Array<any>())
const scales = ref(Array<any>())
const status = ref(Array<any>())
const grades = ref(Array<any>())
const getWays = ref(Array<any>())
const codes = [customerTypes, scales, status, grades, getWays]
const provinces = ref(Array<any>())
const citys = ref(Array<any>())

const error = ref(null)

/*******************************    props */
const props = defineProps<{
    customerId: number
}>()
defineEmits(['closeWindow'])
/*****************************************business function ***************************************** */
function fetchAllCodes() {
    let codeTypes: string[] = ["customerType", "scale", "customerStatus", "customerGrade", "customerWay"]
    for (let i = 0; i < codeTypes.length; i++) {
        CommonService.fetchCodes(codeTypes[i]).then(data => codes[i].value = data)
    }
}
function provinceChange() {
    console.log("province select changed")
    console.log(model.value.Province)

    CommonService.fetchChildCitys(model.value.Province).then(data => citys.value = data)
    model.value.City = ''
}

function submit() {
    service.updateCustomer(model.value).then(x => console.log(x)).then
}

function initData() {
    service.fetchCustomer(props.customerId).then(res => {
        console.log(res)
        model.value = res
        CommonService.fetchChildCitys(model.value.Province).then(x => {
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
            <header><span>???????????????(??????)??????</span></header>
            <div class="fields">
                <div class="row">
                    <span class="fieldLabel">????????????</span>
                    <span class="field"><input type="text" name="customerName" v-model="model.FullName" /></span>
                </div>
                <div class="row">
                    <span class="fieldLabel">????????????</span>
                    <span class="field"><input type="text" name="shortName" v-model="model.ShortName" /></span>
                </div>
                <div class="row">
                    <span class="fieldLabel">??????</span>
                    <span class="field radios">
                        <span v-for="item in customerTypes">
                            <input type="radio" name="customerType" :value="item.Code" v-model="model.CType" />
                            {{item.Label}}
                        </span>
                    </span>
                </div>
                <div class="row">
                    <span class="fieldLabel">??????</span>
                    <span class="field radios">
                        <span v-for="item in scales">
                            <input type="radio" name="scale" :value="item.Code" v-model="model.Scale" />
                            {{item.Label}}
                        </span>
                    </span>
                </div>
                <div class="row">
                    <span class="fieldLabel">????????????</span>
                    <span class="field radios">
                        <span v-for="item in status">
                            <input type="radio" name="status" :value="item.Code" v-model="model.Status" />
                            {{item.Label}}
                        </span>


                    </span>
                </div>
                <div class="row">
                    <span class="fieldLabel">??????</span>
                    <span class="field radios">
                        <span v-for="item in grades">
                            <input type="radio" name="grade" :value="item.Code" v-model="model.Level" />
                            {{item.Label}}
                        </span>


                    </span>
                </div>
                <div class="row">
                    <span class="fieldLabel">????????????</span>
                    <span class="field">
                        <span v-for="item in getWays">
                            <input type="radio" name="getways" :value="item.Code" v-model="model.GetWay" />
                            {{item.Label}}
                        </span>


                    </span>
                </div>
                <div class="row">
                    <span class="fieldLabel">??????/??????</span>
                    <span class="field">
                        <span>
                            <label for="provinces">???</label>
                            <select id="provinces" v-model="model.Province" @change="provinceChange">
                                <option value="">???????????????</option>
                                <option :value="item.Code" v-for="item in provinces">{{item.Name}}</option>
                            </select>
                        </span>
                        <span v-if="citys">
                            <label for="citys">???</label>
                            <select id="citys" v-model="model.City">
                                <option value="">???????????????</option>
                                <option :value="item.Code" v-for="item in citys">{{item.Name}}</option>
                            </select>
                        </span>
                    </span>
                </div>

                <div class="row">
                    <span class="fieldLabel">??????</span>
                    <span class="field">
                        <input type="text" name="address" v-model="model.Address" />
                    </span>
                </div>
                <div class="row">
                    <span class="fieldLabel">??????</span>
                    <span class="field">
                        <input type="text" name="description" v-model="model.Description" />
                    </span>
                </div>
            </div>
            <div class="buttons">
                <span></span>
                <span></span>
                <button @click="submit()">??????</button>
                <button @click='$emit("closeWindow")'>??????</button>
                <span></span>
                <span></span>
            </div>
        </div>

    </div>
</template>
<style scoped>

</style>