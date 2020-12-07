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
    <img v-if="boardInfo.original[$route.params.id].translated.banner === ''" src="../assets/mc.jpg" alt="">
    <img v-if="boardInfo.original[$route.params.id].translated.banner !== ''" :src="boardInfo.original[$route.params.id].translated.banner" alt="">
    <div class="banner-cover"></div>
    <div class="intro boardName">
      <h1>
        <span v-for="(info, index) in boardName" :key="info.id">
          <span v-if="index < boardName.length - 1"> 
            <router-link :to="{path: '/forums/' + info.id}">{{info.name}}</router-link> /
          </span>
          <span v-if="index === boardName.length - 1">
            {{info.name}}
          </span>
        </span>
      </h1>
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
    <board title="置顶主题" :posts="topPost" :included="included"/>
    <board title="主题" :posts="post" :included="included">
      <span @click="openEditor" class="post-btn btn">发表新主题</span>
    </board>
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
import board from '@/components/Forum/board.vue'
import { mapState, mapMutations } from 'vuex'
import Editor from './../components/Editor.vue'
import axios from 'axios'
import { dzq } from '@/public'
export default {
  name: 'forum',
  components: {
    board,
    Editor
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
      boardName: [],
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
          vm.getBoardName();
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
      console.log(this.boardInfo);
      return this.boardInfo.original[this.id]?.translated.slogan;
    },
  },
  methods: {
    ...mapMutations([
      'setData'
    ]),
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
    },
    getBoardName: function () {
      let board = this.boardInfo.original[this.id]?.translated;
      if (board === undefined) return;

      let tmpBoardName = [];
      let pboard = board;
      while (pboard != undefined) {
        if (pboard.id != undefined) {
          console.log(pboard);
          tmpBoardName.push(pboard);
        }
        pboard = pboard.parent;
      }
      
      this.boardName = tmpBoardName.reverse();
      console.log(this.boardName);
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
.boardName a{
    color: var(--link-normal);
    text-decoration: none;
    transition: color 0.3s;
}
.boardName a:hover {
    color: var(--link-highlight);
}
.boardName a:visited {
    color: var(--link-visited);
}
</style>
