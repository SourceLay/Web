<template>
<!--
  <div>
    <p>{{$route.params.id}}{{$bus.$data.contentWidth}}</p>
  </div>
-->
<div class="para-content">
  <UserCard style="display: none" ref="userCard" />
  <transition name="up">
    <Editor v-if="showEditor"/>
  </transition>
  <div class="banner">
    <img src="../assets/mc.jpg" alt="">
    <div class="banner-cover"></div>
    <div class="intro">
      <h1 v-html="this.getBoardName()"></h1>
      <p>{{ boardDescription }}</p>
    </div>
  </div>
  <div class="forum-content">
    <ul class="tags">
      <li class="menu-item-choose">全部</li>
      <li>精华</li>
      <li>已关注</li>
      <!-- <li class="sort">排序方式：最新</li> -->
      <li class="stat">
        <span class="stat-key">今日</span>
        <!-- <span class="stat-value">0</span> -->
        <span class="stat-key">主题</span>
        <span class="stat-value">{{boardInfo.original[$route.params.id].translated.activitiesDaily.threads}}</span>
        <span class="stat-key">帖子</span>
        <span class="stat-value">{{boardInfo.original[$route.params.id].translated.activitiesDaily.posts}}</span>
      </li>
    </ul>

    <ul class="posts" v-if="boardInfo.original[$route.params.id].translated.children != undefined && boardInfo.original[$route.params.id].translated.children.length > 0">
      <li v-for="(info, index) in boardInfo.original[$route.params.id].translated.children" :key="index" class="post">
        <router-link :to="{path: '/forums/' + info.id}">
          <div class="sub-board">
            <div class="sub-board-info"><img src="../assets/mc.jpeg" alt="" class="sub-board-info-icon"></div>
            <div class="sub-board-info sub-board-info-middle">
              <h2 class="sub-board-info-name">{{info.name}} <span class="sub-board-info-today">({{info.activitiesDaily.threads}} / {{info.activitiesDaily.posts}})</span></h2>
              <p class="sub-board-info-slogan">{{info.slogan}}</p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>

    <ul class="posts">
      <h2 class="part-title">置顶主题</h2>
      <li v-for="post in topPost" :key="post.id" class="post">
        <router-link :to="{path: '/forums/topics/' + post.id}">
          <div class="post-tag">
            <p :class="['tag', getPostTag(post.relationships.user.data.id, post.attributes.title, post.attributes.isEssence)]"></p>
          </div>
          <div class="post-title">
            <h2 v-html="getPostTitle(post.attributes.title)"></h2>
            <p>{{included['posts.' + post.relationships.firstPost.data.id].attributes.content}}</p>
          </div>
          <div class="post-other">
            <div class="post-info">
              <p>
                作者：
                <span class="user" :data-id="post.relationships.user.data.id" tippy-user>
                  {{included['users.' + post.relationships.user.data.id].attributes.username}}
                </span>
              </p>
              <p>{{post.attributes.postCount}} 回复 / {{post.attributes.viewCount}} 浏览</p>
            </div>
            <div class="post-time">
              <p>
                最后一次回复：
                <span class="user" :data-id="post.relationships.lastPostedUser.data.id" tippy-user>
                  {{included['users.' + post.relationships.lastPostedUser.data.id].attributes.username}}
                </span>
              </p>
              <p class="time" v-html="getTime(post.attributes.updatedAt)" :data-tippy-content="new Date(post.attributes.updatedAt).toLocaleString()"></p>
            </div>
          </div>
        </router-link>
      </li>
      <img v-if="topPost === 0" class="empty" src="../assets/empty.png" alt="">
    </ul>

    <ul class="posts">
      <h2 class="part-title">主题</h2>
      <span @click="openEditor" class="post-btn btn">发表新主题</span>
      <li v-for="post in post" :key="post.id" class="post">
        <router-link :to="{path: '/forums/topics/' + post.id}">
          <div class="post-tag">
            <p :class="['tag', getPostTag(post.relationships.user.data.id, post.attributes.title, post.attributes.isEssence)]"></p>
          </div>
          <div class="post-title">
            <h2 v-html="getPostTitle(post.attributes.title)"></h2>
            <p>{{included['posts.' + post.relationships.firstPost.data.id].attributes.content}}</p>
          </div>
          <div class="post-other">
            <div class="post-info">
              <p>
                作者：
                <span class="user" :data-id="post.relationships.user.data.id" tippy-user>
                  {{included['users.' + post.relationships.user.data.id].attributes.username}}
                </span>
              </p>
              <p>{{post.attributes.postCount}} 回复 / {{post.attributes.viewCount}} 浏览</p>
            </div>
            <div class="post-time">
              <p>
                最后一次回复：
                <span class="user" :data-id="post.relationships.lastPostedUser.data.id" tippy-user>
                  {{included['users.' + post.relationships.lastPostedUser.data.id].attributes.username}}
                </span>
              </p>
              <p class="time" v-html="getTime(post.attributes.updatedAt)" :data-tippy-content="new Date(post.attributes.updatedAt).toLocaleString()"></p>
            </div>
          </div>
        </router-link>
      </li>
      <img v-if="post === 0" class="empty" src="../assets/empty.png" alt="">
    </ul>
    <ul class="pages">
      <li :style="{pointerEvents: page === 1 ? 'none' : ''}" class="pages-btn">
        <router-link :to="{params: {page : Number(page) - 1}}">上一页</router-link>
      </li>

      <li :class="page === 1 ? 'pages-active' : ''">
        <router-link :to="{params: {page : 1}}">1</router-link>
      </li>
      
      <li v-if="pageList !== undefined && pageList.length > 0 && pageList[0] !== 2">…</li>
      
      <li v-for="p in pageList" :key="p" :class="page === p ? 'pages-active' : ''">
        <router-link :to="{params: {page : p}}">{{p}}</router-link>
      </li>

      <li v-if="pageList !== undefined && pageList.length > 0 && pageList[pageList.length - 1] !== allPage -1">…</li>

      <li v-if="allPage !== 1" :class="page === allPage ? 'pages-active' : ''">
        <router-link :to="{params: {page : allPage}}">{{allPage}}</router-link>
      </li>

      <li :style="{pointerEvents: page === allPage ? 'none' : ''}" class="pages-btn">
        <router-link :to="{params: {page : Number(page) + 1}}">下一页</router-link>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Editor from './../components/Editor.vue'
