<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from "vue"
const router = useRouter()
const route = useRoute()

const searchTextKK = ""

function AddCustomer() {
    console.log("I am here!")
    router.push("/customer/new")
}

onMounted(() => {
     router.push("/customer/list")
}

)

</script>
<template>
    <div class="main">
        <header>
            <button @click="AddCustomer()">+</button>
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