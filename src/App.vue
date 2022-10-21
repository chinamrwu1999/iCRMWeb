<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

const searchText = ""
</script>

<template>
  
  <div class="main">
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
   <div class="content">
    <div class="leftColumn">
      <RouterLink to="/">主页</RouterLink>
      <div class="menu">
        <div class="menuHeader">
          <span>
            <hr />
          </span>
          <span class="menuCat">OKR</span>
          <span>
            <hr />
          </span>
        </div>
        <RouterLink to="/">Goal</RouterLink>
        <RouterLink to="/">项目</RouterLink>
        <RouterLink to="/">任务</RouterLink>
        <RouterLink to="/">日志</RouterLink>
      </div>
      <div class="menu">
        <div class="menuHeader">
          <span>
            <hr />
          </span>
          <span class="menuCat">CRM</span>
          <span>
            <hr />
          </span>
        </div>

        <RouterLink to="/customer">客户信息</RouterLink>
        <RouterLink to="/hospital">医院信息</RouterLink>
        <RouterLink to="/">数据看板</RouterLink>
        <RouterLink to="/">基础数据</RouterLink>

      </div>

    </div>
    <div class="rightColumn">
      <RouterView />
    </div>

   </div>
    
  </div>


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
  flex-flow: column nowrap;
  width: 100%;
  height: calc(100% - 3.2em);


}
.content{
  width:100%;height:calc(100% - 3em);
  display:flex;flex-flow:row nowrap;
}
.leftColumn {
  padding-top: 3em;
  height: 100%;
  width: 8em;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  /*background-color: #4573d2;*/
  background: linear-gradient(#141e30, #243b55);
  color: white;
}


.rightColumn {
  width: 100%;
  border: solid 2px red;
}


.menu {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-around;
  margin-top: 1em;

}

.leftColumn a {
  color: white;
}

.menuHeader {
  height: 1em;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5em;
}

.menuHeader hr {
  width: 2.5em;
  height: 1px;
  background-color: wheat;
  border: none;
  padding: 0;
  margin: 0;
}

.menuCat {
  padding: 0.3em;
}
</style>
