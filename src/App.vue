<template>
  <div id="app">
    <Sidebar/>
    <div class="content">
      <TopHeader/>
      <!-- <transition name="fade"> -->
        <router-view/>
      <!-- </transition> -->
      <Foot/>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import TopHeader from './components/Header.vue'
import { _throttle } from './public'
import Foot from "@/components/Foot";
export default {
  components: {
    Foot,
    Sidebar,
    TopHeader
  },
  methods: {
    contentScroll: _throttle(function() {
      let body = document.documentElement
      if(body.scrollTop > 60){
        this.$store.commit('setData', {
          key: 'headerAbove',
          value: 0
        })
      }else{
        this.$store.commit('setData', {
          key: 'headerAbove',
          value: 1
        })
      }
    }, 200)
  },
  created() {
    window.addEventListener('scroll', this.contentScroll, true)
    document.body.classList.add(this.$store.state.colorTheme + '-theme');
  }
}
</script>

<style>
@import url(//at.alicdn.com/t/font_1504126_mhb3f13qmk.css);
@import url(xbbcode.css);
*{
  padding: 0;
  margin: 0;
}
*, *::after, *::before{
  position: relative;
  box-sizing: border-box;
}
html{
  font-size: 100%;
}
html, body{
  width: 100%;
  height: 100%;
}
/* html{
  scroll-behavior: smooth;
} */
body::-webkit-scrollbar {
  width: 6px;
  background-color: #eee;
}
body::-webkit-scrollbar-thumb {
  background: #e3527d;
  background-clip: padding-box;
  min-height: 10px;
}
.light-theme{
  --base-color: #fff;
  --bg-color: #eee;
  --item-color: #e5e5e5;
  --line-color: #ddd;
  --hover-color: #d6d6d6;
  --text-color: #505050;
  --dark-color: #333;
  --main-color: #e3527d;
  --main-color-active: rgba(227, 82, 125, 0.9);
}
.dark-theme{
  background: #000;
  --base-color: #000;
  --bg-color: #111;
  --item-color: #222;
  --line-color: #222;
  --hover-color: #222;
  --text-color: #fff;
  --dark-color: #fff;
  --main-color: #e3527d;
  --main-color-active: rgba(227, 82, 125, 0.9);
}
.dark-theme .fourm-header{
  background: rgba(0, 0, 0, 0.8);
}
#app{
  display: flex;

}
.btn{
  padding: 0.3em 1em;
  border-radius: 0.2em;
  letter-spacing: 0.1em;
  text-shadow: 1px 0px 10px rgba(0, 0, 0, 0.2);
  transition: background 0.3s;
  cursor: pointer;
}
.btn-load{
  opacity: 0.5;
  color: transparent !important;
  cursor: default !important;
}
.btn-load::before{
  content: "";
  background: url('/img/loading.26fed9aa.svg');
  display: block;
  height: 1.25em;
  width: 1.25em;
  background-size: 100%;
  position: absolute;
  left: calc(50% - 0.625em);
  animation: btn-load 1s linear infinite;
  opacity: 1 !important;
}
@keyframes btn-load{
  from {transform: rotate(0deg);}
  to   {transform: rotate(360deg);}
}
.icon{
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.content{
  position: relative;
  width: 100%;
}
.para-content{
  margin-left: 5em;
  width: calc(100% - 5em);
  background: var(--base-color);
  box-sizing: border-box;
}
.noise{
  background-image: url(data:image/png;base64,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) !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
  position: absolute;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.up-enter-active, .up-leave-active {
  transition: opacity 0.3s, transform 0.3s;
  position: absolute;
}
.up-enter, .up-leave-to{
  transform: translate(0, 3em);
  opacity: 0;
}
.zoom-enter-active, .zoom-leave-active {
  transition: opacity 0.3s, transform 0.3s;
  position: absolute;
}
.zoom-enter, .zoom-leave-to{
  transform: scale(0.6);
  opacity: 0;
}
.tippy-box[data-theme~='user-card']{
  font-size: 1em;
  background: none;
}
.tippy-box[data-theme~='user-card'] .tippy-content{
  padding: 0;
}
</style>
