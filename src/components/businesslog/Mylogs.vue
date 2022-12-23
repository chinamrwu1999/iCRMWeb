<script setup lang="ts">
  // @ts-nocheck
  import { onMounted, ref } from 'vue';
  import NewLog from './NewLogs.vue'
  import service from "./BusinessLogService" 
  import commonService from "../../services/CommonService"
  import LogList from "./LogList.vue"

  const EmployeeId=ref(commonService.getUserId())

  const childWindow = ref('')
  function ShowNewWindow(){
         childWindow.value="new"
  }

  function closeChild() {
     childWindow.value = ''
}

function QueryTest(){
 
   let obj={
      employeeId:commonService.getUserId(),
      hospitalId:'18'
   }
   console.log(obj)
   service.queryEmployeeLogs(obj).then(data => {
      console.log(data)
   })

}

// onMounted( () => {
//     EmployeeId=
//     console.log(EmployeeId)
// }

// )

</script>
<template>
  <div class="main1">
      <header>
          <span></span>
          <span>工作日志</span>
          <span><button @click="ShowNewWindow()">写日志</button></span>
          <span><button @click="QueryTest()">测试</button></span>
     </header>
     
     <div class="component">
      <LogList :employee="EmployeeId"></LogList>
     </div>
     
    
  </div>
  <Teleport to=".main1" v-if="childWindow == 'new'">
          <NewLog  @closeChild="closeChild()" />
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
.component{
   height:calc(100% - 6em);  width:100%;
   display: flex;flex-flow:row nowrap;
}
.port{
   width:100%;height:0.1em;padding-left:5em;border:none;
}
</style>