<template>
  <div>
    <div class="user-card">
      <!-- TODO 改成更优雅的版本 -->
      <img class="avatar" v-if="popUser.avatarUrl === ''" src="../assets/avatar.png" alt=""/>
      <img class="avatar" v-if="popUser.avatarUrl !== ''"
                          :src="popUser.avatarUrl" alt=""/>
      <!-- TODO 背景-->
      <img class="bg" src="../assets/mc.jpg" alt="">
      <div class="user-info">
        <p class="user-name">{{popUser.username}}</p>
        <p class="user-intro">{{popUser.signature}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'popUser'
    ])
  }
}
</script>

<style scoped>
  .user-card{
    display: flex;
    position: relative;
    padding: 0.5em;
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
    z-index: -1;
    object-fit: cover;
    filter: brightness(0.5);
  }
  .user-info{
    display: inline-block;
  }
  .user-name{
    font-size: 1.1em;
  }
  .user-intro{
    font-size: 0.8em;
    opacity: 0.8;
  }
</style>
