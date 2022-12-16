<script setup lang="ts">
// @ts-nocheck
import Children from "../commons/MyAreas.vue"
  function getCities(data){
     console.log(data)
  }
</script>
<template>
  <div class="main1">
    <span>Hello</span>
    <Children @selectCity="getCities"/>
  </div>

</template>
<style scoped>
  .main1{
    width:100%;height:30em;
    border:solid 3px blue;
    display:flex;flex-flow: row nowrap;align-items: center;justify-content: center;
  }
</style>