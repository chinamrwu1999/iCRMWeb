<script setup lang="ts">
// @ts-nocheck
import { onMounted, ref } from "vue"
import service from "./HospitalService"
import CommonService from "../../services/CommonService"
import HospitalUpdater from "./HospitalUpdate.vue"
import MyArea from "../commons/MyAreas.vue"

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
          service.queryHospitals(search).then( data => {
               pageData.value=data
          })
    }else{
     service.MyHospitals().then(res => {
               pageData.value = res
          }).catch(error => errors.value = error)
    }
    
     
}


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

/************************* ???????????????************************************ */

const topAreas = ref(Array<any>())

</script>
<template>
     <div class="main1">
          <header>
               
               <!-- <div id="areas">
                    <select name="myAreas" @change="getChildAreas($event)">
                         <option value="">??????</option>
                         <option :value="item.Code" v-for="item in topAreas">{{ item.Name }}</option>
                    </select>
               </div> -->
               <MyArea @select-city="changeMyArea"></MyArea>
               <span>
                    <input type="text" v-model="search.Txt" />
                    <button @click="LikeName()">??????</button>

               </span>
               <span></span>

          </header>
     </div>
     <div class="list">
          <template v-if="pageData?.rows?.length > 0">
               <div class="header">
                    <span class="index">??????</span>
                    <span class="province">??????</span>
                    <span class="name">????????????</span>
                    <span class="ctype">??????</span>
                    <span class="grade">??????</span>



               </div>
               <div class="body">
                    <div class="row" v-for="item, index in pageData.rows">
                         <span class="index">{{ pageData.startIndex + index + 1 }}</span>
                         <span class="province">{{ item.Province }}{{ item.City }}</span>
                         <span class="name">{{ item.Name }}</span>
                         <span class="ctype">{{ item.HType }}</span>
                         <span class="grade">{{ item.Grade }}</span>

                         <span class="buttons">
                              <button @click="showEdit(item.ID)">??????</button>
                              <button>??????</button>
                         </span>
                    </div>
               </div>
               <div class="footer">
                    <span></span>
                    <span></span>
                    <span>
                         <template v-if="pageData.page > 0">
                              <button @click="getPageData(pageData.page - 1)">
                                   &#x3c;&#x3c;?????????
                              </button>
                         </template>
                    </span>
                    <span>
                         ??????
                         <b style="padding-left: 1em;padding-right:1em;color:red">
                              {{ pageData.totalRows }}
                         </b>?????????
                         <b style="padding-left: 1em;padding-right:1em;color:red">
                              {{ pageData.totalPages }}
                         </b>???,????????????
                         <b style="padding-left: 1em;padding-right:1em;color:red">
                              {{ pageData.page + 1 }}
                         </b>???
                    </span>
                    <span>
                         <template v-if="pageData.page < pageData.totalPages - 1">
                              <button @click="getPageData(pageData.page + 1)">
                                   ????????? &#x3e;&#x3e;
                              </button>
                         </template>
                    </span>
                    <span></span>
                    <span></span>
               </div>
          </template>
          <template v-else-if="errors">
               <div class="error">
                    <span>???????????????{{ errors }}</span>
               </div>
          </template>
          <template v-else>
               <div class="loading" style="text-align:center;">
                    <span>Sorry,?????????????????????.....</span>
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