import UserCard from './../components/UserCard.vue'
import axios from 'axios'
import tippy from 'tippy.js';
import { getPostTitle, getPostTag, getTime, dzq} from '@/public'
import 'tippy.js/dist/tippy.css'; // optional for styling
export default {
  name: 'forum',
  components: {
    Editor,
    UserCard
  },
  data() {
    return {
      test: '666',
      topPost: null,
      post: null,
      id: 0,      // 板块 ID
      page: 1,
      allPage: 0,
      pageList: [],
      included: {},
    }
  },
  beforeRouteEnter(to, from, next) {
    let top = null
    let post = null
    let page = 1
    if(to.params.page){
      page = to.params.page
    }
    //获取置顶
    axios.get(
      dzq({
        name: 'threads',
        include: ['user', 'firstPost', 'lastPostedUser', 'user.groups'],
        filter: {
          type: 1,
          isDeleted: 'no',
          isSticky: 'yes',
          categoryId: to.params.id
        }
      })
    ).then((response) => {
      top = response.data
      //获取帖子
      axios.get(
        dzq({
          name: 'threads',
          include: ['user', 'firstPost', 'lastPostedUser', 'user.groups'],
          filter: {
            type: 1,
            isDeleted: 'no',
            isSticky: 'no',
            categoryId: to.params.id
          },
          page: {
            number: page,
            limit: 20
          },
          sort: '-updatedAt'
        })
      ).then((response) => {
        post = response.data
        next((vm) => {
          vm.getPost(top, post, page);
          vm.id = to.params.id;
        })
      })
    })
  },
  beforeRouteUpdate(to, from, next) {
    console.log('同页面跳转')
    let top = null
    let post = null
    let page = 1
    if(to.params.page){
      page = to.params.page
    }
    this.id = to.params.id;
    axios.get(
      dzq({
        name: 'threads',
        include: ['user', 'firstPost', 'lastPostedUser', 'user.groups'],
        filter: {
          type: 1,
          isDeleted: 'no',
          isSticky: 'no',
          categoryId: to.params.id
        },
        page: {
          number: page,
          limit: 20
        },
        sort: '-updatedAt'
      })
    ).then((response) => {
      post = response.data
      this.getPost(top, post, page)
      next()
    })
  },
  computed: {
    ...mapState([
      'showEditor', 'boardInfo'
    ]),
    
    boardDescription: function () {
      return this.boardInfo.original[this.id]?.translated.slogan;
    },
  },
  methods: {
    ...mapMutations([
      'setData'
    ]),
    getTime,
    getPostTag,
    getPostTitle,
    openEditor() {
      this.setData({
        key: 'showEditor',
        value: 1
      })
    },
    getPost(top, post, page) {
      if(top){
        this.topPost = top.data
      }
      this.post = post.data
      this.page = page
      page = Number(page)

      this.allPage = post.meta.pageCount
      if(this.allPage === 0){
        this.allPage = 1
      }
      if(this.allPage === 1){
        this.pageList = []
      }else if(this.allPage <= 10){
        this.pageList = Array.from(new Array(this.allPage - 2), (x,i) => i + 2)
      }else if(page < 4){
        this.pageList = Array.from(new Array(page + 1), (x,i) => i + 2)
      }else if((this.allPage - page) < 3){
        this.pageList = Array.from(new Array(this.allPage - page + 2), (x,i) => i + (page - 2))
      }else{
        this.pageList = Array.from(new Array(5), (x,i) => i + page - 2)
      }

      if(top && typeof top.included != 'undefined'){
        top.included.forEach((item) => {
          this.included[item.type + '.' + item.id] = item
        })
      }
      if(typeof post.included != 'undefined'){
        post.included.forEach((item) => {
          this.included[item.type + '.' + item.id] = item
        })
      }
      this.$nextTick(() => {
        let vue = this
        tippy('[tippy-user]', {
          onShow(instance) {
            console.log(instance)
            vue.setData({
              key: 'popUser',
              value: vue.included['users.' + instance.reference.dataset.id].attributes
            })
            vue.$nextTick(() => {
              instance.setContent(vue.$refs.userCard.$el.innerHTML)
            })
          },
          allowHTML: true,
          arrow: false,
          theme: 'user-card',
          delay: 100
        })
        tippy('[data-tippy-content]', {
          delay: 100
        })
      })
    },
    getBoardName: function () {
      let ret = "";

      let board = this.boardInfo.original[this.id]?.translated;
      if (board === undefined) return;

      let pboard = board.parent;      

      while (pboard != undefined) {
        if (pboard.id != undefined)
          ret = "<span>" + pboard.name + "</span> / " + ret;
        pboard = pboard.parent;
      }
      
      ret += board.name;

      return ret;
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
/* 论坛-内容 */
.forum-content{
  padding: 1em 0;
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
  background: #f8f8f8;
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
.post a{
  display: contents;
  color: inherit;
  text-decoration: none;
}
.post:hover{
  background: var(--item-color);
}
.post div{
  display: inline-block;
}
.post-title{
  width: 62em;
}
.post-title h2{
  font-weight: normal;
  font-size: 1.4em;
}
.post-title p{
  opacity: 0.7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.post-title >>>div{
  display: inline-block;
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
  width: 12em;
}
.time{
  display: inline-block;
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
  width: 2em;
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
  margin: 0 0.2em;
}
.pages a{
  display: block;
  padding: 0.2em 0.6em;
  color: inherit;
  text-decoration: none;
}
.pages-btn{
  background: var(--item-color);
  padding: 0.3em 1em !important;
  border-radius: 1em;
  letter-spacing: 0.1em;
  text-shadow: 1px 0px 10px rgba(0, 0, 0, 0.4);
}
.pages-btn a{
  padding: 0;
}
.pages-active{
  background: var(--bg-color);
  color: var(--text-color);
  border-radius: 1em;
}
.sub-board {
  padding-left: 1em;
}
.sub-board-info {
  display: table-cell;
}
.sub-board-info-icon {
  width: 4em;
  height: 4em;
  object-fit: cover;
  border-radius: 50%;
  border: 0.1em solid #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
.sub-board-info-middle {
  margin-left: 1em;
  width: 62em;
}
.sub-board-info-name {
  font-weight: normal;
  font-size: 1.4em;
}
.sub-board-info-slogan {
  opacity: 0.7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 1.6em;
}
.sub-board-info-today {
  font-size: 0.8em;
  margin-right: 0.2em;
}


</style>
