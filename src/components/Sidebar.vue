<template>
  <div class="sidebar">
    <div class="header">
      <div class="header-item">
        <ul>
          <li><i class="iconfont icon-guanzhu"></i></li>
          <li><i class="iconfont icon-tixing"></i></li>
        </ul>
      </div>
      <div class="header-setting">
          <li><i class="iconfont icon-shezhi"></i></li>
      </div>
    </div>
    <div class="menu noise">
      <div class="menu-title title-text">
        <p>派瑞派对</p>
      </div>
      <ul class="menu-list">
        <router-link to="/">
          <li :class="[$route.name == 'Home' ? 'menu-item-choose noise' : '', 'menu-item']">首页</li>
        </router-link>
        <router-link to="/think">
          <li :class="[$route.name == 'Think' ? 'menu-item-choose noise' : '', 'menu-item']">灵感</li>
        </router-link>
      </ul>
      <ul class="menu-dblist">
        <router-link to="/forums/minecraft" :class="[$route.params.id == 'minecraft' ? 'menu-item-choose noise' : '', 'menu-dbitem']">
          <li>
            <img src="../assets/mc.jpeg" alt="">
            <p>我的世界</p>
          </li>
        </router-link>
        <li class="menu-dbitem">
          <img src="../assets/oustus.jpg" alt="">
          <p>Oustus</p>
        </li>
        <li class="menu-dbitem">
          <img src="../assets/rayark.jpg" alt="">
          <p>雷亚</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar'
}
</script>

<style scoped>
.sidebar{
  position: fixed;
  height: 100vh;
  z-index: 2;
  opacity: 0.5;
  transition: opacity 0.3s;
}
.sidebar:hover{
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  opacity: 1;
}
.header{
  position: relative;
  width: 4em; 
  height: 100vh;
  float: left;
  background: var(--bg-color);
}
.header-setting{
  position: absolute;
  width: 100%;
  bottom: 0;
}
.header li{
  width: 2.6em;
  height: 2.6em;
  line-height: 2.6em;
  border-radius: 50%;
  margin: 1em auto;
  background: var(--item-color);
  list-style: none;
  text-align: center;
}
.header li i{
  font-size: 1.25em;
  color: var(--text-color);
}
/* 菜单 */
.menu{
  width: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  box-sizing: border-box;
  float: left;
  height: 100vh;
  transition: width 0.3s;
  overflow: hidden;
}
.sidebar:hover .menu{
  width: 14em;
}
.menu a{
  text-decoration: none;
}
.menu-title{
  color: var(--text-color);
  font-weight: bold;
  letter-spacing: 0.2em;
  height: 4em;
  line-height: 4em;
  padding-left: 1em;
  width: 14em;
  box-sizing: border-box;
}
.menu-item{
  list-style: none;
  margin-bottom: 0.5em;
  padding: 0.5em;
  color: var(--text-color);
  border-radius: 0.2em;
  letter-spacing: 0.2em;
  transition: background 0.3s;
  cursor: pointer;
  background: var(--bg-color);
  text-shadow: 1px 0px 10px rgba(0, 0, 0, 0.2);
}
.menu-item:hover, .menu-dbitem:hover, .forum-tags li:hover{
  background: var(--hover-color);
}
.menu-item-choose{
  pointer-events: none;
  font-weight: bold;
  color: #fff !important;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  background-color: var(--main-color) !important;
}
.menu-list{
  width: 14em;
  padding: 0.5em;
  box-sizing: border-box;
  padding-bottom: 0;
}
.menu-dblist{
  display: flex;
  width: 14em;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.5em;
  padding-top: 0;
  box-sizing: border-box;
}
.menu-dbitem{
  list-style: none;
  width: calc(50% - 0.25em);
  text-align: center;
  height: 8em;
  padding-top: 1em;
  background: var(--bg-color);
  margin-bottom: 0.5em;
  border-radius: 0.2em;
  transition: background 0.3s;
  cursor: pointer;
  color: var(--text-color);
}
.menu-dbitem img{
  width: 4em;
  height: 4em;
  object-fit: cover;
  border-radius: 50%;
  border: 0.1em solid #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
.menu-dbitem p{
  margin-top: 0.5em;
  letter-spacing: 0.1em;
  text-shadow: 1px 0px 10px rgba(0, 0, 0, 0.2);
}
.icon-guanzhu{
  display: block;
  margin-top: 2px;
}
.icon-shezhi{
  display: block;
  margin-top: 1px;
}
</style>