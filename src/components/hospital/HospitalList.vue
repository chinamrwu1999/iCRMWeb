<script setup lang="ts">
import { ref, onMounted, inject, watch } from "vue"
//import CommonService from "../../services/CommonService"
import HospitalUpdater from "./HospitalUpdate.vue"
import service from "./HospitalService"
//const models = ref(Array<any>())
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




onMounted(() => {
     service.listHospitals().then(data => {
          console.log(data)
          pageData.value = data
     }
     ).catch(error => errors.value = error)
}
)

function showEdit(hospitalId: number) {
     selected.value = hospitalId
     childWindow.value = 'update'
}
function closeChild() {
     childWindow.value = ''
}
</script>
<template>
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
.index {
     width: 3em;
}

.name {
     width: 30em;
}


.ctype {
     width: 5em;
}


.grade {
     width: 4em;
}

.province {
     width: 10em;
}

.address {
     width: 30em;
}
</style>