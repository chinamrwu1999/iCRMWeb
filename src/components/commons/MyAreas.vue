<script setup lang="ts">
// @ts-nocheck
import CommonService from '@/services/CommonService';
import { onMounted,ref } from 'vue';


const emit=defineEmits(['selectCity'])
  
const topAreas = ref(Array<any>())

function getChildAreas(event: any) {

     let value = event.target.value
     let target = event.target as HTMLElement
     let sibling = target.nextSibling;
     while (sibling) {
          target.parentNode?.removeChild(sibling)
          sibling = target.nextSibling;
     }

     if (value && value != '') {
          CommonService.listChildAreas(value).then(res => {
               if (res?.length > 0) {
                  //  console.log(res)

                    let select = document.createElement("select");

                    let option = document.createElement("option");
                         option.innerText ='请选择'
                         option.setAttribute("value",'')
                         select.append(option);

                    res.forEach(el => {
                        let option = document.createElement("option");
                         option.innerText = el.Name
                         option.setAttribute("value", el.Code)
                         select.append(option);
                    });
                    select.addEventListener("change", getChildAreas)
                    target.parentNode.appendChild(select)
                    
               }else{

               }               
            

          })
     } else{
          let sibling = target.nextSibling as HTMLSelectElement || null
          while (sibling) {
               target.parentNode?.removeChild(sibling)
               sibling = target.nextSibling;
          }  
          sibling = target.previousSibling as HTMLSelectElement || null
          if(sibling) {
               value=sibling.value;
          }else{
               value=''
          }

     }
     emit("selectCity",value)  




}

/********************************************************************* */

onMounted(() => {
     CommonService.listTopAreas().then(data => {
          topAreas.value = data
     }).catch(error => errors.value = error)
}

)

</script>
<template>
   <div class="topArea" id="areas">
                    <select name="myAreas" @change="getChildAreas($event)">
                         <option value="">区域</option>
                         <option :value="item.Code" v-for="item in topAreas">{{ item.Name }}</option>
                    </select>
               </div>
</template>
<style scoped>
</style>