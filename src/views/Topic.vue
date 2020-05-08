<template>
<!--
  <div>
    <p>{{$route.params.id}}{{$bus.$data.contentWidth}}</p>
  </div>
-->
<div v-if="post" class="para-content">
  <div class="banner">
    <img src="../assets/mc.jpg" alt="">
    <div :class="['banner-cover','tag', getPostTag(post.relationships.user.data.id, post.attributes.title, post.attributes.isEssence)]"></div>
    <div class="intro">
      <h1 class="title" v-html="getPostTitle(post.attributes.title)"></h1>
      <p>发表于 1 天前</p>
    </div>
  </div>
  <div class="forum-content">
    <ul class="posts">
      <!-- 首帖 -->
      <li class="post">
        <img class="avatar" src="../assets/avatar.png" alt="">
        <div class="post-body">
          <div class="post-header">
            <p class="user-name">陆陆侠</p>
            <p class="post-time">一天前</p>
            <p class="post-floor">#1</p>
          </div>
          <div class="post-main">
            <div v-html="getContent(included['posts.' + post.relationships.firstPost.data.id].attributes.content)" class="post-content bbcode">
            </div>
          </div>
          <div class="post-bottom">
            <i class="iconfont icon-guanzhu"></i>
            <p class="post-likedUser" v-html="getLikedUser(included['posts.' + post.relationships.firstPost.data.id].relationships.likedUsers.data)"></p>
            <p class="post-reply">回复#1</p>
          </div>
        </div>
      </li>
      <!-- 回复 -->
      <li v-for="(reply, index) in post.relationships.posts.data" :key="reply.id" class="post">
        <img class="avatar" src="../assets/avatar.png" alt="">
        <div class="post-body">
          <div class="post-header">
            <p class="user-name">陆陆侠</p>
            <p class="post-time">一天前</p>
            <p class="post-floor">#{{index + 2}}</p>
          </div>
          <div class="post-main">
            <div class="post-content">
              {{included['posts.' + reply.id].attributes.content}}
            </div>
          </div>
          <div class="post-bottom">
            <i class="iconfont icon-guanzhu"></i>
            <p class="post-likedUser" v-html="getLikedUser(included['posts.' + reply.id].relationships.likedUsers.data)"></p>
            <p class="post-reply">回复#{{index + 2}}</p>
          </div>
        </div>
      </li>
      <!-- <li class="post">
        <img class="avatar" src="../assets/avatar.png" alt="">
        <div class="post-body">
          <div class="post-header">
            <p class="user-name">陆陆侠</p>
            <p class="post-time">一天前</p>
            <p class="post-floor">#1</p>
          </div>
          <div class="post-main">
            <div class="post-content">
              <p>回帖内容</p>
            </div>
          </div>
          <div class="post-bottom">
            <p class="post-reply">回复#1</p>
          </div>
        </div>
      </li> -->
      <li :class="[fixedEditor ? 'fixed-editor' : '']">
        <Editor/>
      </li>
    </ul>
    <div class="post-sidebar">
      <div class="post-sidebar-content">
        <p @click="showEditor" class="btn btn-reply">添加回复</p>
        <div class="post-seekbar">
          <p :style="{opacity: inBar, transform: 'translate(0, ' + seekbarY + 'px)'}" class="bar-tip">{{seekbarFloor}}</p>
          <p><i class="iconfont icon-shang"></i>主楼</p>
          <div @click="jumpFloor" @mousemove="showBar" @mouseleave="closeBar" class="bar">
            <div :style="{height: seekbarPercent + '%'}" class="now-bar"></div>
          </div>
          <p><i class="iconfont icon-shang icon-xia"></i>最新楼层</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Editor from './../components/Editor.vue'
