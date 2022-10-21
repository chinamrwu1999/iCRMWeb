<script setup lang="ts">
import service from "../../services/CommonService"
import router from "../../router"
var model = {
    UserId: '15010040',
    Password: '123456'
}

/****************************** */
function submit() {
    console.log("I am logining")
    
    service.UserLogin(model).then(response => {
       // console.log(response)
        let token=response.headers.token
        localStorage.setItem("AMSTOKEN",token)
        return(response.data)
    }
    ).then(x =>{
         if(x?.ID){
            console.log("login successfully")
            localStorage.setItem("userId",x)
            router.push("/")
         }
        })
}
/****************************** */
function exit() {

}
</script>

<template>
    <div class="main">
        <!-- div class="coodinate">
            <span>
                    <img src="../../assets/images/coordinate.png"/>
             </span>
           </div -->
        <div class="form1">
            
            <header>
                <span>艾米森客户关系管理系统</span>
            </header>
            <div class="fields">
                <div class="row">
                    <span class="fieldLabel">UserID</span>
                    <span class="field"><input type="text" name="customerName" v-model="model.UserId" /></span>
                </div>
                <div class="row">
                    <span class="fieldLabel">Password</span>
                    <span class="field"><input type="text" name="customerName" v-model="model.Password" /></span>
                </div>

                <div class="buttons" style="padding-top:3em;">
                    <span></span>
                    <span></span>
                    <button @click="submit()">登录</button>
                    <button @click="exit()">退出</button>
                    <span></span>
                    <span></span>
                </div>
            </div>

        </div>
    </div>
</template>
<style>
.main {
    position: fixed;
    left: 1em;
    right: 1em;
    top: 1em;
    bottom: 1em;
    background-color: white;
}
.coodinate{
    position:absolute;
    top:10%;width:100%;

    height:8em;
    display:flex;flex-flow:row nowrap;align-items: center;justify-content: center;
}
</style>
