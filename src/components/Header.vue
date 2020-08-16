<template>
  <div @mouseleave="closeBox" :class="[headerAbove ? 'header-above' : '', $route.name == 'Home' ? '' : 'fourm-header', 'header']">
    <div class="content">
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <input placeholder="搜索" type="text">
      </div>
      <div class="menu">
        <ul>
          <li>商城</li>
          <li>会员</li>
          <li>移动端</li>
          <li>游戏</li>
          <li>帮助</li>
        </ul>
      </div>
      <div @mouseenter="openBox" class="avatar">
        <img v-if="userInfo == undefined || userInfo.avatarUrl == '' || userInfo.avatarUrl == null" src="../assets/avatar.png" alt=""/>
        <img v-if="userInfo != undefined && userInfo.avatarUrl != '' && userInfo.avatarUrl != null" :src="userInfo.avatarUrl" alt=""/>
      </div>
      <!-- 登录框 -->
      <transition name="up">
      <div v-if="userBox" @mouseleave="closeBox" class="center">
        <!-- 登录框-游客 -->
        <div v-if="status == 'guest'" class="guest">
          <div class="login">
            <h2>登录派瑞派对</h2>
            <div class="login-form">
              <input v-model="loginForm.username" placeholder="用户名" type="text">
              <input v-model="loginForm.password" placeholder="密码" type="password">
            </div>
            <div class="login-btn">
              <span class="forget">忘记密码</span>
              <p @click="login" :class="[loginLoad ? 'btn-load' : '']" class="btn btn-login">登录</p>
            </div>
            <transition name="zoom">
            <div v-if="loginError" class="login-error">
              <img :src="require('../assets/wangjingze.jpg')" alt="">
              <p>{{loginErrorText}}</p>
            </div>
            </transition>
          </div>
          <div class="register">
            <span>还没有账号？</span>
            <p class="btn btn-reg">加入</p>
          </div>
        </div>
        <!-- 登录框-用户 -->
        <div v-if="status == 'login'" class="user">
          <h2>欢迎回来，{{userInfo.username}}</h2>
          <ul class="user-menu">
            <li><div></div><p>空间</p></li>
            <li><div></div><p>设置</p></li>
            <li><div></div><p>徽章</p></li>
            <li @click="exit"><div></div><p>注销</p></li>
          </ul>
        </div>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import IncludedHelper from '../helpers/includedHelper'

export default {
  name: 'header',
  data: function() {
    return {
      userBox: 0,
      loginLoad: 0,
      loginForm: {
        username: '',
        password: ''
      },
      loginError: 0,
      loginErrorText: '你的用户名或密码有问题'
    }
  },
  computed: {
    ...mapState([
      'headerAbove', 'status', 'userInfo'
    ])
  },
  methods: {
    ...mapMutations([
      'setData'
    ]),
    openBox: function() {
      this.userBox = 1
    },
    closeBox: function() {
      this.userBox = 0
    },
    login: function() {
      this.loginLoad = 1
      this.axios.post('/api/login', {
        data: {
          attributes: {
            username: this.loginForm.username,
            password: this.loginForm.password
          }
        }
      }).then((response) => {

        console.log(response.data)
        localStorage.setItem('access_token', response.data.data.attributes.access_token)
        localStorage.setItem('refresh_token', response.data.data.attributes.refresh_token)

        let includedInfo = new IncludedHelper(response.data.included);
        let tmpUserInfo = includedInfo.get('users.' + response.data.data.id);

        this.setData({
          key: 'userInfo',
          value: tmpUserInfo.attributes
        })

        this.setData({
          key: 'status',
          value: 'login'
        })

        this.loginLoad = 0

      }).catch((error) => {
        console.log(error)
        this.loginError = 1
        setTimeout(() => {
          this.loginLoad = 0
          this.loginError = 0
        },2000)
      })
    },
    exit: function() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      this.setData({
        key: 'userInfo',
        value: null
      })
      this.setData({
        key: 'status',
        value: 'guest'
      })
      this.loginForm.username = ''
      this.loginForm.password = ''
    },
    getAvatar: function() {
      return this.userInfo?.avatar ?? '../assets/avatar.png';
    }
  }
}
</script>

