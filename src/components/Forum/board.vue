<template>
  <ul class="posts">
    <h2 class="part-title">{{title}}</h2>
    <post v-for="post in posts" :post="post" :key="post.id" :included="included"/>
    <img v-if="posts === 0" class="empty" src="@/assets/empty.png" alt="">
  </ul>
</template>

<script>
import post from '@/components/Forum/post.vue'
export default {
  props: ['title', 'posts', 'included'],
  components: {
    post
  }
}
</script>

<style scoped>
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
</style>