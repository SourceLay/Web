<template>
  <div class="para-content">
    <div class="banner">
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <input @keyup.enter="goSearch" placeholder="输入以搜索……" v-model="search" type="text">
      </div>
    </div>
    <div class="content">
      <ul class="tags">
        <li class="menu-item-choose">全部</li>
        <li>用户</li>
        <li>帖子</li>
      </ul>
      <board :title="'相关用户' + userNum + '位'">
        <ul class="users">
          <li v-for="user in user" :key="user.id">
            <img :src="user.attributes.avatarUrl" alt="">
            <div class="user-info">
              <h1>{{user.attributes.username}}</h1>
              <p>粉丝数 {{user.attributes.fansCount}}</p>
            </div>
          </li>
        </ul>
      </board>
      <board :title="'相关帖子' + postNum + '条'" :posts="post" :included="included"/>
    </div>
  </div>
</template>

<script>
import board from '@/components/Forum/board.vue'
import axios from 'axios'
import { dzq } from '@/public'
export default {
  components: {
    board
  },
  data () {
    return {
      search: '',
      user: [],
      userNum: 0,
      post: [],
      postNum: 0,
      included: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    document.title = "搜索";

    let user
    let post
    let search = to.query.q

    let regexp = new RegExp(/tag:[^\s]+/g);
    let topics = '';
    let matches = search.matchAll(regexp)
    if (matches) {
      for (let match of matches) {
        console.log(match);
        topics = match[0].substr(4);
        break; // 指吃一个
      }
    }
    let searchStr = search.replace(regexp, ''); // 吃所有
    searchStr = searchStr.trim();

    console.log(topics);
    console.log(searchStr);

    axios.get(
      dzq({
        name: 'users',
        include: 'groups',
        sort: 'createdAt',
        page: {
          limit: 10
        },
        filter: {
          status: 'normal',
          username: `*${searchStr}*`
        }
      })
    ).then(response => {
      user = response.data
      let filter = {
            isApproved: 1,
            isDeleted: 'no',
            categoryId: 0,
            q: searchStr
          };
      if (topics !== '') {
        filter.topicId = topics;
      }
      axios.get(
        dzq({
          name: 'threads',
          include: ['user', 'user.groups', 'firstPost', 'lastPostedUser'],
          filter: filter,
          page: {
            number: 1,
            limit: 10
          }
        })
      ).then(response => {
        post = response.data
        next(vm => {
          vm.getSearch(user, post, search)
        })
      }).catch(() => {
        next(vm => {
            vm.getSearch(user, post, search)
          })
      });
    })
  },
  beforeRouteUpdate(to, from, next){
    let user
    let post
    let search = to.query.q

    let regexp = new RegExp(/tag:[^\s]+/g);
    let topics = '';
    let matches = search.matchAll(regexp)
    if (matches) {
      for (let match of matches) {
        console.log(match);
        topics = match[0].substr(4);
        break; // 指吃一个
      }
    }
    let searchStr = search.replace(regexp, ''); // 吃所有
    searchStr = searchStr.trim();

    console.log(topics);
    console.log(searchStr);

    axios.get(
      dzq({
        name: 'users',
        include: 'groups',
        sort: 'createdAt',
        page: {
          limit: 10
        },
        filter: {
          status: 'normal',
          username: `*${searchStr}*`
        }
      })
    ).then(response => {
      user = response.data
      let filter = {
            isApproved: 1,
            isDeleted: 'no',
            categoryId: 0,
            q: searchStr
          };
      if (topics !== '') {
        filter.topicId = topics;
      }
      axios.get(
        dzq({
          name: 'threads',
          include: ['user', 'user.groups', 'firstPost', 'lastPostedUser'],
          filter: filter,
          page: {
            number: 1,
            limit: 10
          }
        })
      ).then(response => {
        post = response.data
        this.getSearch(user, post, search)
        next()
      }).error(() => {
        this.getSearch(user, post, search)
        next()
      })
    })
  },
  methods: {
    getSearch (user, post, search) {
      this.search = search
      this.user = user.data
      this.userNum = user.meta.total
      this.post = post.data
      this.postNum = post.meta.threadCount
      if(user && typeof user.included != 'undefined'){
        user.included.forEach((item) => {
          this.included[item.type + '.' + item.id] = item
        })
      }
      if(post && typeof post.included != 'undefined'){
        post.included.forEach((item) => {
          this.included[item.type + '.' + item.id] = item
        })
      }
    },
    goSearch () {
      this.$router.push('?q=' + this.search)
    }
  }
}
</script>

<style scoped>
.para-content{
  margin-top: 4em;
}
.banner{
  display: flex;
  align-items: center;
  position: relative;
  height: 8em;
  box-sizing: border-box;
  background-image: linear-gradient( 135deg, #FAD7A1 10%, #E96D71 100%);
}
.search{
  width: 1200px;
  margin: 0 auto;
}
.search input{
  width: 100%;
  padding: 1em;
  padding-left: 3em;
  border: 0;
  outline: none;
  background: rgb(255 255 255 / 0.8);
}
.content{
  width: 1200px;
  margin: 0 auto;
  margin-top: 1em;
}
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

.users{
  display: flex;
  flex-wrap: wrap;
}
.users li{
  display: flex;
  background: #ddd;
  padding: 0.5em;
  height: fit-content;
  width: calc(100% / 5 - 1em);
  border-radius: 0.2em;
  margin: 0.5em;
}
.users img{
  width: 3.5em;
  height: 3.5em;
  border-radius: 50%;
  border: 0.1em solid #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
.user-info{
  margin-left: 0.5em;
  color: var(--text-color);
}
.user-info h1{
  font-size: 1em;
  font-weight: normal;
}
.user-info p{
  font-size: 0.8em;
  margin-top: 0.2em;
  opacity: 0.8;
}
.icon-sousuo{
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
  font-size: 1.5em;
  left: 0.5em;
}
</style>