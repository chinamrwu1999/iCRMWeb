<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import Navigator from "./components/Navigator.vue"
import Login from "./components/user/Login.vue"

const searchText = ""
const UserInf= ref(false)

</script>

<template>
  <template v-if="UserInf">

    <header>
      <div>
        <img src="./assets/images/ams.png" style="height:1.5em;" />
      </div>
      <div>
        <input type="text" name="searchText" :placeholder="searchText" />
      </div>
      <div>
        <RouterLink to="/">用户</RouterLink>
      </div>
    </header>
    <div class="main">
      <Navigator />
      <div class="rightColumn">
        <RouterView />
      </div>
    </div>
  </template>
  <template v-else>
     <Login/>
  </template>

</template>

<style scoped>
header {
  width: 100%;
  height: 3em;
  border-bottom: solid 1px grey;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding-left: 1em;
  padding-right: 1em;
}

.main {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: calc(100% - 3.2em);

}

.rightColumn {
  width: 100%;
}
</style>
