<template>
  <div class="para-content">
    <div class="banner">
      <div class="search">
        <input placeholder="输入以搜索……" type="text">
      </div>
    </div>
    <div class="content">
      <ul class="tags">
        <li class="menu-item-choose">全部</li>
        <li>用户</li>
        <li>帖子</li>
      </ul>
      <ul class="posts">
        <h2 class="part-title">用户</h2>
        <ul class="users">
          <li class="user-card">
            <img class="bg" src="../assets/mc.jpg" alt="">
            <img class="avatar" src="../assets/avatar.png" alt=""/>
            <div class="user-info">
              <p class="user-name">陆陆侠</p>
              <p class="user-intro">粉丝：12</p>
            </div>
          </li>
          <li class="user-card">
            <img class="bg" src="../assets/mc.jpg" alt="">
            <img class="avatar" src="../assets/avatar.png" alt=""/>
            <div class="user-info">
              <p class="user-name">陆陆侠</p>
              <p class="user-intro">粉丝：12</p>
            </div>
          </li>
        </ul>
      </ul>
      <ul class="posts">
        <h2 class="part-title">帖子</h2>
        <li class="post">
          <div class="post-tag">
            <p class="tag tag-default"></p>
          </div>
          <div class="post-title">
            <h2>123123</h2>
            <p>123123</p>
          </div>
          <div class="post-other">
            <div class="post-info">
              <p>
                作者：
                <span class="user">
                  123123
                </span>
              </p>
              <p>123 回复 / 123 浏览</p>
            </div>
            <div class="post-time">
              <p>
                最后一次回复：
                <span class="user">
                  123
                </span>
              </p>
              <p class="time">123</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

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
.user-card{
  display: inline-flex;
  position: relative;
  padding: 0.5em;
  margin: 0.5em;
  width: 15em;
  height: 4.6em;
  border-radius: 0.2em;
  overflow: hidden;
}
.avatar{
  width: 3.5em;
  height: 3.5em;
  border-radius: 50%;
  border: 0.1em solid #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin-right: 0.5em;
}
.bg{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
  filter: brightness(0.7);
}
.user-info{
  display: inline-block;
  color: #fff;
}
.user-name{
  font-size: 1.1em;
}
.user-intro{
  font-size: 0.8em;
  opacity: 0.8;
}
</style>