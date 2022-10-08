<script setup lang="ts">
import { ref } from "vue"
import { onMounted } from 'vue'
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
    Address: '',
    Description: '',
})
const customerTypes = ref(Array<any>())
const scales = ref(Array<any>())
const status = ref(Array<any>())
const grades = ref(Array<any>())
const getWays = ref(Array<any>())




onMounted(() => {
    fetchCodes("customerType").then(data => customerTypes.value = data)
    fetchCodes("scale").then(data => scales.value = data)
    fetchCodes("customerStatus").then(data => status.value = data)
    fetchCodes("customerGrade").then(data => grades.value = data)
    fetchCodes("customerWay").then(data => getWays.value = data)

})
async function fetchCodes(codeTypes: string) {
    let response = await fetch(`/codes/${codeTypes}`, {
        method: 'get',
        headers: { 'content-type': 'application/json' }
    })
    let json = await response.json();
    return json;
}
function submit() {
    console.log(model.value)
    model.value.FullName = "OOOOOOO"
}
</script>
<template>
    <div class="form1">
        <header><span>添加新客户(代理)</span></header>
        <div class="fields">
            <div class="row">
                <span class="fieldLabel">客户名称</span>
                <span class="field"><input type="text" name="customerName" v-model="model.FullName" /></span>
            </div>
            <div class="row">
                <span class="fieldLabel">客户简称</span>
                <span class="field"><input type="text" name="shortName" v-model="model.ShortName"  /></span>
            </div>
            <div class="row">
                <span class="fieldLabel">类型</span>
                <span class="field radios">
                    <span v-for="item in customerTypes">
                        <input type="radio" name="customerType" :value="item.Code"  v-model="model.CType"/>
                        {{item.Label}}
                    </span>


                </span>
            </div>
            <div class="row">
                <span class="fieldLabel">规模</span>
                <span class="field radios">
                    <span v-for="item in scales">
                        <input type="radio" name="scale" :value="item.Code" v-model="model.Status" />
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
                        <input type="radio" name="getways" :value="item.Code" v-model="model.GetWay"  />
                        {{item.Label}}
                    </span>


                </span>
            </div>
            <div class="row">
                <span class="fieldLabel">国家/省市</span>
                <span class="field"></span>
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
            <button @click="submit()">Do it</button>
        </div>
    </div>
</template>
<style scoped>
.form1 {
    width: 100%;
    height: 100%;
    font-size:1.2em;
    display: flex;
    flex-flow: column nowrap;
}

header {
    width: 60%;
    height: 3em;
    margin-top: 1em;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
   
    font-size:1.3em;
}

.fields {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
}

.row {
    width: 100%;
    height: 3em;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
}

.fieldLabel {
    width: 10em;
    text-align: right;
    padding-right: 0.5em;
    background-color: var(--fieldLabelColor);
}

.fieldLabel::after {
    content: " :"
}

.field {
    width: calc(100% - 10em);

}

.field>* {
    width: 100%;
    margin-right: 0.8em;

}
.field > input[type='text'] {
    outline: none;
    border:none;
    border-bottom: solid 1px gray;
    max-width: 30em;
    min-width: 20em;
    height:2em;line-height:2em;
    font-size:1.2em;
}
header > span {
    border:none;
    border-bottom:solid 1px gray;
    padding-left:1em;padding-right:1em;
    padding-bottom:0.1em;
    color:black;
    margin-left:15em;
    font-weight: 700;
}
</style>