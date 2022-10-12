<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from "vue"
import service from "./HospitalService"
const router = useRouter()
const route = useRoute()

const searchTextKK = ""

function AddHospital() {
    console.log("I am hospital!")
    router.push("/hospital/new")
}
function TestMe(){
   service.Test().then(data => console.log(data))
}
onMounted(() => {
     router.push("/hospital/list")
}

)

</script>
<template>
    <div class="main">
        <header>
            <button @click="AddHospital()">添加医院</button>
            <button @click="TestMe()">测试</button>
            <div>
                <input type="text" v-model="searchTextKK" />
                <button>查询</button>
            </div>
            <span></span>
        </header>
        <div class="content">
            <RouterView />
        </div>
        
    </div>
</template>
<style scoped>
.main {
    width: 100%;
    height: 100%;
    padding: 0.2em;
    display: flex;
    flex-flow: column nowrap;
}

header {
    height: 2.5em;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    border: solid 1px gray;

}

.content {
    width: 100%;
    height: calc(100% - 2.8em);
}
</style>