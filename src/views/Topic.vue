<template>
<div v-if="topic" class="para-content">
  <!-- 头部 -->
  <div :class="['banner', loadPage[0] === 1 ? '' : 'hide']">
    <img v-if="category.attributes.banner === ''" src="../assets/mc.jpg" alt="">
    <img v-if="category.attributes.banner !== ''" :src="category.attributes.banner" alt="">
    <div v-once :class="['banner-cover','tag', getPostTag(topic.relationships.user.data.id, topic.attributes.title, topic.attributes.isEssence)]"></div>
    <!-- 帖子信息 -->
    <div class="intro">
      <h1 v-once class="title" v-html="getPostTitle(topic.attributes.title)"></h1>
      <p :data-tippy-content="new Date(topic.attributes.createdAt).toLocaleString()">
        发表于
        <span v-once v-html="getTime(topic.attributes.createdAt)"></span>
      </p>
    </div>
  </div>
  <div class="forum-content">
    <ul class="posts">
      <!-- 首帖 -->
      <li :class="['post', loadPage[0] === 1 ? '' : 'hide']" data-floor=1>
        <!-- TODO 改成更优雅的版本 -->
        <img class="avatar" v-if="included['users.' + topic.relationships.user.data.id].attributes.avatarUrl === ''" src="../assets/avatar.png" alt=""/>
        <img class="avatar" v-if="included['users.' + topic.relationships.user.data.id].attributes.avatarUrl !== ''"
                            :src="included['users.' + topic.relationships.user.data.id].attributes.avatarUrl" alt=""/>
        <div class="post-body">
          <!-- 用户信息 -->
          <div class="post-header">
            <p class="user-name">
              {{included['users.' + topic.relationships.user.data.id].attributes.username}}
            </p>
            <p class="post-time" :data-tippy-content="new Date(included['posts.' + topic.relationships.firstPost.data.id].attributes.createdAt).toLocaleString()">
              {{firstPost.time}}
            </p>
            <p class="post-floor">#1</p>
          </div>
          <!-- 内容 -->
          <div class="post-main">
            <div v-html="firstPost.content" class="post-content bbcode" @click="onClickContent($event)">
            </div>
          </div>
          <div class="post-bottom">
            <!-- 点赞 -->
            <div v-if="included['posts.' + topic.relationships.firstPost.data.id].relationships.likedUsers !== undefined && included['posts.' + topic.relationships.firstPost.data.id].relationships.likedUsers.data !== undefined && included['posts.' + topic.relationships.firstPost.data.id].relationships.likedUsers.data.length > 0">
              <i class="iconfont icon-guanzhu"></i>
              <p class="post-likedUser" v-html="firstPost.likedUser"></p>
            </div>
            <!-- 功能 -->
            <ul class="post-func">
              <li v-if="included['posts.' + topic.relationships.firstPost.data.id].attributes.canHide">删除</li>
              <li v-if="included['posts.' + topic.relationships.firstPost.data.id].attributes.canEdit" @click="setEdit(topic.relationships.firstPost.data.id)">编辑</li>
              <li v-if="included['posts.' + topic.relationships.firstPost.data.id].attributes.canLike && included['posts.' + topic.relationships.firstPost.data.id].attributes.isLiked === false" @click="setLike($event, topic.relationships.firstPost.data.id, true)">点赞</li>
              <li v-if="included['posts.' + topic.relationships.firstPost.data.id].attributes.canLike && included['posts.' + topic.relationships.firstPost.data.id].attributes.isLiked === true" @click="setLike($event, topic.relationships.firstPost.data.id, false)">取赞</li>
              <li @click="setReply(1, topic.relationships.firstPost.data.id)">回复#1</li>
            </ul>
          </div>
        </div>
      </li>
      <!-- 回复 -->
      <li v-for="(id, index) in postList" :key="id" :data-floor="startFloor + index" class="post">
        <!-- TODO 改成更优雅的版本 -->
        <img class="avatar" v-if="included['users.' + included['posts.' + id].relationships.user.data.id].attributes.avatarUrl === ''" src="../assets/avatar.png" alt=""/>
        <img class="avatar" v-if="included['users.' + included['posts.' + id].relationships.user.data.id].attributes.avatarUrl !== ''"
                            :src="included['users.' + included['posts.' + id].relationships.user.data.id].attributes.avatarUrl" alt=""/>
        <div class="post-body">
          <!-- 用户信息 -->
          <div class="post-header">
            <p class="user-name">
              {{included['users.' + included['posts.' + id].relationships.user.data.id].attributes.username}}
            </p>
            <p class="post-time" :data-tippy-content="new Date(included['posts.' + id].attributes.createdAt).toLocaleString()">
              {{formatData['posts.' + id].time}}
            </p>
            <p class="post-floor">#{{startFloor + index}}</p>
          </div>
          <!-- 内容 -->
          <div class="post-main">
            <!-- 引用回复 -->
            <div @click="jumpTo(formatData['reply.' + included['posts.' + id].attributes.replyPostId].floor)" v-if="formatReplyData && included['posts.' + id].attributes.replyPostId" class="post-reply">
              <span>
                {{formatData['reply.' + included['posts.' + id].attributes.replyPostId].user}}：
              </span>
              <span>
                {{formatData['reply.' + included['posts.' + id].attributes.replyPostId].content}}
              </span>
            </div>
            <!-- 正文 -->
            <div v-html="formatData['posts.' + id].content" class="post-content bbcode" @click="onClickContent($event)">
            </div>
          </div>
          <div class="post-bottom">
            <!-- 点赞 -->
            <div v-if="included['posts.' + id].relationships.likedUsers !== undefined && included['posts.' + id].relationships.likedUsers.data !== undefined && included['posts.' + id].relationships.likedUsers.data.length > 0">
              <i class="iconfont icon-guanzhu"></i>
              <p class="post-likedUser" v-html="formatData['posts.' + id].likedUser"></p>
            </div>
            <!-- 功能 -->
            <ul class="post-func">
              <li v-if="included['posts.' + id].attributes.canHide">删除</li>
              <li v-if="included['posts.' + id].attributes.canEdit" @click="setEdit(id)">编辑</li>
              <li v-if="included['posts.' + id].attributes.canLike && included['posts.' + id].attributes.isLiked === false" @click="setLike($event, id, true)">点赞</li>
              <li v-if="included['posts.' + id].attributes.canLike && included['posts.' + id].attributes.isLiked === true" @click="setLike($event, id, false)">取赞</li>
              <li @click="setReply(startFloor + index, id)">回复#{{startFloor + index}}</li>
            </ul>
          </div>
        </div>
      </li>
      <!-- 自我回复 -->
      <li v-for="(id, index) in selfPostList" :key="id" :data-floor="selfPostFloor[index]" class="post">
        <!-- TODO 改成更优雅的版本 -->
        <img class="avatar" v-if="included['users.' + included['posts.' + id].relationships.user.data.id].attributes.avatarUrl === ''" src="../assets/avatar.png" alt=""/>
        <img class="avatar" v-if="included['users.' + included['posts.' + id].relationships.user.data.id].attributes.avatarUrl !== ''"
                            :src="included['users.' + included['posts.' + id].relationships.user.data.id].attributes.avatarUrl" alt=""/>
        <div class="post-body">
          <!-- 用户信息 -->
          <div class="post-header">
            <p class="user-name">
              {{included['users.' + included['posts.' + id].relationships.user.data.id].attributes.username}}
            </p>
            <p class="post-time" :data-tippy-content="new Date(included['posts.' + id].attributes.createdAt).toLocaleString()">
              {{formatData['posts.' + id].time}}
            </p>
            <p class="post-floor">#{{selfPostFloor[index]}}</p>
          </div>
          <!-- 内容 -->
          <div class="post-main">
            <!-- 引用回复 -->
            <div v-if="formatReplyData && included['posts.' + id].attributes.replyPostId" class="post-reply">
              <div v-if="formatData['reply.' + included['posts.' + id].attributes.replyPostId]">
                <span>
                  {{formatData['reply.' + included['posts.' + id].attributes.replyPostId].user}}：
                </span>
                <span>
                  {{formatData['reply.' + included['posts.' + id].attributes.replyPostId].content}}
                </span>
              </div>
            </div>
            <!-- 内容 -->
            <div v-html="formatData['posts.' + id].content" class="post-content bbcode" @click="onClickContent($event)">
            </div>
          </div>
          <div class="post-bottom">
            <!-- 功能 -->
            <ul class="post-func">
              <li v-if="included['posts.' + id].attributes.canHide">删除</li>
              <li v-if="included['posts.' + id].attributes.canEdit" @click="setEdit(id)">编辑</li>
              <li v-if="included['posts.' + id].attributes.canLike && included['posts.' + id].attributes.isLiked === false" @click="setLike($event, id, true)">点赞</li>
              <li v-if="included['posts.' + id].attributes.canLike && included['posts.' + id].attributes.isLiked === true" @click="setLike($event, id, false)">取赞</li>
              <li @click="setReply(selfPostFloor[index], id)">回复#{{selfPostFloor[index]}}</li>
            </ul>
          </div>
        </div>
      </li>
      <li :class="[fixedEditor ? 'fixed-editor' : '']">
        <Editor ref="editor" :editData="editData" :replyData="replyData" @sendPost="sendPost" @cancelEditing="cancelEditing"/>
      </li>
    </ul>
    <!-- 侧边进度条 -->
    <div class="post-sidebar">
      <div class="post-sidebar-content">
        <p @click="showEditor" class="btn btn-post">添加回复</p>
        <div class="post-seekbar">
          <p :style="{opacity: inBar, transform: 'translate(0, ' + seekbarY + 'px)'}" class="bar-tip">{{seekbarFloor}}</p>
          <p class="post-seekbar-btn" @click="jumpTo(1)"><i class="iconfont icon-shang"></i>主楼</p>
          <div @click="jumpFloor" @mousemove="showBar" @mouseleave="closeBar" class="bar">
            <div :style="{height: seekbarPercent + '%'}" class="now-bar"></div>
          </div>
          <p class="post-seekbar-btn" @click="jumpTo(allFloor)"><i class="iconfont icon-shang icon-xia"></i>最新楼层</p>
        </div>
      </div>
    </div>
  </div>

  <el-dialog title="支付" width="30%" :visible="payVisible" @close="payVisible=false">
    <Pay @handlePay="handlePay" :fileInfo="processingFileInfo" :shareInfo="processingShareInfo" :orderInfo="processingOrderInfo"></Pay>
  </el-dialog>

  <el-dialog title="输入分享密码"
             width="30%"
             :visible="sharePasswordVisible"
             @close="sharePasswordVisible=false">
    <form>
      <el-input type="password" v-model="sharePassword" autocomplete="false"></el-input>
    </form>
    <div style="text-align: center;margin-top: 1em;">
      <el-button type="primary" @click="handleSharePassword">
        确认
      </el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
