<script setup lang="ts">
import router  from '@/router';
function changeData(event:any){
    console.log(event.target.value)
    router.push("/databoard/estimateView")
}
</script>
<template>
<div class="main1">
   <select @change="changeData($event)">
        <option value="">选择数据</option>
        <option value="estimate">销售预估</option>
        <option value="sale">实际销售</option>
    </select>
</div>
<div class="views">
     <RouterView name="databoard" />
</div>
</template>
<style>
</style>