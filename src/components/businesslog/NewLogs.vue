<script setup lang="ts">
// @ts-nocheck

import HospitalList from "../hospital/HospitalList.vue"
import CustomerList from "../customer/CustomerList.vue"
import ProxyList from "../proxy/ProxyList.vue"
import service from "./BusinessLogService"
import { ref } from "vue"


const emit = defineEmits(['closeChild'])


let hospital = {};
let customer = {}
let proxy = {}



const child = ref('')
/********************************************** */

function closeList() {

    child.value = ''
}
function selectHospital(obj) {


    hospital = obj
    let input=document.getElementById("customer")
    input.value=obj.name


}

function selectCustomer(obj) {

    console.log(obj)
    customer = obj
    let input=document.getElementById("customer")
    input.value=obj.name

}

function selectProxy(obj) {

    console.log(obj)
    proxy = obj
    let input=document.getElementById("proxy")
    input.value=obj.name

}

function openChild(name: string) {
    child.value = name;
}

function closeMe() {
    emit("closeChild")
}

function submit() {
    let user = JSON.parse(localStorage.getItem("userId"))
    console.log(user)

    let node = document.getElementById('content')
    let contents = node.value

    if (!contents) {
        alert("日志内容不能空！")
    }

    let obj = {
        EmployeeId: user.ID,
        HospitalId: hospital?.id,
        CustomerId: customer?.id,
        ProxyId: proxy?.id,
        Content: contents
    }
    console.log(obj)
    service.save(obj).then(x => {
        console.log(x)
    })
}

</script>
<template>

    <div class="container1">
        <div class="formContainer">

            <header>写日志</header>

            <div class="partner">
                <div class="label">
                    <span>涉及:</span>
                </div>
                <div class="field">
                    <div class="button"> <button @click="openChild('hospital')">医院</button>或者<button
                            @click="openChild('customer')">其他客户</button></div>
                    <div class="customer">
                        <input id="customer" type="text" readonly="true" value=""/>
                    </div>

                </div>

            </div>
            
            <div class="partner">
                <div class="label"><span>涉及：</span></div>
                <div class="field">
                    <div class="button"> <button @click="openChild('proxy1')">代理商</button> </div>
                    <div class="proxy">
                        <input id="proxy" type="text" readonly="true" value=""/>
                    </div>
                </div>
            </div>
            <div class="popup"></div>
            <div class="description">
                <div class="label">
                    <span>工作内容：</span>
                </div>

                <textarea rows="15" id="content">在协和医院消化科，向张主任介绍甲基化早诊的生物学原理和艾长康的优点。
                </textarea>
            </div>
            <div class="buttons">
                <span></span>
                <span></span>
                <span></span>

                <span></span>
                <button @click="submit">提交</button>
                <button>清空</button>
                <button @click="closeMe">关闭</button>
                <span>

                </span>
                <span>

                </span>
                <span></span>
                <span></span>
            </div>
            <Teleport to=".popup" v-if="child == 'hospital'">
                <HospitalList @closeChild="closeList" @selectItem="selectHospital" />
            </Teleport>

            <Teleport to=".popup" v-if="child == 'customer'">
                <CustomerList @closeChild="closeList" @selectItem="selectCustomer" />
            </Teleport>
            <Teleport to=".popup" v-if="child == 'proxy1'">
                <ProxyList @closeChild="closeList" @selectItem="selectProxy" />
            </Teleport>



        </div>
    </div>


</template>
<style scoped>
.container1 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    z-index: 200;
    /* background-color: #e3e3e3; */
    background: linear-gradient(#6596ce, #a4bee1);
    position: fixed;
    top: 1em;
    left: 1em;
    border-radius: 0.3em;
}

.formContainer {
    padding: 1em;
    border-radius: 0.3em;
    width: 80%;
    height: 80%;

    background: linear-gradient(#f9f9fa, #f4f6f5);
    box-sizing: border-box;
    box-shadow: 0 25px 25px rgba(1, 1, 1, .7);

    display: flex;
    flex-flow: column nowrap;

}

header {
    height: 3em;
    line-height: 3em;
    text-align: center;
    font-size: 1.6em;

}

.partner {
    margin-top: 1em;
    height: 3em;
    width: 100%;
    line-height: 3em;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    /* border:solid 1px greenyellow; */
}

.buttons {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
}

.label {
    width: 10em;
    height: 100%;
    padding-right: 1em;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;

}

.field {
    width: calc(100% - 11em);
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

}



.description {
    margin-top: 1em;
    height: 15em;
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 1em;
    /* border:solid 1px white; */
}



textarea {
    width: calc(100% - 25em);
    height: 12em;
    outline-width: 0;
    font-size: 18px;
    border-radius: 0.5em;
    text-indent: 2em;
}

.button {
    width: 15em;
}

.popup {
    width: 100%;
    height: 0.1em;
    padding-left: 10em;
}

.customer {
    width: 100%;
    height: 2em; line-height:2em;
}

.proxy {
    width: 100%;
    height: 2em; line-height:2em;    
}

input{
    border:none; outline:none; 
    width:100%;background-color: #f9f9fa;
    font-size: 18px;
}
</style>
