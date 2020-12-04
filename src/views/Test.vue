<template>
  <div class="test">
    <UserCard style="display: none" ref="userCard" />
    <p v-html="test"></p>
    <p>{{abc}}</p>
    <p>{{tester}}</p>
  </div>
</template>

<script>
import UserCard from './../components/UserCard.vue'
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import { mapMutations } from 'vuex';
import { getPostTitle, getPostTag } from '@/public'
export default {
  components: {
    UserCard
  },
  data() {
    return {
      abc: 123,
      tester: 'url'
    }
  },
  methods: {
    ...mapMutations([
      'setData', 'test'
    ]),
    getPostTitle,
    getPostTag,
    dzq(e) {
      let url = ''
      let parts = []
      Object.keys(e).forEach((item, index) => {
        if(index === 0){
          url = '/api/' + e[item] + '?'
        }
        if(e[item] instanceof Array){
          parts.push(item + '=' + e[item].join(','))
        }else{
          if(e[item] instanceof Object){
            let objectPart = []
            Object.keys(e[item]).forEach(key => {
              objectPart.push(item + '[' + key + ']=' + e[item][key])
            })
            parts.push(objectPart.join('&'))
          }
        }
      })
      url += parts.join('&')
      console.log(parts)
      return url
    }
  },
  computed: {
    test: function() {
      console.log(this)
      return 233
    }
  },
  mounted() {
    this.tester = this.dzq({
                    name: 'threads',
                    include: ['user', 'firstPost'],
                    filter: {
                      type: 1,
                      isDeleted: 'no'
                    }
                  })
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
