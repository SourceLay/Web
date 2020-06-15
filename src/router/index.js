import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Forum from '../views/Forum.vue'
import Topic from '../views/Topic.vue'
import store from '../store/index'
import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css' 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Test.vue')
  },
  {
    path: '/forums/:id',
    name: 'Forum',
    component: Forum
  },
  {
    path: '/forums/topics/:id',
    name: 'Topic',
    component: Topic
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由守卫
router.beforeEach((to, from, next) => {
  nprogress.start()
  //初始化信息
  if(from.name == null){
    //验证登录状态
    if(localStorage.getItem('access_token')){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
      store.commit('setData', {
        key: 'status',
        value: 'login'
      })
    }else{
      store.commit('setData', {
        key: 'status',
        value: 'guest'
      })
    }
    //获取论坛信息
    axios.get('/api/forum').then((response) => {
      console.log('获取论坛信息')
      let siteInfo = response.data.data.attributes
      localStorage.setItem('site_info', JSON.stringify(siteInfo))
      return siteInfo
    }).then((siteInfo) => {
      //获取登录用户信息
      if(store.state.status == 'login'){
        console.log("获取登录信息")
        axios.get('/api/users/' + siteInfo.user.groups[0].pivot.user_id).then((response) => {
          store.commit('setData', {
            key: 'userInfo',
            value: response.data.data.attributes
          })
        })
      }
    }).then(() => {
      //获取板块信息
      axios.get('/api/categories').then((response) => {
        console.log("获取板块信息")
        store.commit('setData', {
          key: 'forumInfo',
          value: response.data.data
        })
        next()
      })
    })
  }else{
    next()
  }
})
router.afterEach(() => {
  nprogress.done()
  document.documentElement.scrollTo(0,0)
})

export default router
