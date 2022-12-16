<script setup lang="ts">
// @ts-nocheck

import HospitalList from "../hospital/HospitalList.vue"
import CustomerList from "../customer/CustomerList.vue"
import ProxyList from "../proxy/ProxyList.vue"
import service from "./BusinessLogService"
import {  ref } from "vue"


const emit=defineEmits(['closeChild'])


let hospital = {};
let customer={}
let proxy={}
let content=''


const child = ref('')
/********************************************** */

function closeList() {
   
    child.value=''
}
function selectHospital(obj){
   
    console.log(obj)
    hospital=obj
    let e0=document.querySelector(".customer")
    
    if(e0){
        e0.innerHTML=""
        e0?.appendChild(document.createTextNode(hospital.province+" "+hospital.city+" "+hospital.name))
    }
   
}

function selectCustomer(obj){
  
    console.log(obj)
    customer=obj
    let e0=document.querySelector(".customer")
    
    if(e0){
        e0.innerHTML=""
        e0?.appendChild(document.createTextNode(customer.name))
    }
   
}

function selectProxy(obj){
   
    console.log(obj)
    proxy=obj
    let e0=document.querySelector(".proxy")
    
    if(e0){
        e0.innerHTML=""
        e0?.appendChild(document.createTextNode(proxy.name))
    }
   
}

function openChild(name:string) {
    child.value = name;
}

function submit(){
    let user=JSON.parse(localStorage.getItem("userId"))
    console.log(user)

    let node=document.getElementById('content')
    let contents=node.value
   
    if(! contents){
        alert("日志内容不能空！")
    }

    let obj={
        EmployeeId:user.ID ,
        HospitalId: hospital?.id,
        CustomerId: customer?.id,
        ProxyId: proxy?.id,
        Content:contents
    }
    console.log(obj)
    service.save(obj).then(x => {
        console.log(x)
    })
}

</script>
<template>

    <div class="container1">
        <header>写日志</header>

        <div class="partner">
            <div class="label"><span>涉及:</span></div>
            <div class="field">
                <div class="button"> <button @click="openChild('hospital')">医院</button>或者<button
                        @click="openChild('customer')">其他客户</button></div>
                <div class="customer"></div>
                
            </div>

        </div>
       
        <div class="partner">
            <div class="label"><span>涉及：</span></div>
            <div class="field">
                <div class="button"> <button @click="openChild('proxy1')">代理商</button>   </div>
                <div class="proxy"></div>
            </div>
        </div>
        <div class="popup"></div>
        <div class="description">
            <div class="label">
                <span>工作内容：</span>
            </div>

            <textarea rows="10" id="content">在协和医院消化科，向张主任介绍甲基化早诊的生物学原理和艾长康的优点。
            </textarea>
        </div>
        <div class="buttons">
            <span></span>
            <span></span>
            <span></span>
            <button @click="submit">提交</button>
            <span></span>
            <button>清空</button>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <Teleport to=".proxy" v-if="child == 'hospital'">
        <HospitalList @closeChild="closeList" @selectItem="selectHospital" />
        </Teleport>

        <Teleport to=".proxy" v-if="child == 'customer'">
        <CustomerList @closeChild="closeList" @selectItem="selectCustomer" />
        </Teleport>
        <Teleport to=".popup" v-if="child == 'proxy1'">
        <ProxyList @closeChild="closeList" @selectItem="selectProxy" />
        </Teleport>
    
 

    </div>
   
</template>
<style scoped>


.container1 {
    width: 100%;
    height: 30em;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
}
.container1 > * {
    width: 100%;
}
.partner {
    height: 2.5em; width:100%; line-height:2.5em;
    display: flex; flex-flow: row nowrap; align-items: center;
    /* border:solid 1px greenyellow; */
}

.buttons{
    display: flex; flex-flow: row nowrap; align-items: center;justify-content: space-between;
}

.label {
    width: 10em; height:100%;
    padding-right:1em;
    display: flex; flex-flow: row nowrap;
    align-items: center;justify-content: flex-end;
}
.field{
    width:calc(100% - 11em);height:100%;
    display:flex;flex-flow:row nowrap;align-items:center;
}



.description {
    height: 15em;
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 1em;
    /* border:solid 1px white; */
}



textarea {
    width: calc(100% - 25em);
    outline-width: 0;
    font-size: 18px;
    border-radius: 0.5em;
    text-indent: 2em;
}

.button {
    width: 15em;
}

.popup {
    width: 100%;height:0.1em;padding-left:10em;
    /* background-color: white; */
    color: white;
}
.proxy{
    width: 100%;height:2em;
    color: white;
}
</style>