import Editor from './../components/Editor.vue'
import axios from 'axios'
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import XBBCODE from '.././xbbcode'
import { mapState, mapMutations } from 'vuex'
import { _throttle, _debounce } from '@/public'
import { getPostTitle, getPostTag, getTime, dzq } from '@/public'
import IncludedHelper from '../helpers/includedHelper'
import Pay from "@/components/Pay";
import {globalSuccessNotify, globalErrorNotify} from "@/helpers/globalNotify";
import store from '../store/index'

export default {
  name: 'forum',
  data: function() {
    return {
      category: {
        attributes: {
          banner: ''
        }
      },

      threadId: 0,
      sharePasswordVisible: false, //分享密码框是否可见
      sharePassword: '', //分享密码
      payVisible: false,  //支付框是否可见
      topic: null,        //存放主题数据
      showPost: [],       //当前展示的帖子ID
      jumpUrl: {},
      replyData: null,    //预备回复信息
      editData: null,     //预备编辑信息
      replyId: [],        //存放引用回复信息

      inBar: 0,           //进度条激活状态
      allFloor: null,     //获取所有楼层数
      allPage: null,      //获取所有页数
      seekbarPercent: 0,  //进度条百分比
      seekbarY: 0,        //进度条Y轴
      seekbarFloor: 1,    //进度条当前楼层

      firstPost: {},      //存放楼主数据

      selfPost: [],       //存放自我回复楼层id
      selfPostFloor: [],  //存放自我回复楼层数
      included: {},       //存放关联数据
      startFloor: 0,      //起始楼层
      loadPage: [1, 1],   //加载页面
      showBanner: 0,      //是否展示顶部栏
      loadFlag: 0,        //是否处于加载更多中……
      formatData: {},

      processingShareInfo: {id: 0},
      processingFileInfo: {id: 0},
      processingOrderInfo: {id: 0},
    }
  },
  beforeRouteEnter(to, from, next) {
    //获取主题信息
    axios.get(
      dzq({
        name: 'threads/' + to.params.id,
        include: [
          'firstPost',
          'category',
          'user.groups',
          'firstPost.likedUsers',
          'firstPost.file',
          'firstPost.fileShare',
        ]
      })
    ).then((topic) => {
      //获取楼层数据
      let floor = 1, page = 1
      if(location.search.substr(0, 3) === '?n='){
        floor = parseInt(location.search.substr(3))
        page = Math.ceil((floor - 1) / 20)
      }
      if(floor >= topic.data.data.attributes.postCount || floor < 0 || !floor){
        floor = 1
        page = 1
      }
      //获取回复
      axios.get(
        dzq({
          name: 'posts',
          filter: {
            // isDeleted: 'no',
            thread: to.params.id
          },
          include: [
            'user',
            'user.groups',
            'likedUsers',
            'file',
            'fileShare',
          ],
          page: {
            number: page,
            limit: 20
          }
        })
      ).then((post) => {
        next((vm) => {

          let included = new IncludedHelper(topic.data.included);
          vm.category = included.get(
            'categories.' + topic.data.data.relationships.category.data.id
          )
          vm.threadId = to.params.id;
          vm.getData(topic.data, post.data, page, floor)

          document.title = topic.data.data.attributes.title;
        })
      })
    })
  },
  beforeRouteUpdate(to, from, next) {
    if (from.params.id !== to.params.id) {
      axios.get(
        dzq({
          name: 'threads/' + to.params.id,
          include: [
            'firstPost',
            'category',
            'user.groups',
            'firstPost.likedUsers',
            'firstPost.file',
            'firstPost.fileShare',
          ]
        })
      ).then((topic) => {
        //获取楼层数据
        let floor = 1, page = 1
        if(location.search.substr(0, 3) === '?n='){
          floor = parseInt(location.search.substr(3))
          page = Math.ceil((floor - 1) / 20)
        }
        if(floor >= topic.data.data.attributes.postCount || floor < 0 || !floor){
          floor = 1
          page = 1
        }
        //获取回复
        axios.get(
          dzq({
            name: 'posts',
            filter: {
              // isDeleted: 'no',
              thread: to.params.id
            },
            include: [
              'user',
              'user.groups',
              'likedUsers',
              'file',
              'fileShare',
            ],
            page: {
              number: page,
              limit: 20
            }
          })
        ).then((post) => {
            let included = new IncludedHelper(topic.data.included);
            this.category = included.get(
              'categories.' + topic.data.data.relationships.category.data.id
            )
            this.threadId = to.params.id;
            this.formatData = {};
            this.selfPostFloor = [];
            this.$forceUpdate();

            this.getData(topic.data, post.data, page, floor)
            document.title = topic.data.data.attributes.title;
        })
      })
    }
    next();
  },
  components: {
    Editor, Pay
  },
  computed: {
    ...mapState([
      'fixedEditor'
    ]),
    postList: function() {
      this.showPost.forEach(id => {
        if(!this.formatData['posts.' + id]){
          this.formatData['posts.' + id] = {
            time : this.getTime(this.included['posts.' + id].attributes.createdAt),
            content : this.getContent(this.included['posts.' + id].attributes.content),
            likedUser : this.getLikedUser(this.included['posts.' + id].relationships?.likedUsers?.data)
          }
        }
      })
      return this.showPost
    },
    selfPostList: function() {
      this.selfPost.forEach(id => {
        if(!this.formatData['posts.' + id]){
          this.formatData['posts.' + id] = {
            time : this.getTime(this.included['posts.' + id].attributes.createdAt),
            content : this.getContent(this.included['posts.' + id].attributes.content),
          }
        }
      })
      return this.selfPost
    },
    formatReplyData: function() {
      this.replyId.forEach(reply => {
        if(!this.formatData['reply.' + reply.id]){
          this.formatData['reply.' + reply.id] = this.getReplyData(reply.id, reply.user)
        }
      })
      return 1
    }
  },
  methods: {
    ...mapMutations([
      'setData'
    ]),
    getPostTitle,
    getPostTag,
    getTime,
    //渲染点赞用户
    getLikedUser(users) {
      if (users === undefined) return;
      if (users.length === 0) return;

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
      this.replyData = null
      this.editData = null;
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
    //楼层跳转
    jumpFloor: function() {
      let floor = document.querySelector('li[data-floor=\'' + this.seekbarFloor + '\']')
      if(floor){
        this.seekbarPercent = parseInt(this.seekbarFloor / this.allFloor * 100)
        document.documentElement.scrollTo(0, floor.offsetTop + 256)
      }else{
        window.location.href = window.location.pathname + '?n=' + this.seekbarFloor
      }
    },
    jumpTo(id){
      this.seekbarFloor = id
      this.jumpFloor()
    },
    //处理API数据并初始化
    getData: function(topic, post, page, floor) {
      //处理数据
      this.loadPage = [page, page]
      this.topic = topic.data

      this.jumpUrl = post.links
      //存放关联数据
      topic.included.forEach((item) => {
        this.included[item.type + '.' + item.id] = item
      })
      //存放回复数据
      if(post.data !== undefined && post.data.length > 0){
        post.included.forEach((item) => {
          this.included[item.type + '.' + item.id] = item
        })
        post.data.forEach((item, index) => {
          if(item.attributes.replyPostId){
            this.replyId.push({
              id: item.attributes.replyPostId,
              user: item.attributes.replyUserId
            })
          }
          this.showPost[index] = item.id
          this.included[item.type + '.' + item.id] = item
        })
      }

      this.firstPost = {
        content : this.getContent(this.included['posts.' + this.topic.relationships.firstPost.data.id].attributes.content),
        likedUser : this.getLikedUser(this.included['posts.' + this.topic.relationships.firstPost.data.id].relationships.likedUsers?.data),
        time : this.getTime(this.included['posts.' + this.topic.relationships.firstPost.data.id].attributes.createdAt)
      }

      //处理跳转
      this.allFloor = post.meta.postCount + 1
      this.allPage = Math.ceil(this.allFloor / 20)
      this.startFloor = (page - 1) * 20 + 2
      this.seekbarFloor = floor
      this.seekbarPercent = parseInt(floor / this.allFloor * 100)
      this.$nextTick(() => {
        if(floor !== 1){
          this.jumpFloor()
        }
        tippy('[data-tippy-content]', {
          delay: 100
        })
      })
    },
    getContent(content) {
      if (content === undefined || content == null || content === '') return;
      let parser = XBBCODE();
      parser.setIncluded(this.included);
      return parser.process({
        text: content,
        removeMisalignedTags: false,
        addInLineBreaks: true
      }).html
    },
    scroll: _throttle(function() {
      let posts = document.querySelectorAll('.post')
      posts.forEach((item) => {
        if(item.getBoundingClientRect().top < 0){
          this.seekbarFloor = parseInt(item.getAttribute('data-floor'))
          this.seekbarPercent = parseInt(this.seekbarFloor / this.allFloor * 100)
        }
      })
    },50),
    //加载更多
    loadMore: _debounce(function() {
      let body = document.documentElement
      if(body.scrollHeight - (body.clientHeight + body.scrollTop) < 800 && !this.loadFlag && this.loadPage[1] < this.allPage){
        //清空自己的回复
        this.selfPost = []
        this.selfPostFloor = []
        this.loadFlag = 1
        axios.get(
          //TODO 临时截去域名部分
          this.jumpUrl.next.replace(/^https?:\/\/[^/]+/, "")
        ).then((response) => {
          response.data.data.forEach((item) => {
            if(item.attributes.replyPostId){
              this.replyId.push({
                id: item.attributes.replyPostId,
                user: item.attributes.replyUserId,
              })
            }
            this.showPost.push(item.id)
            this.included[item.type + '.' + item.id] = item
          })
          this.jumpUrl = response.data.links
          this.$nextTick(() => {
            tippy('[data-tippy-content]', {
              delay: 100
            })
            this.loadPage[1]++
            this.loadFlag = 0
          })
        })
      }else if(body.scrollTop < 800 && !this.loadFlag && this.loadPage[0] !== 1){
        let oldScrollHeight = body.scrollHeight
        let oldScrollTop = body.scrollTop
        this.loadFlag = 1
        axios.get(
          //TODO 临时截去域名部分
          this.jumpUrl.prev.replace(/^https?:\/\/[^/]+/, "")
        ).then((response) => {
          response.data.data.reverse().forEach((item) => {
            if(item.attributes.replyPostId){
              this.replyId.push({
                id: item.attributes.replyPostId,
                user: item.attributes.replyUserId,
              })
            }
            this.showPost.unshift(item.id)
            this.included[item.type + '.' + item.id] = item
          })
          this.jumpUrl = response.data.links
          this.$nextTick(() => {
            tippy('[data-tippy-content]', {
              delay: 100
            })
            let newScrollTop = body.scrollHeight - oldScrollHeight + oldScrollTop
            document.documentElement.scrollTo(0, newScrollTop)
            this.startFloor -= 20
            this.loadPage[0]--
            this.loadFlag = 0
          })
        })
      }
    }),
    setReply(floor, id) {
      this.editData = null;
      this.replyData = {
        floor: floor,
        id: id
      }
      this.setData({
        key: 'fixedEditor',
        value: 1
      })
    },
    setEdit(id) {
      if (this.editData !== null) {
        return;
      }

      this.replyData = null;
      this.editData = {
        id: id
      }
      console.log(this.included[`posts.${id}`]);
      this.$refs.editor.content = this.included[`posts.${id}`]?.attributes?.content ?? '';
      this.setData({
        key: 'fixedEditor',
        value: 1
      })
    },
    sendPost(data) {
      //存放关联数据
      this.included['posts.' + data.data.id] = data.data
      data.included.forEach((item) => {
        this.included[item.type + '.' + item.id] = item
      })

      if (this.editData) {
        let tmp = {
          time : this.getTime(this.included[`posts.${data.data.id}`].attributes.createdAt),
          content : this.getContent(this.included[`posts.${data.data.id}`].attributes.content),
          likedUser : this.getLikedUser(this.included[`posts.${data.data.id}`].relationships?.likedUsers?.data)
        }

        if(this.topic.relationships.firstPost.data.id === data.data.id){
          this.firstPost = tmp;
        }else{
          this.formatData[`posts.${data.data.id}`] = tmp
        }

        this.$forceUpdate()
      }
      else
      {
        if(data.data.attributes.replyPostId){
          this.replyId.push({
            id: data.data.attributes.replyPostId,
            user: data.data.attributes.replyUserId
          })
        }
        this.selfPost.push(data.data.id)

        let includedInfo = new IncludedHelper(data.included);
        let threadInfo = includedInfo.get('threads.' + data.data.relationships.thread.data.id);

        this.selfPostFloor.push(data.data.attributes.floor)
        this.allFloor = threadInfo.attributes.postCount
      }

      this.setData({
        key: 'fixedEditor',
        value: 0
      })
      this.editData = null
      this.replyData = null

    },
    cancelEditing(){
      this.editData = null
      this.replyData = null
      this.$refs.editor.changeFixed(false);
    },
    getReplyData(id, user) {
      //加载数据中已有该贴
      let data = {
        user: '加载中'
      }
      if(this.included['posts.' + id]){
        data.user = this.included['users.' + user].attributes.username
        data.content = XBBCODE().process({
          text: this.included['posts.' + id].attributes.content,
          removeMisalignedTags: false,
          addInLineBreaks: true,
          clean: true
        }).clean
        //如回复贴为楼主，则楼层为1
        if(id === this.topic.relationships.firstPost.data.id){
          data.floor = 1
        }else{
          //遍历获取楼层号
          let floor
          for(floor in this.showPost){
            if(this.showPost[floor] === id){
              break
            }
          }
          data.floor = Number(floor) + 2
        }
      }else{
        //加载数据中无该贴
        axios.get(
          dzq({
            name: 'posts/' + id
          })
        ).then((res) => {
          let includedInfo = new IncludedHelper(res.data.included);
          let userInfo = includedInfo.get('users.' + res.data.data.relationships.user.data.id);
          data.user = userInfo.attributes.username
          data.floor = res.data.data.attributes.floor
          data.content = XBBCODE().process({
            text: res.data.data.attributes.content,
            removeMisalignedTags: false,
            addInLineBreaks: true,
            clean: true
          }).clean
          this.$forceUpdate()
        })
      }
      return data
    },
    setLike(event, post_id, isLiked){
      console.log(event);

      axios.patch(dzq({
          name: 'posts/' + post_id
        }), {
        data: {
            id: post_id,
            type: "posts",
            attributes: {
                isLiked: isLiked
            }
        }
      }).then(response => {
        this.included['posts.' + post_id] = response.data.data
        response.data.included.forEach(item => {
          this.included[item.type + '.' + item.id] = item
        })
        if(this.topic.relationships.firstPost.data.id === post_id){
          this.firstPost.likedUser = this.getLikedUser(this.included['posts.' + post_id].relationships?.likedUsers?.data)
        }else{
          this.formatData['posts.' + post_id].likedUser = this.getLikedUser(this.included['posts.' + post_id].relationships?.likedUsers?.data)
        }
        this.$forceUpdate()
      });
    },
    onClickContent(event){
      console.log(event);

      if (event.srcElement.tagName.toLowerCase() === "div" && event.srcElement.attributes.class?.value === "xbbcode-flieshare-block") {
        let shareId = Number(event.srcElement.attributes.shareid?.value);
        if (typeof(shareId) === 'undefined' || shareId === null) {
          globalErrorNotify(this, "请刷新页面后重试。");
        }
        let shareInfo = this.included['sourcelay-fileshare.' + shareId];
        let fileInfo = undefined;
        console.log(shareInfo);

        if (shareInfo) {
            fileInfo = this.included['sourcelay-file.' + shareInfo.attributes.file_id];
        }
        console.log(fileInfo);

        if (typeof(shareInfo) == 'undefined' || shareInfo === null || typeof(fileInfo) == 'undefined' || fileInfo === null) {
          globalErrorNotify(this, "请刷新页面后重试。");
          return;
        }

        // 如果已经可以下载了
        if (shareInfo.attributes.downloadUrl) {
          this.downloadShareFile(shareInfo, fileInfo);
          globalSuccessNotify(this, "正在下载，请稍候。");
          return;
        }

        // 密码下载
        if (shareInfo.attributes.shared_type === 1 && shareInfo.attributes.paid === false) {
          this.processingShareInfo = shareInfo;
          this.processingFileInfo = fileInfo;

          this.sharePassword = '';//清空上次输入
          this.sharePasswordVisible = true;
          return;
        }

        //付费下载
        if (shareInfo.attributes.shared_type === 2 && shareInfo.attributes.paid === false) {
          if (store.state.userInfo.hasPayPassword === true) {
            this.processingShareInfo = shareInfo;
            this.processingFileInfo = fileInfo;

            globalSuccessNotify(this, "正在创建订单。");

            axios.post(
              dzq({
                name: 'orders'
              }),
              {
                data: {
                  attributes: {
                    type: "17", // 购买文件的类型
                    share_id: this.processingShareInfo.attributes.id,
                    thread_id: this.threadId,
                  }
                }
              }

            ).then((res) => {
              this.processingOrderInfo = res.data.data;
              this.payVisible = true;
            }).catch((err) => {
              globalErrorNotify(this, err);
            })

          } else {
            globalErrorNotify(this, "您尚未设置支付密码。");
          }
          return;
        }

        globalErrorNotify(this, "请刷新页面后重试，若多次出现本错误请联系管理员。");
      }
    },
    attemptRequireDownloadUrl(shareInfo, fileInfo) {
      axios.get(
        dzq({
          name: 'sourcelay/fileshare/' + shareInfo.attributes.id
        })
      ).then((res) => {
        if (res.data.data.attributes.downloadUrl) {
          this.included['sourcelay-fileshare.' + res.data.data.attributes.id] = res.data.data;

          this.downloadShareFile(res.data.data, fileInfo);
        } else {
          globalErrorNotify(this, "请刷新页面后重试。");
        }
      }).catch((err) => {
        globalErrorNotify(this, err);
      })
    },
    downloadShareFile(shareInfo, fileInfo) {
      // 如果文件还没有下载地址我们就再请求一次下载地址
      if (!shareInfo.attributes.downloadUrl) {
        this.attemptRequireDownloadUrl(shareInfo, fileInfo);
        return;
      }

      axios.get(shareInfo.attributes.downloadUrl, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: shareInfo.attributes.type ?? 'application/octet-stream' })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = fileInfo.attributes.name
          link.click()
          URL.revokeObjectURL(link.href)
        }).catch((error) => {
          globalErrorNotify(this, error);
      })
    },
    handlePay(ret) {
      axios.post(
        dzq({
          name: 'trade/pay/order/' + this.processingOrderInfo.attributes.order_sn
        }),
        {
          data: {
            attributes: {
              order_sn: this.processingOrderInfo.attributes.order_sn,
              payment_type: 20, // 钱包支付
              pay_password: ret,
            }
          }
        }

      ).then((res) => {
        if (res.data.data.attributes.wallet_pay.result === "success") {
          globalSuccessNotify(this, res.data.data.attributes.wallet_pay.message);
          this.payVisible = false;
          this.downloadShareFile(this.processingShareInfo, this.processingFileInfo)
        } else {
          globalErrorNotify(this, res.data.data.attributes.wallet_pay.message);
        }
      }).catch((err) => {
        globalErrorNotify(this, err);
      })
    },
    handleSharePassword() {

      axios.post(dzq({
          name: 'sourcelay/fileshare/' + this.processingShareInfo.attributes.id
        }), {
        data: {
          id: this.processingShareInfo.id,
          type: "sourcelay-fileshare",
          attributes: {
            id: this.processingShareInfo.attributes.id,
            password: this.sharePassword,
          }
        }

      }).then((response) => {
        this.downloadShareFile(response.data.data, this.processingFileInfo);

        console.log(response)
      }).catch((error) => {
        globalErrorNotify(this, error);
      })

      console.log(this.sharePassword);
      this.sharePasswordVisible = false;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scroll, true)
    window.addEventListener('scroll', this.loadMore, true)
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
  display: inline-block;
}
.title >>>div{
  font-size: 0.5em;
}
.title >>>span{
  letter-spacing: 0;
  margin-right: 0.2em;
}
.title >>>a{
  color: inherit;
  text-decoration: none;
}
.title >>>a:hover{
  text-decoration: underline;
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
  width: 90%;
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
.post-reply{
  cursor: pointer;
  background: var(--bg-color);
  padding: 0.5em;
  border-radius: 0.2em;
  margin-bottom: 0.5em;
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
.post-func{
  float: right;
  transition: opacity 0.3s;
  opacity: 0;
}
.post-func li{
  display: inline-block;
  margin-left: 0.5em
}
.post-func li:hover{
  cursor: pointer;
  color: red;
}
.post:hover .post-func{
  opacity: 1;
}
/* 进度条 */
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
.btn-post{
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
.post-seekbar-btn{
  cursor: pointer;
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
.fixed-editor::after{
  content: "";
  position: absolute;
  display: block;
  background: #fff;
  width: calc(100% + 2em);
  height: 100%;
  left: -1em;
  bottom: -2em;
}
.hide{
  display: none !important;
}
</style>
