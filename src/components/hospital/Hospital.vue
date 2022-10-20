<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref, computed, reactive } from "vue"
import service from "./HospitalService"
import CommonService from "../../services/CommonService"
import HospitalUpdater from "./HospitalUpdate.vue"
const router = useRouter()


const search = {
     Citys: '',
     Txt: ''
}

const errors = ref(null)
const childWindow = ref('')
const selected = ref(-1)
const pageData = ref({
     pageSize: 0,
     page: 0,
     startIndex:0,
     totalRows: 0,
     totalPages: 0,
     rows: Array<any>(),
     sort: ''

})
const markets = ref(Array<any>())
const provinces = ref(Array<any>())
const citys = ref(Array<any>())
const error = ref("")



onMounted(() => {
     CommonService.GET("market/areas").then(res => {
          markets.value = res
          // console.log(res)
     }
     ).catch(err => error.value = err)

     // router.push("/hospital/list")

     service.queryHospitals(null).then(data => {
         // console.log(data)
          pageData.value = data
     }
     ).catch(error => errors.value = error)

}

)
/***************************************** */


function AddHospital() {

     router.push("/hospital/new")
}
function TestMe() {
     service.Test().then(data => console.log(data))
}


function showEdit(hospitalId: number) {
     selected.value = hospitalId
     childWindow.value = 'update'
}
function closeChild() {
     childWindow.value = ''
}

function changeMarket(e: any) {
     let selected = e.target.value
     provinces.value = Array<any>()
     search.Txt=''
     if (selected) {
          CommonService.GET(`market/provinces/${selected}`).then(res => {
               if (res) {
                    provinces.value = res;//console.log(res)
                    let x: Array<string> = provinces.value.map(obj => obj.Code)
                    search.Citys = x.join(",")
               }

          }).then(() => {
               service.queryHospitals(search).then(res => {
                    pageData.value = res;

               })
          })
     } else {
          search.Citys = ''
          search.Txt = ''
          service.queryHospitals(search).then(res => {

               pageData.value = res;
               provinces.value = Array<string>()
               citys.value = Array<string>()
          })
     }


}

function changeProvince(e: any) {
     let provinceId = e.target.value
     search.Txt=''
     if (provinceId != '') {
          CommonService.GET(`market/citys/${provinceId}`).then(res => {
               citys.value = res;
               let x: Array<string> = citys.value.map(obj => obj.Code)
               x.push(provinceId)

               search.Citys = x.join(",")
          }).then(() => {
               service.queryHospitals(search).then(res => {
               pageData.value = res;
                    // console.log(pageData.value)
               })
          })
     } else {
          citys.value = Array<string>()
     }

}

function changeCity(e: any) {
     search.Txt=''
     let selected = e.target.value
     search.Citys = selected
     service.queryHospitals(search).then(res => {
          pageData.value = res;
     })

}

function getPageData(index: number) {
     if (index < 0 || index > pageData.value.totalPages) return;
     service.pageHospitals(search,20, index).then(res => {
          pageData.value.rows = res.rows;
          pageData.value.page = index;
          pageData.value.startIndex=res.startIndex
          
     }).catch(e1 => errors.value = e1)
}
function LikeName() {
     search.Citys = ''
     service.queryHospitals(search).then(res => {
            pageData.value = res
     })
}
</script>
<template>
     <div class="main1">
          <header>

               <button @click="TestMe()">测试</button>
               <div>
                    <select name="markets" @change="changeMarket($event)">
                         <option value="">大区</option>
                         <option :value="item.AreaId" v-for="item in markets">{{item.Name}}</option>
                    </select>
                    <template v-if="provinces?.length>0">
                         <select name="area" @change="changeProvince($event)">
                              <option value="">省市</option>
                              <option :value="item.Code" v-for="item in provinces">{{item.Name}}</option>
                         </select>
                         <template v-if="citys?.length>0">
                              <select name="area" @change="changeCity($event)">
                                   <option value="">市/区</option>
                                   <option :value="item.Code" v-for="item in citys">{{item.Name}}</option>
                              </select>
                         </template>
                    </template>
                    <input type="text" v-model="search.Txt" />
                    <button @click="LikeName()">查询</button>
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
          <template v-if="pageData?.rows?.length>0">
               <div class="header">
                    <span class="index">序号</span>
                    <span class="name">医院名称</span>
                    <span class="province">省市</span>
                    <span class="ctype">类型</span>
                    <span class="grade">等级</span>



               </div>
               <div class="body">
                    <div class="row" v-for="item,index in pageData.rows">
                         <span class="index">{{pageData.startIndex+index+1}}</span>
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
                    <span>
                         <template v-if="pageData.page>0">
                              <button @click="getPageData(pageData.page-1)">
                                   &#x3c;&#x3c;前一页
                              </button>
                         </template>
                    </span>
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
                         <template v-if="pageData.page < pageData.totalPages-1">
                              <button @click="getPageData(pageData.page+1)">
                                   下一页 &#x3e;&#x3e;
                              </button>
                         </template>
                    </span>
               </div>
          </template>
          <template v-else-if="errors">
               <div class="error">
                    <span>错误信息：{{errors}}</span>
               </div>
          </template>
          <template v-else>
               <div class="loading" style="text-align:center;">
                    <span>Sorry,没有找到数据哦.....</span>
               </div>
          </template>
     </div>
     <Teleport to=".list" v-if="childWindow=='update'">
          <HospitalUpdater :hospital-id="selected" @close-window="closeChild()" />
     </Teleport>
</template>
<style scoped>
.main1 {
     width: 100%;
     height: 3em;
     padding: 0.2em;
     display: flex;
     flex-flow: column nowrap;
     border-top: solid 1px #141e30;
}

header {
     height: 2.5em;
     width: 100%;
     display: flex;
     flex-flow: row nowrap;
     align-items: center;
     justify-content: space-between;

     padding-left: 1em;
     padding-right: 1em;

}

.index {
     width: 3em;
}

.name {
     width: 35%;
}


.ctype {
     width: 8em;
}


.grade {
     width: 4em;
}

.province {
     width: 20%;
}

.buttons {
     text-align: right;
}
</style>