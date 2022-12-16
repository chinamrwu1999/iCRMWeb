<script setup lang="ts">
import router  from '@/router';
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';

const Years=ref(new Array<number>())
const parameters={
    year:-1,
    type:'estimate'
}

/************************************************************* */

function initData(){
   let d0=new Date();
   let year=d0.getFullYear();
   let years=new Array<number>();
   while(year >=2020){
     years.push(year);
     year=year-1;
   }
   Years.value=years;
}
/**************************** changeData  ********************************* */

function changeData(event:any){
    parameters.type=event.target.value
    localStorage.setItem("visualParameters",JSON.stringify(parameters))
    router.push({name:"estimateView"})
}

function changeYear(event:any){
   
    parameters.year=parseInt(event.target.value)
    localStorage.setItem("visualParameters",JSON.stringify(parameters))
    router.push({name:"estimateView"})
}


/*************************  onMounted   ************************************ */

onMounted( () => {
     initData();
})
</script>
<template>
<div class="main1">
   <select @change="changeData($event)" v-bind:value="parameters.type">
        <option value="">选择数据</option>
        <option value="estimate">销售预估</option>
        <option value="sale">实际销售</option>
    </select>
    <select  @change="changeYear($event)" v-bind:value="parameters.year">
        <option value="">选择年份</option>
        <option :value="year" v-for="year in Years">{{year}}</option>
    </select>
</div>
<div class="views">
     <!-- <RouterView name="databoard" /> -->
     <router-view></router-view>
</div>
</template>
<style>
   .main1{
    width:100%;height:3em;
    border:solid 1px green;
   }
</style>