<script setup lang="ts">
// @ts-nocheck

import { onMounted } from 'vue';
import service from "./BusinessLogService" 
import {ref} from "vue"
const props = defineProps(['employee'])
const model = ref({
     pageSize: 0,
     page: 0,
     startIndex: 0,
     totalRows: 0,
     totalPages: 0,
     rows: Array<any>(),
     sort: ''

})

function fetchData(){
    let obj={
        employeeId:props.employee
    }
  

    service.queryEmployeeLogs(obj).then( x => {
        console.log(x)
        model.value=x
    })
}

onMounted(() => {
     fetchData()
   
}
     
)
const errors = ref("")
</script>
<template>
     <div class="kt1">
                  <template v-if="model?.rows?.length > 0">
               <div class="hospitals">
                    <div class="header">
                        <span class="index">序号</span>
                              <span class="date">日期</span>
                              <span class="employee">姓名</span>
                              <span class="content">内容</span>
                              <span class="customer">
                                客户
                             </span>
                            <span class="customer">
                               代理
                             </span>
                             
                             
                    </div>
                    <div class="body">
                         <div class="row" v-for="item, index in model.rows">
                              <span class="index">{{ model.startIndex + index + 1 }}</span>
                              <span class="date">{{ item.wdate }}</span>
                              <span class="employee">{{ item.Name }}</span>
                              <span class="content">{{ item.content }}</span>
                              <span class="customer">
                                {{ item.hospitalName }}
                                {{ item.customerName }}
                                
                              </span>
                               
                                <span class="customer">
                                {{ item.proxyName }}
                               </span>
                             
                             

                         </div>
                    </div>
               </div>
               <div class="footer">
                    <span></span>
                    <span></span>
                    <span>
                         <template v-if="model.page > 0">
                              <button>
                                   &#x3c;&#x3c;前一页
                              </button>
                         </template>
                    </span>
                    <span>
                         共有
                         <b style="padding-left: 1em;padding-right:1em;color:blue">
                              {{ model.totalRows }}
                         </b>行记录
                         <b style="padding-left: 1em;padding-right:1em;color:blue">
                              {{ model.totalPages }}
                         </b>页,当前是第
                         <b style="padding-left: 1em;padding-right:1em;color:blue">
                              {{ model.page + 1 }}
                         </b>页
                    </span>
                    <span>
                         <template v-if="model.page < model.totalPages - 1">
                              <button >
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
    width:100%;height:100%;

     background-color: white;
     border: solid 1px #c9a889;
     border-radius: 0.2em;
  
}


.hospitals {
     width: 100%;
   
     display: flex;
     flex-flow: column nowrap;

     padding-top: 1em;
     

}

.body {
     width: 100%;
     height: calc(100% - 3em);
     display: flex;
     flex-flow: column nowrap;
    

}

.row {
     
     min-height: 6em;
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

.header{
    height:2.5em;
    background-color: #b78a57;
     display: flex;
     flex-flow: row nowrap;
     align-items: center;
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

.row > span {
    padding-left:0.5em;
}

.employee {
     width: 8em;
     padding-right: 1em;
     padding-left: 1em;
}
.date{
    width:6em;
}
.customer{
    width:22em;
}
.content {
     width: 50%;
     padding-top:0.5em;padding-right:0.5em;padding-left:0.5em;
}
</style>