<template>
  <div class="index-bottom">
    <ul>
      <li>隐私和Cookies</li>
      <li>使用条款</li>
      <li>关于我们</li>
      <li>© 2019 派瑞派对</li>
    </ul>
  </div>
</template>

<script>
export default {
name: "Foot"
}
</script>

<style scoped>
/* 首页-版权 */
.index-bottom{
  height: 4em;
  background: var(--bg-color);
  color: var(--text-color);
  text-align: center;
  border-radius: 0.2em;
  margin-top: 1.5em;
}
.index-bottom li{
  line-height: 4em;
  list-style: none;
  display: inline-block;
  margin: 0 1em;
}
</style>
