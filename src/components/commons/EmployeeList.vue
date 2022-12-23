<script setup lang="ts">
// @ts-nocheck
import { onMounted, ref } from "vue"
import CommonService from "../../services/CommonService"
import MyArea from "../commons/MyAreas.vue"

const search = {
     Citys: '',
     Txt: ''
}

const emit = defineEmits(['closeChild', 'selectItem'])

const errors = ref(null)
const pageData = ref({
     pageSize: 0,
     page: 0,
     startIndex: 0,
     totalRows: 0,
     totalPages: 0,
     rows: Array<any>(),
     sort: ''

})

function changeMyArea(areaId) {
          search.Citys = areaId
          CommonService.POST("salesperson",search).then(data => {
               console.log(data)
               pageData.value = data
          })
 
}


onMounted(() => {
     CommonService.listTopAreas().then(data => {
          topAreas.value = data
     }).then(() => {
        CommonService.POST("salesperson",search).then(data => {
               console.log(data)
               pageData.value = data
          })  
        
     }).catch(error => errors.value = error)
    }


)
/***************************************** */



function closeChild() {
   
     emit('closeChild')
}


function sendData(item){
     emit("selectItem",{id:item.ID,name:item.Name})
     emit('closeChild')
}
/************************* 动态下拉框************************************ */

const topAreas = ref(Array<any>())
</script>
<template>
     <div class="kt1">
          <header class="header">
              
               <MyArea @select-city="changeMyArea"></MyArea>
               <span><button @click="closeChild">关闭</button></span>
          </header>

          <template v-if="pageData?.rows?.length > 0">
               <div class="hospitals">
                    <div class="body">
                         <div class="row" v-for="item, index in pageData.rows" @click="sendData(item)">
                              <span class="index">{{ pageData.startIndex + index + 1 }}</span>
                              <span class="employee">{{ item.ID + " "}} {{ item.Name }}</span>
                             

                         </div>
                    </div>
               </div>
               <div class="footer">
                    <span></span>
                    <span></span>
                    <span> </span>
                    <span></span>
                    <span></span>
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
     max-width: calc(100% - 4em);

     background-color: white;
     border: solid 1px #c9a889;
     border-radius: 0.2em;
     z-index: 101;
     opacity:1.0;
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
     display: flex;  flex-flow: column wrap; justify-content: flex-start; align-items:flex-start;
    

}

.row {
     
     height: 2em;
     width: 12em;
     display: flex;
     flex-flow: row ;
     align-items: center;
     color: black;
     border-bottom: solid 1px #dfb274;
     padding-right: 0.5em;
}

.footer {
     height: 0.3em;
     width: 100%;
     background-color: #b78a57;
     display: flex;
     flex-flow: row nowrap;
     align-items: center;
     justify-content: space-between;
     color:black;

}

.index {
     width: 2em;
     text-align: center;
     padding-right: 0.1em;
}

.employee {
    width:10em;
}

</style>