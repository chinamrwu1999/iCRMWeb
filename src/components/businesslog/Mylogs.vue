<script setup lang="ts">
  import { ref } from 'vue';
  import NewLog from './NewLogs.vue'
  const childWindow = ref('')
  function ShowNewWindow(){
         childWindow.value="new"
  }

  function closeChild() {
     childWindow.value = ''
}
</script>
<template>
  <div class="main1">
      <header>
          <span></span>
          <span>工作日志</span>
          <span><button @click="ShowNewWindow()">写日志</button></span>
          
     </header>
     <div class="list">

     </div>
    
  </div>
  <Teleport to=".list" v-if="childWindow == 'new'">
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
</style>