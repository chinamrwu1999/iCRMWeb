<script setup lang="ts">
// @ts-nocheck
import { onMounted, ref } from "vue"
import service from "./HospitalService"
import CommonService from "../../services/CommonService"
import HospitalUpdater from "./HospitalUpdate.vue"

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



onMounted(() => {
     CommonService.listTopAreas().then(data => {
          topAreas.value = data
     }).then( () => {
          service.MyHospitals().then(res => {
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
     service.pageHospitals(search, 20, index).then(res => {
          //console.log(pageData.value)
          pageData.value.rows = res.rows;
          pageData.value.page = index;
          pageData.value.startIndex = res.startIndex

     }).catch(e1 => errors.value = e1)
}
function LikeName() {
     search.Citys = ''
     service.queryHospitals(search).then(res => {
          pageData.value = res
     })
}

/************************* 动态下拉框************************************ */

const topAreas = ref(Array<any>())

function getChildAreas(event: any) {

     let value = event.target.value
     let target = event.target as HTMLElement
     let sibling = target.nextSibling;
     while (sibling) {
          target.parentNode?.removeChild(sibling)
          sibling = target.nextSibling;
     }

     if (value && value != '') {
          CommonService.listChildAreas(value).then(res => {
               if (res?.length > 0) {
                  //  console.log(res)

                    let select = document.createElement("select");

                    let option = document.createElement("option");
                         option.innerText ='请选择'
                         option.setAttribute("value",'')
                         select.append(option);

                    res.forEach(el => {
                        let option = document.createElement("option");
                         option.innerText = el.Name
                         option.setAttribute("value", el.Code)
                         select.append(option);
                    });
                    select.addEventListener("change", getChildAreas)
                    target.parentNode.appendChild(select)
                    
               }                
               search.Citys=value
                    service.queryHospitals(search).then( data => {
                      pageData.value=data

               })

          })
     }else{
          let preSibling = target.previousSibling as HTMLSelectElement || null
          if(preSibling !=null){
               search.Citys=  preSibling.value
               service.queryHospitals(search).then( data => {
                      pageData.value=data

               })

          }else{
               service.MyHospitals().then( data => {
                      pageData.value=data

               })
          }
     }




}

</script>
<template>
     <div class="main1">
          <header>
               
               <div class="topArea" id="areas">
                    <select name="myAreas" @change="getChildAreas($event)">
                         <option value="">区域</option>
                         <option :value="item.Code" v-for="item in topAreas">{{ item.Name }}</option>
                    </select>
               </div>
               <span>
                    <input type="text" v-model="search.Txt" />
                    <button @click="LikeName()">查询</button>

               </span>
               <span></span>

          </header>
     </div>
     <div class="list">
          <template v-if="pageData?.rows?.length > 0">
               <div class="header">
                    <span class="index">序号</span>
                    <span class="province">省市</span>
                    <span class="name">医院名称</span>
                    <span class="ctype">类型</span>
                    <span class="grade">等级</span>



               </div>
               <div class="body">
                    <div class="row" v-for="item, index in pageData.rows">
                         <span class="index">{{ pageData.startIndex + index + 1 }}</span>
                         <span class="province">{{ item.Province }}{{ item.City }}</span>
                         <span class="name">{{ item.Name }}</span>
                         <span class="ctype">{{ item.HType }}</span>
                         <span class="grade">{{ item.Grade }}</span>

                         <span class="buttons">
                              <button @click="showEdit(item.ID)">编辑</button>
                              <button>详细</button>
                         </span>
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
                         <b style="padding-left: 1em;padding-right:1em;color:red">
                              {{ pageData.totalRows }}
                         </b>行记录
                         <b style="padding-left: 1em;padding-right:1em;color:red">
                              {{ pageData.totalPages }}
                         </b>页,当前是第
                         <b style="padding-left: 1em;padding-right:1em;color:red">
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
     <Teleport to=".list" v-if="childWindow == 'update'">
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
     width: 40%;
     padding-right:1em;
     padding-left:1em;
}


.ctype {
     width: 8em;
}


.grade {
     width: 4em;
}

.province {
     width: 12em;
}

.buttons {
     text-align: right;
}
</style>