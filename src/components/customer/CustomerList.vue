<script setup lang="ts">
// @ts-nocheck
import { onMounted, ref } from "vue"
import service from "./CustomerService"
import CommonService from "../../services/CommonService"
import MyArea from "../commons/MyAreas.vue"

const search = {
     Citys: '',
     Txt: ''
}

const emit = defineEmits(['closeChild', 'selectItem'])

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

function changeMyArea(areaId) {
     // console.log(areaId)
     if (areaId && areaId != '') {
          search.Citys = areaId
          service.queryCustomers(search).then(data => {
               pageData.value = data
          })
     } else {
          service.MyCustomers().then(res => {
               pageData.value = res
          }).catch(error => errors.value = error)
     }


}


onMounted(() => {
     CommonService.listTopAreas().then(data => {
          topAreas.value = data
     }).then(() => {
          service.MyCustomers().then(res => {
               pageData.value = res
          }).catch(error => errors.value = error)
     }).catch(error => errors.value = error)
}

)
/***************************************** */



function closeChild() {
     console.log("HELLO")
     emit('closeChild')
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

function sendData(item){
     emit("selectItem",{id:item.ID,name:item.Name,city:item.City,province:item.Province})
}
/************************* 动态下拉框************************************ */

const topAreas = ref(Array<any>())
</script>
<template>
     <div class="kt1">
          <header class="header">
               <span>
                    <input type="text" v-model="search.Txt" />
                    <button @click="LikeName()">查询</button>

               </span>
               <MyArea @select-city="changeMyArea"></MyArea>
               <span><button @click="closeChild">关闭</button></span>
          </header>

          <template v-if="pageData?.rows?.length > 0">
               <div class="hospitals">
                    <div class="body">
                         <div class="row" v-for="item, index in pageData.rows" @click="sendData(item)">
                              <span class="index">{{ pageData.startIndex + index + 1 }}</span>
                              <span class="province">{{ item.Province }}{{ item.City }}</span>
                              <span class="shortName">{{item.ShortName}}</span>
                              <span class="name">{{ item.Name }}</span>
                       
                         </div>
                    </div>
               </div>
               <div class="footer">
                    <span></span>
                    <span></span>
                    <span>
                         <template v-if="pageData.page > 0">
                              <button @click="getPageData(pageData.page - 1)">
                                   &#x3c;&#x3c;前一页
                              </button>
                         </template>
                    </span>
                    <span>
                         共有
                         <b style="padding-left: 1em;padding-right:1em;color:blue">
                              {{ pageData.totalRows }}
                         </b>行记录
                         <b style="padding-left: 1em;padding-right:1em;color:blue">
                              {{ pageData.totalPages }}
                         </b>页,当前是第
                         <b style="padding-left: 1em;padding-right:1em;color:blue">
                              {{ pageData.page + 1 }}
                         </b>页
                    </span>
                    <span>
                         <template v-if="pageData.page < pageData.totalPages - 1">
                              <button @click="getPageData(pageData.page + 1)">
                                   下一页 &#x3e;&#x3e;
                              </button>
                         </template>
                    </span>
                    <span></span>
                    <span></span>
               </div>
          </template>
          <template v-else-if="errors">
               <div class="error">
                    <span>错误信息：{{ errors }}</span>
               </div>
          </template>
          <template v-else>
               <div class="loading" style="text-align:center;">
                    <span>Sorry,没有找到数据哦.....</span>
               </div>
          </template>
     </div>




</template>
<style scoped>
.kt1 {
     max-width: 80em;

     background-color: white;
     border: solid 1px #c9a889;
     border-radius: 0.2em;
     z-index: 102;
}

.header {
     height: 2.5em;
     width: 100%;
     display: flex;
     flex-flow: row nowrap;
     align-items: center;
     justify-content: space-between;
     /* background-color: #b95313; */
     background-color: #c9a889;
     padding-left: 1em;
     padding-right: 1em;
}

.hospitals {
     width: 100%;
   
     display: flex;
     flex-flow: column nowrap;

     padding-top: 1em;
     

}

.body {
     width: 100%;
     height: 41em;
     display: flex;
     flex-flow: column nowrap;
    

}

.row {
     
     height: 2em;
     width: 100%;
     display: flex;
     flex-flow: row nowrap;
     align-items: center;
     color: black;
     border-bottom: solid 1px #dfb274;
     padding-left: 1em;
     padding-right: 1em;
}

.row:nth-child(3n){
     background-color: #e8e7e3;
}

.footer {
     height: 2.5em;
     width: 100%;
     background-color: #b78a57;
     display: flex;
     flex-flow: row nowrap;
     align-items: center;
     justify-content: space-between;
     color:black;

}

.index {
     width: 3em;
     text-align: center;
     padding-right: 0.6em;
}

.name {
     width: calc(100% - 24em);
     padding-right: 1em;
     padding-left: 1em;
}
.shortName{
    width:8em;
}


.province {
     width: 20em;
}
</style>