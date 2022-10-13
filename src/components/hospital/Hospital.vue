<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref } from "vue"
import service from "./HospitalService"
import CommonService from "../../services/CommonService"
const router = useRouter()
const route = useRoute()

const searchTextKK = ""
const markets=ref(Array<any>())
const areas=ref(Array<any>())
const citys=ref(Array<any>())
const error=ref("")
function AddHospital() {
    console.log("I am hospital!")
    router.push("/hospital/new")
}
function TestMe(){
   service.Test().then(data => console.log(data))
}

function changeMarket(e:any){
     let selected=e.target.value
     CommonService.GET(`market/provinces/${selected}`).then(res =>{areas.value=res;console.log(res)})
}

function changeArea(e:any){
     let selected=e.target.value
     CommonService.GET(`market/citys/${selected}`).then(res =>{citys.value=res;console.log(res)})
}

onMounted(() => {
     CommonService.GET("market/areas").then(res => {
        markets.value=res
        console.log(res)
     }
     ).catch(err=>error.value=err)

     router.push("/hospital/list")

}

)

</script>
<template>
    <div class="main">
        <header>
            
            <button @click="TestMe()">测试</button>
            <div>
                <select name="markets" @change="changeMarket($event)">
                    <option value="-1">区域</option>
                    <option :value="item.AreaId" v-for="item in markets">{{item.Name}}</option>
                </select>
                <select name="area" v-if="areas?.length>0" @change="changeArea($event)">
                       <option :value="item.Code" v-for="item in areas">{{item.name}}</option>
                </select>
                <select name="area" v-if="citys?.length>0" @change="changeArea($event)">
                       <option :value="item.Code" v-for="item in areas">{{item.name}}</option>
                </select>
                <input type="text" v-model="searchTextKK" />
                <button>查询</button>
            </div>
            <span>
                <button @click="AddHospital()">添加医院</button>
            </span>
        </header>
        <div class="content">
            <RouterView />
        </div>
        
    </div>
</template>
<style scoped>
.main {
    width: 100%;
    height: 100%;
    padding: 0.2em;
    display: flex;
    flex-flow: column nowrap;
}

header {
    height: 2.5em;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;   align-items: center; justify-content: space-between;
    border: solid 1px gray;
    padding-left: 1em;
    padding-right:1em;

}

.content {
    width: 100%;
    height: calc(100% - 2.8em);
}
</style>