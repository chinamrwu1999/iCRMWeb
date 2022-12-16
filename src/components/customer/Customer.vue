<script setup lang="ts">
// @ts-nocheck
import { useRouter } from 'vue-router'
import { onMounted, ref } from "vue"
import service from "./CustomerService"
import CommonService from "../../services/CommonService"
import CustomerUpdater from "./CustomerUpdate.vue"
import MyArea from "../commons/MyAreas.vue"
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
     startIndex: 0,
     totalRows: 0,
     totalPages: 0,
     rows: Array<any>(),
     sort: ''

})
const error = ref("")

function changeMyArea(areaId){
    // console.log(areaId)
    if(areaId && areaId != ''){
          search.Citys=areaId
          service.queryCustomers(search).then( data => {
               pageData.value=data
          })
    }else{
     service.MyCustomers().then(res => {
               pageData.value = res
          }).catch(error => errors.value = error)
    }
    
     
}


onMounted(() => {
     CommonService.listTopAreas().then(data => {
          topAreas.value = data
     }).then( () => {
          service.MyCustomers().then(res => {
               pageData.value = res
          }).catch(error => errors.value = error)
     }).catch(error => errors.value = error)
}

)
/***************************************** */


function showEdit(hospitalId: number) {
     selected.value = hospitalId
     childWindow.value = 'update'
}
function closeChild() {
     childWindow.value = ''
}

function getPageData(index: number) {
     if (index < 0 || index > pageData.value.totalPages) return;
     service.pageCustomers(search, 20, index).then(res => {
          //console.log(pageData.value)
          pageData.value.rows = res.rows;
          pageData.value.page = index;
          pageData.value.startIndex = res.startIndex

     }).catch(e1 => errors.value = e1)
}
function LikeName() {
     search.Citys = ''
     service.queryCustomers(search).then(res => {
          pageData.value = res
     })
}

/************************* 动态下拉框************************************ */

const topAreas = ref(Array<any>())


</script>
<template>
     <div class="main1">
         
          <header>
               
               <MyArea @select-city="changeMyArea"></MyArea>
               <span>
                    <input type="text" v-model="search.Txt" />
                    <button @click="LikeName()">查询</button>

               </span>
               <span>
                    <button>添加新客户</button>
               </span>

          </header>


       

     </div>
     <div class="list">
          <template v-if="pageData?.rows?.length>0">
               <div class="header">
                <span class="index">序号</span>
                    <span class="name">客户名称</span>
                    <span class="shortName">简称</span>
                    <span class="ctype">类型</span>
                    <span class="scale">规模</span>
                    <span class="level">等级</span>
                    <span class="province">省市</span>
                    <span class="status">状态</span>
                    <span class="getway">获客方式</span>
                    <span class="address">地址</span>



               </div>
               <div class="body">
                    <div class="row" v-for="item,index in pageData.rows">
                         <span class="index">{{pageData.startIndex+index+1}}</span>
                       
                         <span class="name">{{item.Name}}</span>
                         <span class="shortName">{{item.ShortName}}</span>
                         <span class="ctype">{{item.CType}}</span>
                         <span class="scale">{{item.Scale}}</span>
                         <span class="level">{{item.Level}}</span>
                         <span class="province">{{item.Province}}{{item.City}}</span>
                         <span class="status">{{item.Status}}</span>
                         <span class="getway">{{item.GetWay}}</span>
                         <span class="address">{{item.Address}}</span>
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
          <!-- <CustomerUpdater :hospital-id="selected" @close-window="closeChild()" /> -->
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
.index {
     width: 3em;
}

.name {
     width: 25% ;
}

.shortName {
     width: 6em
}

.ctype {
     width: 5em;
}

.scale {
     width: 4em;
}

.level {
     width: 4em;
}

.province {
     width: 10em;
}

.status {
     width: 5em;
}

.getway {
     width: 8em;
}

.address {
     width: 30%;
}

.row>.address {
     font-size: 0.9em;
}

.buttons {
     text-align: right;
}
</style>