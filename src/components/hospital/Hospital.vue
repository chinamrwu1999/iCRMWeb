<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref,provide} from "vue"
import service from "./HospitalService"
import CommonService from "../../services/CommonService"
import HospitalUpdater from "./HospitalUpdate.vue"
const router = useRouter()
const route = useRoute()

const search = ref({
    code:Array<string>(),
    txt:''
})


const errors = ref(null)
const childWindow = ref('')
const selected = ref(-1)
const pageData = ref({
     pageSize: 0,
     page: 0,
     totalRows: 0,
     totalPages: 0,
     rows: Array<any>(),
     sort: ''

})
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


function showEdit(hospitalId: number) {
     selected.value = hospitalId
     childWindow.value = 'update'
}
function closeChild() {
     childWindow.value = ''
}

function changeMarket(e:any){
     let selected=e.target.value
     CommonService.GET(`market/provinces/${selected}`).then(res =>{

        areas.value=res;//console.log(res)
        let x=areas.value.map(obj=>obj.Code)
         search.value.code=x
       })
}

function changeArea(e:any){
     let selected=e.target.value
     CommonService.GET(`market/citys/${selected}`).then(res =>
     {
        citys.value=res;
        let x=areas.value.map(obj=>obj.Code)
        search.value.code=x
        
     })
}

onMounted(() => {
     CommonService.GET("market/areas").then(res => {
        markets.value=res
        console.log(res)
     }
     ).catch(err=>error.value=err)

    // router.push("/hospital/list")

    service.listHospitals().then(data => {
          console.log(data)
          pageData.value = data
     }
     ).catch(error => errors.value = error)

}

)

</script>
<template>
    <div class="main">
        <header>
            
            <button @click="TestMe()">测试</button>
            <div>
                <select name="markets" @change="changeMarket($event)">
                    <option value="-1">大区</option>
                    <option :value="item.AreaId" v-for="item in markets">{{item.Name}}</option>
                </select>
                <select name="area" v-if="areas?.length>0" @change="changeArea($event)">
                       <option value="">省市</option>
                       <option :value="item.Code" v-for="item in areas">{{item.name}}</option>
                </select>
                <select name="area" v-if="citys?.length>0" @change="changeCitys($event)">
                       <option :value="item.Code" v-for="item in areas">{{item.name}}</option>
                </select>
                <input type="text" v-model="search.txt" />
                <button>查询</button>
            </div>
            <span>
                <button @click="AddHospital()">添加医院</button>
            </span>
        </header>
        <!-- div class="content">
            <RouterView />
        </div -->
        
    </div>
    <div class="list">
          <template v-if="pageData?.rows.length>0">
               <div class="header">
                    <span class="index">序号</span>
                    <span class="name">医院名称</span>
                    <span class="province">省市</span>
                    <span class="ctype">类型</span>
                    <span class="grade">等级</span>



               </div>
               <div class="body">
                    <div class="row" v-for="item,index in pageData.rows">
                         <span class="index">{{index+1}}</span>
                         <span class="name">{{item.Name}}</span>
                         <span class="province">{{item.Province}}{{item.City}}</span>
                         <span class="ctype">{{item.HType}}</span>
                         <span class="grade">{{item.Grade}}</span>

                         <span class="buttons">
                              <button @click="showEdit(item.ID)">编辑</button>
                              <button>详细</button>
                         </span>
                    </div>
               </div>
               <div class="footer">
                    <span><button>
                              &#x3c;&#x3c;前一页
                         </button></span>
                    <span>
                         共有
                         <b style="padding-left: 1em;padding-right:1em;color:red">
                              {{pageData.totalRows}}
                         </b>行记录
                         <b style="padding-left: 1em;padding-right:1em;color:red">
                              {{pageData.totalPages}}
                         </b>页,当前是第
                         <b style="padding-left: 1em;padding-right:1em;color:red">
                              {{pageData.page+1}}
                         </b>页
                    </span>
                    <span>
                         <button>
                              下一页 &#x3e;&#x3e;
                         </button>
                    </span>
               </div>
          </template>
          <template v-else-if="errors">
               <div class="error">
                    <span>错误信息：{{errors}}</span>
               </div>
          </template>
          <template v-else>
               <div class="loading">
                    <span>data loading......</span>
               </div>
          </template>
     </div>
     <Teleport to=".list" v-if="childWindow=='update'">
          <HospitalUpdater :hospital-id="selected" @close-window="closeChild()" />
     </Teleport>
</template>
<style scoped>
.main {
    width: 100%;
    height: 3em;
    padding: 0.2em;
    display: flex;
    flex-flow: column nowrap;
    border-top:solid 1px #141e30 ;
}

header {
    height: 2.5em;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;   align-items: center; justify-content: space-between;
  
    padding-left: 1em;
    padding-right:1em;

}

.content {
    width: 100%;
    height: calc(100% - 2.8em);
}

.index {
     width: 3em;
}

.name {
     width: 45em;
}


.ctype {
     width: 10em;
}


.grade {
     width: 4em;
}

.province {
     width: 15em;
}

.buttons{
     display:flex;flex-flow:row nowrap;align-items: center; text-align: right;
}
</style>