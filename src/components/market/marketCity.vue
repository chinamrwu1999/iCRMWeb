<script lang="ts">import { onMounted, ref } from 'vue';

 const bigArea=ref()
 const province=ref();
 const citys=ref()
 onMounted(()=>{
    const obj=localStorage.getItem("userId")
    if(obj!=null){
        const user=JSON.parse(obj)
        const userId=user.ID
        
    }



 })
</script>
<template>

</template>
<style scoped>
</style>