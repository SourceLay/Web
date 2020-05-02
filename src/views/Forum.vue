<template>
<!--
  <div>
    <p>{{$route.params.id}}{{$bus.$data.contentWidth}}</p>
  </div>
-->
<div class="para-content">
  <transition name="up">
    <Editor v-if="showEditor"/>
  </transition>
  <div class="banner">
    <img src="../assets/mc.jpg" alt="">
    <div class="banner-cover"></div>
    <div class="intro">
      <h1>{{forumInfo[$route.params.id - 1].attributes.name}}</h1>
      <p>{{forumInfo[$route.params.id - 1].attributes.description}}</p>
    </div>
  </div>
  <div class="forum-content">
    <ul class="tags">
      <li class="menu-item-choose">全部</li>
      <li>生存</li>
      <li>建筑</li>
      <li>模组</li>
      <li class="sort">排序方式：最新</li>
      <li class="stat">
        <span class="stat-key">今日</span>
        <span class="stat-value">0</span>
        <span class="stat-key">主题</span>
        <span class="stat-value">0</span>
        <span class="stat-key">帖子</span>
        <span class="stat-value">0</span>
      </li>
    </ul>
    <ul class="posts">
      <h2 class="part-title">置顶主题</h2>
      <li v-for="post in topPost" :key="post.id" class="post">
        <div class="post-tag">
          <p :class="['tag', getPostTag(post.relationships.user.data.id, post.attributes.title, post.attributes.isEssence)]"></p>
        </div>
        <div class="post-title">
          <h2 v-html="getPostTitle(post.attributes.title)"></h2>
          <p>{{included['posts.' + post.relationships.firstPost.data.id].attributes.content}}</p>
        </div>
        <div class="post-other">
          <div class="post-info">
            <p>作者：{{included['users.' + post.relationships.user.data.id].attributes.username}}</p>
            <p>{{post.attributes.postCount}} 回复 / {{post.attributes.viewCount}} 浏览</p>
          </div>
          <div class="post-time">
            <p>最后一次回复：{{included['users.' + post.relationships.lastPostedUser.data.id].attributes.username}}</p>
            <p v-html="getTime(post.attributes.updatedAt)"></p>
          </div>
        </div>
      </li>
      <img v-if="topPost == 0" class="empty" src="../assets/empty.png" alt="">
    </ul>
    <ul class="posts">
      <h2 class="part-title">主题</h2>
      <span @click="openEditor" class="post-btn btn">发表新主题</span>
      <li v-for="post in post" :key="post.id" class="post">
        <div class="post-tag">
          <p :class="['tag', getPostTag(post.relationships.user.data.id, post.attributes.title, post.attributes.isEssence)]"></p>
        </div>
        <div class="post-title">
          <h2 v-html="getPostTitle(post.attributes.title)"></h2>
          <p>{{included['posts.' + post.relationships.firstPost.data.id].attributes.content}}</p>
        </div>
        <div class="post-other">
          <div class="post-info">
            <p>作者：{{included['users.' + post.relationships.user.data.id].attributes.username}}</p>
            <p>{{post.attributes.postCount}} 回复 / {{post.attributes.viewCount}} 浏览</p>
          </div>
          <div class="post-time">
            <p>最后一次回复：{{included['users.' + post.relationships.lastPostedUser.data.id].attributes.username}}</p>
            <p v-html="getTime(post.attributes.updatedAt)"></p>
          </div>
        </div>
      </li>
      <img v-if="post == 0" class="empty" src="../assets/empty.png" alt="">
    </ul>
    <ul class="pages">
      <li class="pages-btn">上一页</li>
      <li class="pages-active">1</li>
      <li>2</li>
      <li>3</li>
      <li>…</li>
      <li>9</li>
      <li class="pages-btn">下一页</li>
    </ul>
  </div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Editor from './../components/Editor.vue'
