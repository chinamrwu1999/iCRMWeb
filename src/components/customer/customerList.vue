<script setup lang="ts">
import { ref, onMounted } from "vue"
//import CommonService from "../../services/CommonService"
import CustomerUpdater from "./CustomerUpdate.vue"
import service from "./CustomerService"
const models = ref(Array<any>())
const errors = ref(null)
const childWindow = ref('')
const selected = ref(-1)
onMounted(() => {
     service.listCustomer().then(data =>
      {
          console.log(data)
     models.value = data}
     ).catch(error => errors.value = error)
}

)

function showEdit(customerId: number) {
     selected.value = customerId
     console.log(selected.value)
     childWindow.value = 'update'
}
function closeChild() {
     childWindow.value = ''
}
</script>
<template>
     <div class="list">
          <template v-if="models?.length>0">
               <div class="header">
                    <span class="index">序号</span>
                    <span class="name">客户名称</span>
                    <span class="shortName">简称</span>
                    <span class="ctype">类型</span>
                    <span class="scale">规模</span>
                    <span class="level">等级</span>
                    <span class="province">省市</span>
                    <span class="status">状态</span>
                    <span class="getway">获客方式</span>
                    <span class="address">地址</span>
               </div>
               <div class="body">
                    <div class="row" v-for="item,index in models">
                         <span class="index">{{index+1}}</span>
                         <span class="name">{{item.FullName}}</span>
                         <span class="shortName">{{item.ShortName}}</span>
                         <span class="ctype">{{item.CType}}</span>
                         <span class="scale">{{item.Scale}}</span>
                         <span class="level">{{item.Level}}</span>
                         <span class="province">{{item.Province}}{{item.City}}</span>
                         <span class="status">{{item.Status}}</span>
                         <span class="getway">{{item.GetWay}}</span>
                         <span class="address">{{item.Address}}</span>
                         <span class="buttons">
                              <button @click="showEdit(item.ID)">编辑</button>
                              <button>详细</button>
                         </span>
                    </div>
               </div>
               <div class="footer">

               </div>
          </template>
          <template v-else-if="errors">
               <div class="error">
                    <span>错误信息：{{errors}}</span>
               </div>
          </template>
          <template v-else>
               <div class="loading">
                    <span>data loading......</span>
               </div>
          </template>
     </div>

     <Teleport to=".list" v-if="childWindow=='update'">
          <CustomerUpdater :customer-id="selected" @close-window="closeChild()" />
     </Teleport>
</template>

<style scoped>
.index {
     width: 3em;
}

.name {
     width: 20em;
}

.shortName {
     width: 6em
}

.ctype {
     width: 5em;
}

.scale {
     width: 4em;
}

.level {
     width: 4em;
}

.province {
     width: 10em;
}

.status {
     width: 5em;
}

.getway {
     width: 8em;
}

.address {
     width: 30em;
}

.row>.address {
     font-size: 0.9em;
}
</style>