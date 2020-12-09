<template>
  <div @mouseleave="maybeHideLoginBox" :class="[headerAbove ? 'header-above' : '', $route.name === 'Home' ? '' : 'fourm-header', 'header']">
    <div class="content">
      <img style="width: 5%;margin-left: -5.5%;margin-right: 1em;" src="https://res.cloudinary.com/paracraft/image/upload/v1607424052/sourcelay/SourceLayLogo/SourceLayLOGO4.png">
      <div v-if="$route.name !== 'Search'" class="search">
        <i class="iconfont icon-sousuo" @click="goSearch"></i>
        <form>
          <input type="text" style="display: none;">
          <input @keyup.enter="goSearch" v-model="search" placeholder="搜索" type="text">
        </form>
      </div>
      <div class="menu">
        <ul>
          <li
              :class="$route.name == 'Home' ? 'currentMenuItem' : 'normalMenuItem'"
              @click="$route.name == 'Home' ? '' : $router.push('/')">
            首页</li>
          <li
              :class="$route.path == '/forums/topics/9' ? 'currentMenuItem' : 'normalMenuItem'"
              @click="$route.path == '/forums/topics/9' ? '' : $router.push('/forums/topics/9')">
            指南</li>
          <li
              :class="$route.name == 'Files' ? 'currentMenuItem' : 'normalMenuItem'"
              @click="$route.name == 'Files' ? '' : $router.push('/files')">
            我的文件</li>
          <li
              :class="$route.name == 'ShareStream' ? 'currentMenuItem' : 'normalMenuItem'"
              @click="$route.name == 'ShareStream' ? '' : $router.push('/stream')">
            分享大厅</li>
        </ul>
      </div>
      <div @mouseenter="showLoginBox" class="avatar">
        <!-- TODO 改成更优雅的版本 -->
        <img v-if="userInfo === undefined || userInfo.avatarUrl === '' || userInfo.avatarUrl == null" src="../assets/avatar.png" alt=""/>
        <img v-if="userInfo !== undefined && userInfo.avatarUrl !== '' && userInfo.avatarUrl != null" :src="userInfo.avatarUrl" alt=""/>
      </div>
      <!-- 登录框 -->
      <div @mouseleave="maybeHideLoginBox" id="login-box" class="center" :class="{'mouse-on': userBox}">
        <!-- 登录框-游客 -->
        <div v-if="status === 'guest' && page === 1" class="guest">
          <div class="login">
            <h2>登录 SourceLay</h2>
            <div class="login-form">
              <input v-model="loginForm.username" placeholder="用户名" @keydown.enter="login" type="text">
              <input v-model="loginForm.password" placeholder="密码" @keydown.enter="login" type="password">
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
            <p class="btn btn-reg" @click="onRegisterClick()">加入</p>
          </div>
        </div>

        <div v-if="status === 'guest'  && page === 2" class="guest">
          <div class="login">
            <h2>注册SourceLay</h2>
            <div class="login-form">
              <input v-model="loginForm.username" placeholder="用户名" type="text">
              <input v-model="loginForm.password" placeholder="密码" type="password">
              <input v-model="loginForm.confirmPassword" placeholder="确认密码" type="password">
            </div>
            <div class="login-btn">
              <span class="forget">&ZeroWidthSpace;</span>
              <p @click="register" :class="[loginLoad ? 'btn-load' : '']" class="btn btn-login">注册</p>
            </div>
            <transition name="zoom">
            <div v-if="loginError" class="login-error">
              <img :src="require('../assets/wangjingze.jpg')" alt="">
              <p>{{loginErrorText}}</p>
            </div>
            </transition>
          </div>
          <div class="register">
            <span>已有账号？</span>
            <p class="btn btn-reg" @click="onLoginClick()">登陆</p>
          </div>
        </div>

        <!-- 登录框-用户 -->
        <div v-if="status === 'login'" class="user">
          <h2>欢迎回来，{{userInfo.username}}</h2>
          <ul class="user-menu">
            <li>
              <div><img :src="require('../assets/空间.svg')"></div>
              <p>空间</p>
            </li>
            <li @click="setUserInfoVisible=true">
              <div><img :src="require('../assets/设置.svg')"></div>
              <p>设置</p>
            </li>
            <li>
              <div><img :src="require('../assets/徽章.svg')"></div>
              <p>徽章</p>
            </li>
            <li @click="exit">
              <div><img :src="require('../assets/注销.svg')"></div>
              <p>注销</p></li>
          </ul>
        </div>
      </div>
    </div>
    <el-dialog
        title="设置"
        width="40%"
        :visible="setUserInfoVisible"
        :modal-append-to-body='false'
        @close="setUserInfoVisible=false">
      <SetUserInfo @handleSetUserInfo="handleSetUserInfo"></SetUserInfo>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import IncludedHelper from '../helpers/includedHelper'
import SetUserInfo from "@/components/SetUserInfo";
import { dzq } from '@/public'
import store from '../store/index'
import {globalSuccessNotify, globalErrorNotify} from "@/helpers/globalNotify";