import axios from 'axios'
export default {
  name: 'forum',
  components: {
    Editor
  },
  data() {
    return {
      topPost: null,
      post: null,
      included: {},
    }
  },
  beforeRouteEnter(to, from, next) {
    let top = null
    let post = null
    axios.get('/api/threads?include=user,firstPost,lastPostedUser,user.groups&filter[type]=1&filter[isSticky]=yes&filter[categoryId]=' + to.params.id).then((response) => {
      top = response.data
      axios.get('/api/threads?include=user,firstPost,lastPostedUser,user.groups&filter[type]=1&filter[isSticky]=no&filter[categoryId]=' + to.params.id).then((response) => {
        post = response.data
        next((vm) => {
          vm.getPost(top, post)
        })
      })
    })
  },
  beforeRouteUpdate(to, from, next) {
    console.log('同页面跳转')
    next()
  },
  computed: {
    ...mapState([
      'showEditor', 'forumInfo'
    ])
  },
  methods: {
    ...mapMutations([
      'setData'
    ]),
    getTime(time) {
      let second = new Date() - new Date(time)
      if(second < 10000){
        return '刚刚'
      }
      if(second < 3600000){
        return new Date(time).getMinutes() + '分钟前'
      }else if(second < 86400000){
        return new Date(time).getHours() + '小时前'
      }else if(second < 5184000000){
        return new Date(time).getMonth() + '个月前'
      }else if(second < 31622400000){
        return new Date().getFullYear() - new Date().getFullYear() + '年前'
      }
    },
    getPostTag(id, title, star) {
      let tag = title.slice(0, 4)
      if(this.included['users.' + id].relationships.groups.data[0].id == 1 && ['[公告]', '[活动]', '[版规]'].includes(tag)){
        if(tag == '[公告]'){
          return 'tag-notice'
        }else if(tag == '[活动]'){
          return 'tag-activity'
        }else if(tag == '[版规]'){
          return 'tag-rule'
        }
      }else if(star){
        return 'tag-star'
      }else{
        return 'tag-default'
      }
    },
    getPostTitle(title) {
      if(['[公告]', '[活动]', '[版规]'].includes(title.slice(0, 4))){
        return title.slice(4)
      }else{
        let s = title;
        let check_status = false;
        let check_str = '';
        let tags = [];
        let last_valid = 0;
        let i = 0;
        for (i = 0; i < s.length; i++) {
          let c = s[i];
          if (check_status) {
            check_str = check_str + c;
            if (c == ']') {
              if (!['[公告]', '[活动]', '[版规]'].includes(check_str)) {	// 这里可以判断一下 check_str 是否合法，如果
                tags.push(check_str);
                check_status = false;
                last_valid = i + 1;
              } else {
                break;
              }
            } else if (c == '[') {	// 这里表示标签中不允许出现的符号
              break;
            }
          } else {
            if (c == '[') {
              check_str = '[';
              check_status = true;
            }
            else break;
          }
        }
        let final = ''
        tags.forEach(tag => {
          final += "<span>" + tag + "</span>"
        })
        return final + s.substring(last_valid)
      }
    },
    openEditor() {
      this.setData({
        key: 'showEditor',
        value: 1
      })
    },
    getPost(top, post) {
      this.topPost = top.data
      this.post = post.data
      if(typeof top.included != 'undefined'){
        top.included.forEach((item) => {
          this.included[item.type + '.' + item.id] = item
        })
      }
      if(typeof post.included != 'undefined'){
        post.included.forEach((item) => {
          this.included[item.type + '.' + item.id] = item
        })
      }
    }
  }
}
</script>

