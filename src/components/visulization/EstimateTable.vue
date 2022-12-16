<script setup lang="ts">
import { onMounted, ref } from 'vue';


const parameters=ref({});


onMounted(() => {
      parameters.value=JSON.parse(localStorage.getItem("visualParameters") || "{}");
      console.log(parameters.value)


})

</script>
<template>
    <div>
        hello,here is table view
    </div>
</template>