export default {
  name: 'header',
  components: {SetUserInfo},
  data: function() {
    return {
      setUserInfoVisible:false,
      page: 1,
      userBox: false,
      loginLoad: 0,
      loginForm: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      loginError: 0,
      loginErrorText: '你的用户名或密码有问题',
      search: '',
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
    showLoginBox: function() {
      this.userBox = true
    },
    maybeHideLoginBox: function() {
      this.userBox = false
    },
    register: function() {
      this.loginLoad = 1

      if (this.loginForm.username === '') {
        this.loginErrorText= '用户名不得为空'
        this.loginError = 1
        setTimeout(() => {
          this.loginLoad = 0
          this.loginError = 0
        },2000)
        return
      }

      if (this.loginForm.password !== this.loginForm.confirmPassword) {
        this.loginErrorText= '你输入的两次密码不一样'
        this.loginError = 1
        setTimeout(() => {
          this.loginLoad = 0
          this.loginError = 0
        },2000)
        return
      }

      if (this.loginForm.confirmPassword.length < 6) {
        this.loginErrorText= '你输入的密码太短了。'
        this.loginError = 1
        setTimeout(() => {
          this.loginLoad = 0
          this.loginError = 0
        },2000)
        return
      }

      this.axios.post('/api/register', {
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

        store.commit('setData', {
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
        this.loginErrorText= '注册过程出问题了'
        this.loginError = 1
        setTimeout(() => {
          this.loginLoad = 0
          this.loginError = 0
        },2000)
      })

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

        store.commit('setData', {
          key: 'userInfo',
          value: tmpUserInfo.attributes
        })

        this.setData({
          key: 'status',
          value: 'login'
        })

        this.loginLoad = 0

        location.reload();//登录成功时刷新
      }).catch((error) => {
        console.log(error)
        this.loginErrorText= '你的用户名或密码有问题'
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
      location.reload();//注銷刷新
    },
    getAvatar: function() {
      return this.userInfo?.avatar ?? '../assets/avatar.png';
    },
    onRegisterClick: function(){
      this.page = 2;
    },
    onLoginClick: function(){
      this.page = 1;
    },
    goSearch () {
      this.$router.push({
        path: '/search',
        query: {
          q: this.search
        }
      })
    },
    // 处理设置用户信息的返回值
    handleSetUserInfo: function (ret, callback) {
      // 返回值格式：
      // ruleForm: {
      //   oldPassword: '',
      //   newPassword: '',
      //   confirmNewPassword: '',
      //   oldPayPassword: '',
      //   payPassword: '',
      //   confirmPayPassword: '',
      //   email: ''
      // },
      console.log(ret);

      let data = {};
      if (ret.oldPassword !== '') data.password = ret.oldPassword;
      if (ret.newPassword !== '') data.newPassword = ret.newPassword;
      if (ret.confirmNewPassword !== '') data.password_confirmation = ret.confirmNewPassword;
      if (ret.email !== this.userInfo.email) data.email = ret.email;

      if (ret.payPassword !== '') data.payPassword = ret.payPassword;
      if (ret.confirmPayPassword !== '') data.pay_password_confirmation = ret.confirmPayPassword;

      if (Object.keys(data).length === 0) {
        globalErrorNotify(this, "表单不得为空。");
        return;
      }

      if (this.userInfo.hasPayPassword && ret.oldPayPassword !== '') {
        this.axios.post(
          dzq({
            name: 'users/pay-password/reset'
          }),
          {
            data: {
              attributes: {
                pay_password: ret.payPassword
              }
            }
          }
        ).then((response) => {
          console.log(response.data)
          data.pay_password_token = response.data.data.attributes.sessionId;
          this.updateProfile(data, callback);
        }).catch((err) => {
          globalErrorNotify(this, err);

          if (err.response) {
            console.log(err.response)
          }
        })
      } else {
        this.updateProfile(data, callback);
      }
    },
    updateProfile: function(data, callback) {
      this.axios.patch(
        dzq({
          name: 'users/' + this.userInfo.id
        }),
        {
          data: {
            attributes: data
          }
        }
      ).then((response) => {
        console.log(response.data)

        this.setData({
          key: 'userInfo',
          value: response.data.data.attributes
        })

        store.commit('setData', {
          key: 'userInfo',
          value: response.data.data.attributes
        })

        callback(response.data)
        globalSuccessNotify(this, "修改成功");
      }).catch((err) => {
          globalErrorNotify(this, err);
      })
    }
  },
  watch: {
    $route() {
      this.search = ''
    }
  }
}
</script>

<style scoped>
.header{
  position: fixed;
  height: 4em;
  opacity: 0;
  z-index: 2;
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
  max-width: calc(100% - 9em);
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
  color: var(--text-color);
}
.menu li{
  list-style: none;
  display: inline-block;
  padding: 0.5em;
}
.search{
  position: relative;
  margin-right: 0.5em;
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
.icon-sousuo:hover{
  cursor: pointer;
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
#login-box {
  transition: transform 0.3s, opacity 0.3s, visibility 0.3s;
  visibility: hidden;
  opacity: 0;
  transform: translateY(50px);
  transition-delay: 0.3s;
  will-change: transform, opacity, visibility;
}
#login-box.mouse-on,
#login-box:focus,
#login-box:hover,
#login-box:focus-within {
  visibility: visible;
  opacity: 1;
  transform: none;
  transition-delay: 0s;
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
.normalMenuItem {
  cursor: pointer;
}
.currentMenuItem {
  color: red;
}
ul>li>div>img{
  width: 100%;
}
</style>