<style scoped>
/* 论坛-banner */
.banner{
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
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(to right, rgba(0,0,0,0.3) 0%,rgba(0,0,0,0) 100%);
}
.intro{
  position: relative;
  width: 1200px;
  top: 7em;
  color: #fff;
  text-shadow: 1px 0px 10px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.2em;
  margin: 0 auto;
}
.intro h1{
  font-weight: lighter;
}
.intro p{
  color: #ddd;
  margin-top: 0.1em;
}
/* 论坛-内容 */
.forum-content{
  padding: 1em 2em;
  width: 1200px;
  margin: 0 auto;
}
/* 论坛-Tag */
.tags li{
  list-style: none;
  display: inline-block;
  padding: 0.5em;
  background: var(--bg-color);
  color: var(--text-color);
  border-radius: 0.2em;
  letter-spacing: 0.1em;
  text-shadow: 1px 0px 10px rgba(0, 0, 0, 0.2);
  transition: background 0.3s;
  cursor: pointer;
  margin-right: 0.2em;
}
.menu-item-choose {
  pointer-events: none;
  font-weight: bold;
  color: #fff !important;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  background: var(--main-color) !important;
}
.sort{
  margin-left: 1em;
}
.stat{
  margin-right: 0 !important;
  float: right;
}
.stat-key{
  font-weight: bold;
}
.stat-value{
  margin: 0.3em;
}
/* 论坛-帖子 */
.posts{
  background: var(--bg-color);
  padding: 1em;
  margin: 1em 0;
  border-radius: 0.2em;
}
.part-title{
  display: inline-block;
  font-size: 1.25em;
  color: var(--text-color);
  margin-left: 0.5em;
  margin-bottom: 0.5em;
  letter-spacing: 0.2em;
  font-weight: normal;
}
.part-title::after{
  content: "";
  width: calc(100% - 0.2em);
  height: 0.11em;
  background: var(--main-color);
  display: block;
}
.empty{
  display: block;
  width: 15em;
  opacity: 0.5;
  margin: 0 auto;
}
.post{
  display: flex;
  align-items: center;
  list-style: none;
  border-radius: 0.2em;
  font-size: 0.8em;
  padding: 0.5em 0;
  color: var(--text-color);
  position: relative;
  transition: all 0.3s;
  cursor: pointer;
}
.post:hover{
  background: var(--item-color);
}
.post div{
  display: inline-block;
}
.post-title{
  width: 65em;
}
.post-title h2{
  font-weight: normal;
  font-size: 1.4em;
}
.post-title p{
  opacity: 0.6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.post-title >>>span{
  font-size: 0.8em;
  margin-right: 0.2em;
}
.post-title >>>span:hover{
  color: var(--main-color);
}
.post-other{
  position: absolute;
  right: 1em;
}
.post-info{
  width: 10em;
}
.post-time{
  width: 10em;
}
.post-btn{
  background: var(--main-color);
  color: #fff;
  float: right;
}
.post-btn:hover{
  background: var(--main-color-active);
}
/* 论坛-主题Tag */
.tag::before{
  display: inline-block;
  width: 1em;
  border-radius: 0.2em;
  padding: 0.2em 0.5em;
  margin: 0 1em;
}
.tag-default::before{
  content: '主题';
  background: var(--hover-color);
  color: var(--text-color);
  opacity: 0.8;
}
.tag-notice::before{
  content: '公告';
  background: #3179db;
  color: #fff;
}
.tag-activity::before{
  content: '活动';
  background: #4ebc55;
  color: #fff;
}
.tag-rule::before{
  content: '版规';
  background: #ac48a2;
  color: #fff;
}
.tag-star::before{
  content: '精华';
  background: #f6a231;
  color: #fff;
}
/* 论坛-页数 */
.pages{
  font-size: 0.8em;
  margin: 0 auto;
  width: fit-content;
  color: var(--text-color);
}
.pages li{
  display: inline-block;
  list-style: none;
  padding: 0.2em 0.6em;
  margin: 0 0.2em;
}
.pages-btn{
  background: var(--item-color);
  padding: 0.3em 1em !important;
  border-radius: 1em;
  letter-spacing: 0.1em;
  text-shadow: 1px 0px 10px rgba(0, 0, 0, 0.4);
}
.pages-active{
  background: var(--bg-color);
  color: var(--text-color);
  border-radius: 1em;
}
</style>