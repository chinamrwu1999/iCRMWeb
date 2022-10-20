<template>
    <div class="main">
        <div class="form1">

            <header><span>Log In CRM System</span></header>
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
                    <button @click="submit()">Do it</button>
                    <button @click="exit()">Do it</button>
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
</style>
<script setup lang="ts">
import Auth from "../../services/Authentication"
var model = {
    UserId: '',
    Password: ''
}

/****************************** */
function submit() {
    //http.po
}
/****************************** */
function exit() {

}
</script>