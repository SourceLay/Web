<template>
  <router-link :to="{path: '/forums/topics/' + post.id}">
    <li class="post">
      <UserCard style="display: none" ref="userCard" />
      <div class="post-tag">
        <p :class="['tag', getPostTag(post.relationships.user.data.id, post.attributes.title, post.attributes.isEssence)]"></p>
      </div>
      <div class="post-title">
        <h2 v-html="getPostTitle(post.attributes.title)"></h2>
        <p>{{getContent(included['posts.' + post.relationships.firstPost.data.id].attributes.content)}}</p>
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
    </li>
  </router-link>
</template>

<script>
import UserCard from '@/components/UserCard.vue'
import { mapMutations } from 'vuex'
import { getPostTitle, getPostTag, getTime } from '@/public'
import tippy from 'tippy.js';
import XBBCODE from '../../xbbcode'
import 'tippy.js/dist/tippy.css'; // optional for styling

export default {
  props: ['post', 'included'],
  components: {
    UserCard
  },
  methods: {
    getPostTitle,
    getPostTag,
    getTime,
    ...mapMutations([
      'setData'
    ]),
    getContent(content) {
      return XBBCODE().process({
        text: content,
        removeMisalignedTags: false,
        addInLineBreaks: true,
        clean: true
      }).clean;
    }
  },
  mounted () {
    let vue = this
    tippy('[tippy-user]', {
      onShow(instance) {
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
  }
}
</script>

<style scoped>
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
.post-title >>>a{
  color: inherit;
  text-decoration: none;
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
</style>