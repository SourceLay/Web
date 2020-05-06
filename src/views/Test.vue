<template>
  <div class="test">
    <UserCard style="display: none" ref="userCard" />
    <p data-tippy-content>test</p>
    <p v-html="getPostTitle('[公告][新闻]123123')"></p>
  </div>
</template>

<script>
import UserCard from './../components/UserCard.vue'
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import { mapMutations } from 'vuex';
import { getPostTitle, getPostTag } from './../public'
export default {
  components: {
    UserCard
  },
  methods: {
    ...mapMutations([
      'setData'
    ]),
    getPostTitle,
    getPostTag
  },
  mounted() {
    let vue = this
    tippy('[data-tippy-content]', {
      onShow(instance) {
        vue.setData({
          key: 'username',
          value: '12345'
        })
        vue.$nextTick(() => {
          instance.setContent(vue.$refs.userCard.$el.innerHTML)
        })
      },
      allowHTML: true,
      arrow: false,
      theme: 'user-card'
    })
  }
}
</script>

<style>
  .test{
    margin: 10em;
  }
  p{
    display: inline-block;
  }
  .tippy-box[data-theme~='user-card']{
    font-size: 1em;
    background: none;
  }
  .tippy-box[data-theme~='user-card'] .tippy-content{
    padding: 0;
  }
</style>