import axios from 'axios'
import XBBCODE from 'xbbcode-parser'
import { mapState, mapMutations } from 'vuex'
import { getPostTitle, getPostTag, getTime } from './../public.js'
export default {
  name: 'forum',
  data: function() {
    return {
      inBar: 0,
      allFloor: 20,
      seekbarPercent: 0,
      seekbarY: 0,
      seekbarFloor: 1,
      post: null,
      included: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    axios.get('/api/threads/' + to.params.id + '?filter[isDeleted]=no&include=user,firstPost,posts,posts.user,user.groups,category,firstPost.likedUsers,posts.likedUsers').then((response) => {
      next((vm) => {
        vm.getData(response.data)
      })
    })
  },
  components: {
    Editor
  },
  computed: {
    ...mapState([
      'fixedEditor'
    ])
  },
  methods: {
    ...mapMutations([
      'setData'
    ]),
    getPostTitle,
    getPostTag,
    getTime,
    getLikedUser(users) {
      let list = ''
      if(users.length <= 3){
        users.forEach((item) => {
          list += '<span>' + this.included['users.' + item.id].attributes.username + '</span>'
        })
        return list += '觉得很赞'
      }else{
        let i = 0
        while(i < 3){
          list += '<span>' + this.included['users.' + users[i].id].attributes.username + '</span>'
          i++
        }
        return list += '<span>等人</span>觉得很赞'
      }
    },
    showEditor: function() {
      this.setData({
        key: 'fixedEditor',
        value: 1
      })
    },
    showBar: function(e) {
      this.inBar = 1
      this.seekbarY = e.offsetY
      this.seekbarFloor = parseInt((e.offsetY / 240) * this.allFloor) + 1
    },
    closeBar: function() {
      this.inBar = 0
    },
    jumpFloor: function() {
      this.seekbarPercent = this.seekbarFloor / this.allFloor * 100
    },
    getData: function(post) {
      this.post = post.data
      post.included.forEach((item) => {
        this.included[item.type + '.' + item.id] = item
      })
      this.allFloor = this.post.attributes.postCount
      this.seekbarPercent = 1 / this.allFloor * 100
    },
    getContent(content) {
      return XBBCODE.process({
        text: content,
        removeMisalignedTags: false,
        addInLineBreaks: true
      }).html
    }
  }
}
</script>

<style scoped>

/* 论坛-banner */
.banner{
  display: flex;
  align-items: center;
  position: relative;
  height: 16em;
  box-sizing: border-box;
}
.banner img{
  position: absolute;
  height: 16em;
  width: 100%;
  object-fit: cover;
}
.banner-cover{
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(to right, rgba(0,0,0,0.3) 0%,rgba(0,0,0,0) 100%);
}
.intro{
  position: relative;
  width: 1200px;
  color: #fff;
  text-shadow: 1px 0px 10px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.2em;
  margin: 0 auto;
  margin-top: 4em;
}
.intro h1{
  font-weight: lighter;
}
.intro p{
  color: #ddd;
  margin-top: 0.1em;
}
.title >>>div{
  font-size: 0.5em;
}
.title >>>span{
  letter-spacing: 0;
  margin-right: 0.2em;
}
/* 论坛-主题Tag */
.tag::before{
  color: #fff;
  bottom: 0;
  font-size: 3em;
  font-style: italic;
  text-align: right;
  width: 1200px;
  margin-top: 1em;
  letter-spacing: 0.2em;
}
.tag-default::before{
  content: '';
}
.tag-notice{
  background: linear-gradient(to right, rgb(49, 121, 219) 0%,rgb(49, 121, 219, 0.8) 100%);
}
.tag-notice::before{
  content: '公告';
}
.tag-activity{
  background: linear-gradient(to right, rgb(78, 188, 85) 0%,rgb(78, 188, 85, 0.8) 100%);
}
.tag-activity::before{
  content: '活动';
}
.tag-rule{
  background: linear-gradient(to right, rgb(172, 72, 162) 0%,rgb(172, 72, 162, 0.8) 100%);
}
.tag-rule::before{
  content: '版规';
}
.tag-star{
  background: linear-gradient(to right, rgba(246, 162, 49, 1) 0%,rgba(246, 162, 49, 0.8) 100%);
}
.tag-star::before{
  content: '精华';
}
/* 论坛-内容 */
.forum-content{
  display: flex;
  width: 1200px;
  margin: 0 auto;
}
/* 论坛-帖子 */
.posts{
  position: relative;
  width: 960px;
  margin: 1em 0;
  background: var(--base-color);
}
.posts li{
  display: flex;
  list-style: none;
}
.avatar{
  width: 3.5em;
  height: 3.5em;
  object-fit: cover;
  border-radius: 50%;
  border: 0.1em solid #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin: 1em;
  margin-left: 0;
}
.post-body{
  display: flex;
  flex: 1;
  flex-direction: column;
  border-bottom: 2px dashed var(--line-color);
  margin: 1em 0;
}
.post:nth-last-child(2) .post-body{
  border-bottom: 0;
}
.post-header{
  position: relative;
  margin-bottom: 0.5em;
}
.user-name{
  display: inline-block;
  letter-spacing: 0.1em;
  text-shadow: 1px 0px 10px rgba(0, 0, 0, 0.2);
  color: var(--text-color);
  margin-right: 1em;
}
.post-time{
  color: var(--main-color);
  font-size: 0.9em;
  display: inline-block;
  opacity: 0.8;
}
.post-floor{
  position: absolute;
  right: 0;
  top: 0;
  font-weight: bold;
  font-size: 1.5em;
  opacity: 0.2;
}
.post-main{
  color: var(--text-color);
  margin: 0.5em 0;
}
.post-bottom{
  margin: 0.5em 0;
  font-size: 0.9em;
  opacity: 0.8;
  color: var(--text-color);
}
.icon-guanzhu::before{
  font-weight: bold;
  position: relative;
  top: 0.1em;
  margin-right: 0.5em;
  color: var(--main-color);
}
.post-likedUser{
  display: inline-block;
}
.post-likedUser >>>span{
  margin-right: 0.5em;
}
.post-reply{
  float: right;
  transition: opacity 0.3s;
  opacity: 0;
}
.post:hover .post-reply{
  opacity: 1;
}

.post-sidebar{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
  margin-top: 2em;
}
.post-sidebar-content{
  position: sticky;
  top: 6em;
}
.btn-reply{
  background: var(--main-color);
  color: #fff;
  padding: 0.5em 1.5em;
}
.post-seekbar{
  width: 1em;
  margin-top: 1em;
  margin-left: -0.2em;
  color: var(--text-color);
  text-align: center;
}
.post-seekbar i{
  margin-right: 0.5em;
}
.post-seekbar p{
  white-space: nowrap;
}
.post-seekbar:hover .bar, .post-seekbar:hover .now-bar{
  width: 0.8em;
}
.bar:hover .bar-tip{
  opacity: 1;
}
.bar{
  height: 15em;
  width: 0.2em;
  background: var(--bg-color);
  margin: 0.5em auto;
  border-radius: 0.2em;
  overflow: hidden;
  transition: width 0.1s;
}
.now-bar{
  background: var(--main-color);
  height: 50%;
  width: 0.2em;
  transition: width 0.1s, height 0.3s;
}
.bar-tip{
  position: absolute;
  margin-left: 1.5em;
  margin-top: 1em;
  background: var(--main-color);
  color: #fff;
  padding: 0.2em 0.5em;
  border-radius: 0.2em;
  opacity: 0;
  transition: opacity 0.3s;
}
.icon-xia{
  transform: rotate(180deg);
  display: inline-block;
}
.editor{
  margin-top: 1.5em;
}
.fixed-editor{
  position: sticky;
  bottom: 1em;
  z-index: 1;
}
</style>