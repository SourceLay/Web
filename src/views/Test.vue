<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <p>{{status}}</p>
    <p>{{colorTheme}}</p>
    <p>{{test.t2}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  computed: {
    ...mapState([
      'status', 'colorTheme', 'test'
    ])
  },
  methods: {
    ...mapMutations([
      'setData'
    ])
  },
  mounted() {
    this.setData({
      key: 'status',
      value: 'test'
    })
    this.setData({
      key: 'colorTheme',
      value: 'test123'
    })
  }
}
</script>