<style scoped>
.header{
  position: fixed;
  height: 4em;
  opacity: 0;
  z-index: 1;
  transition: background 0.3s, opacity 0.3s, box-shadow 0.3s;
  width: 100%;
  /*border-bottom: 1px solid #ddd;*/
}
.content{
  display: flex;
  align-items: center;
  width: 1200px;
  height: 4em;
  margin: 0 auto;
}
.fourm-header{
  background: rgba(255, 255, 255, 0.8);
}
.header:hover{
  opacity: 1;
  background: var(--base-color);
  box-shadow: 0px 5px 15px -10px rgba(0, 0, 0, 0.2);
}
.header-above{
  opacity: 1
}
.menu{
  margin-left: 0.5em;
  color: var(--text-color);
}
.menu li{
  list-style: none;
  display: inline-block;
  padding: 0.5em;
}
.search{
  position: relative;
}
.search input{
  padding: 0.5em;
  border: 0px;
  background: var(--bg-color);
  border-radius: 0.2em;
  outline: none;
  width: 20em;
}
.avatar{
  position: absolute;
  right: 0;
  width: 2.6em;
  height: 2.6em;
}
.avatar img{
  height: 2.6em;
  width: 2.6em;
  object-fit: cover;
  border-radius: 50%;
}
.icon-sousuo{
  position: absolute;
  margin-top: 5px;
  right: 5px;
  font-size: 1.25em !important;
  color: var(--text-color);
}
.center{
  position: absolute;
  right: 0;
  top: 4em;
  border-radius: 0.2em;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 0.2em;
  overflow: hidden;
}
.guest h2{
  font-size: 1em;
  font-weight: normal;
  color: var(--text-color);
}
.guest span{
  line-height: 2em;
}
.login{
  position: relative;
  background: var(--base-color);
  padding: 1em;
}
.login-form{
  margin: 1em 0;
}
.login-form input{
  display: block;
  padding: 0.5em;
  margin: 0.5em 0;
  border: none;
  background: var(--bg-color);
  border-radius: 0.2em;
  outline: none;
  width: 15em;
}
.forget{
  color: #f6a231;
}
.register{
  background: var(--bg-color);
  padding: 1em;
}
.register span{
  color: var(--text-color);
}
.btn{
  position: relative;
  padding: 0.3em 1em;
  border-radius: 0.2em;
  float: right;
  letter-spacing: 0.1em;
  text-shadow: 1px 0px 10px rgba(0, 0, 0, 0.2);
  transition: background 0.3s, opacity 0.3s, color 0.3s;
  cursor: pointer;
}
.btn::before{
  content: '';
  opacity: 0;
  transition: opacity 0.3s;
}
.btn-login{
  background: #50bd55;
  color: #fff;
}
.btn-reg{
  background: var(--main-color);
  color: #fff;
}
.login-error{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0.5em;
  box-sizing: border-box;
}
.login-error img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.2em;
}
.login-error p{
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
  position: relative;
  bottom: 3em;
  text-align: center;
  color: #fff;
  font-weight: bold;
  letter-spacing: 0.1em;
}
.user{
  background: var(--base-color);
  padding: 1em;
}
.user h2{
  font-size: 1em;
  font-weight: normal;
  color: var(--text-color);
}
.user-menu{
  display: flex;
  text-align: center;
  margin: 1em 0;
}
.user-menu li{
  width: 4em;
  margin-right: 0.5em;
  list-style: none;
}
.user-menu li:nth-child(4n + 4){
  margin-right: 0;
}
.user-menu div{
  height: 4em;
  background: var(--bg-color);
  border-radius: 0.2em;
}
.user-menu p{
  color: var(--text-color);
  margin-top: 0.2em;
}
</style>