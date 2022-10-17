
<template>
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
</template>
<style>
  
.leftColumn {
  padding-top:3em;
  height: 100%;
  width: 8em;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  /*background-color: #4573d2;*/
  background: linear-gradient(#141e30, #243b55);
  color: white;
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
  width: 2.5em;height:1px;
  background-color: wheat;
  border:none;
  padding:0;margin:0;
}

.menuCat {
  padding: 0.3em;
}
</style>