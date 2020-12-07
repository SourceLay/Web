<template>
<div class="para-content">
  <!-- 首页-banner -->
  <el-dialog title="修改信息" :visible="setUserInfoVisible" @close="setUserInfoVisible=false">
    <SetUserInfo></SetUserInfo>
  </el-dialog>
  <div class="index-banner">
    <ul class="banner">
      <li v-for="(banner, index) in indexBanner" :key="index" :style="{'background': banner.background}" :class="[indexBannerActive === index ? 'banner-active' : '']">
        <div class="banner-content">
          <p>{{banner.subTitle}}</p>
          <h1>{{banner.title}}</h1>
          <a :href="banner.url">{{banner.btnText}}</a>
          <img :src="banner.image" alt="">
        </div>
      </li>
    </ul>
    <div class="banner-dots">
      <ul class="banner-dot">
        <li v-for="(banner, index) in indexBanner" :key="index" :class="[indexBannerActive === index ? 'banner-current' : '']" @mouseover="showIndexBanner(index)"></li>
      </ul>
    </div>
  </div>
  <!-- 首页-轮播和热点 -->
  <div class="block">
    <h2>
      <svg class="icon icon-hot" aria-hidden="true">
        <use xlink:href="#icon-hot"></use>
      </svg>社区动态<span class="title-tip">派瑞派对社区正式运营活动开启！</span>
    </h2>
    <div class="block-content">
      <!-- 轮播 -->
      <div @mouseover="sliderBar(1)" @mouseleave="sliderBar(0)" class="slidershow">
        <ul :style="{'transform': [sliderBarActive ? 'none' : 'translate(100%, 0)']}" class="slider-bar">
          <li @mouseover="showSlider(index)" :style="{'opacity' : [slidershowActive === index ? '1' : '0.5']}" v-for="(slider, index) in sliderContent" :key="index">
            <img :src="slider.image" alt="">
          </li>
        </ul>
        <ul :style="{'transform':'translateX(-' + 100 * slidershowActive + '%)'}" class="sliders">
          <li v-for="(slider, index) in sliderContent" :key="index" class="slider">
            <img :src="slider.image" alt="">
            <div class="slider-info">
              <p>{{slider.title}}</p>
              <p>{{slider.author}}</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 热点 -->
      <div class="posts">
        <ul class="posts-option">
          <li @mouseover="showPost(index)" v-for="(item, index) in postInfo" :key="index" :class="[postInfoActive === index ? 'option-active' : '']">{{item}}</li>
        </ul>
        <ul class="post postList">
          <li v-for="(item, index) in postInfoList" :key="index">
              <span class="post-num">{{index + 1}}</span>
              <router-link v-if="item.tid > 0" :to="{path: '/forums/topics/' + item.tid}">
                <span>{{item.title}}</span>
              </router-link>
              <div v-if="item.tid === 0">
                <span>{{item.title}}</span>
              </div>
              <!-- <router-link v-if="item.tid > 0" :to="{path: '/forums/topics/' + item.tid}">
                <span class="post-writer">{{item.author}}</span>
              </router-link> -->
              <!-- <div v-if="item.tid === 0"> -->
                <span class="post-writer">{{item.author}}</span>
              <!-- </div> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- 首页-论坛板块 -->
  <div v-for="(info, index) in boardInfo.data.children" :key="index" class="block">
    <h2>
      <svg :class="['icon', 'icon-' + info.icon]" aria-hidden="true">
        <use :xlink:href="'#icon-' + info.icon"></use>
      </svg>{{info.name}}<span class="title-tip">{{info.slogan}}</span>
    </h2>
    <div class="block-content">
        <ul class="boards">
          <li v-for="(board, index) in info.children" :key="index" class="board">
            <router-link :to="{path: '/forums/' + board.id}">
              <img v-if="board.icon === ''" src="../assets/mc.jpeg" alt="">
              <img v-if="board.icon !== ''" :src="board.icon" alt="">
              <p class="board-name">{{board.name}}<span class="board-today">({{board.activitiesDaily.threads}} / {{board.activitiesDaily.posts}})</span></p>
              <p class="board-slogan">{{board.slogan}}</p>
            </router-link>
          </li>
        </ul>
    </div>
  </div>
  <!-- 首页-底部 -->
  <div class="index-bottom">
    <ul>
      <li @click="setUserInfoVisible=true">隐私和Cookies</li>
      <li @click="payVisible=true">使用条款</li>
      <li @click="testNotify">关于我们</li>
      <li @click="shareListVisible=true">© 2019 派瑞派对</li>
    </ul>
  </div>
  <el-dialog width="80%" title="分享列表" :visible="shareListVisible" @close="shareListVisible=false">
    <ShareFileList></ShareFileList>
  </el-dialog>
</div>
</template>

<script>
import { mapState } from 'vuex'
import SetUserInfo from "@/components/SetUserInfo";
import axios from 'axios'
import { dzq } from '@/public'
import IncludedHelper from '../helpers/includedHelper'
import ShareFileList from "@/components/ShareFileList";
import globalNotify from "@/helpers/globalNotify";

export default {
  name: 'Home',
  components: {ShareFileList, SetUserInfo},
  data() {
    return {
      shareListVisible: false,
      setUserInfoVisible:false,
      payVisible: false,
      //当前banner
      indexBannerActive: 0,
      //当前轮播
      slidershowActive: 0,
      //激活轮播控制栏
      sliderBarActive: 0,
      //主题栏菜单
      postInfoActive: 0,
      //轮播图Timer
      sliderTimer: null,
      //banner内容
      indexBanner: [
        {
          subTitle: "这个寒假，一起哈啤！",
          title: "Server 鸽子号 is now online.",
          btnText: "立即前往 ▶",
          url: "",
          image: require('../assets/banner.png'),
          background: "linear-gradient( 135deg, #79F1A4 10%, #0E5CAD 100%)"
        }
      ],
      //轮播内容
      sliderContent: [
        {
          title: '标题1',
          author: '作者1',
          image: require('../assets/share.png'),
          tid: 0
        }
      ],
      //主题菜单
      postInfo: [
        '最新主题', '最新回复', '热门主题'
      ],
      postInfoList: [
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
      ],
      postInfoListPending: [[
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
      ],[
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
      ],[
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
        {title:"", author:"", tid:0},
      ],]
    }
  },
  computed: {
    ...mapState([
      'boardInfo'
    ]),

  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.homePageRecommended();
    })
  },
  methods: {
    testNotify() {
      // this.$notify({
      //   title: '提示',
      //   message: '这是一条不会自动关闭的消息',
      //   duration: 0
      // });
      globalNotify(this);
    },
    showIndexBanner(index) {
      this.indexBannerActive = index
    },
    showSlider(index) {
      this.slidershowActive = index
    },
    roundSlider() {
      this.sliderTimer = setInterval(() => {
        let max = this.sliderContent.length
        this.slidershowActive = (this.slidershowActive + 1) % max
      },5000)
    },
    sliderBar(e) {
      this.sliderBarActive = e
      if(e){
        clearInterval(this.sliderTimer)
      }else{
        this.roundSlider()
      }
    },
    showPost(e) {
      this.postInfoActive = e
      this.postInfoList = this.postInfoListPending[this.postInfoActive];
    },
    homePageRecommended(){
      axios.get(
        dzq({name: 'paraparty/homepage'})
      ).then(response => {
        let includedInfo = new IncludedHelper(response.data.included);

        this.homePageRecommendedFormat(0, response.data.data.relationships.latestThreads, includedInfo);
        this.homePageRecommendedFormat(1, response.data.data.relationships.latestReplied, includedInfo);
        this.homePageRecommendedFormat(2, response.data.data.relationships.hottestThreads, includedInfo);

        this.postInfoList = this.postInfoListPending[this.postInfoActive];
        console.log(this.postInfoListPending);

        this.homePageBannersInit(response.data.data.relationships.banners, includedInfo);
        this.homePageSlidersInit(response.data.data.relationships.sliders, includedInfo);

      });
    },homePageRecommendedFormat(index, data, includedInfo){
        data = data.data;
        for (let i = 0; i < data.length; i++) {
          let thread = includedInfo.get(data[i].type + '.' + data[i].id);
          this.postInfoListPending[index][i].title = thread.attributes.title;
          this.postInfoListPending[index][i].tid = thread.id;
          let author = thread.relationships.user.data;
          author = includedInfo.get(author.type + '.' + author.id);
          this.postInfoListPending[index][i].author = author.attributes.username;
          this.postInfoListPending[index][i].uid = author.id;
          this.postInfoListPending[index][i].activited = true;
        }
    },homePageBannersInit(data, includedInfo) {
      let tmpBanners = [];
      for (let s of data.data) {
        let item = includedInfo.get(s.type + '.' + s.id);
        let tmp = {
          title: item.attributes.title,
          subTitle: item.attributes.subTitle,
          btnText: item.attributes.btnText,
          url: item.attributes.url,
          image: item.attributes.image,
          background: item.attributes.background,
        }
        tmpBanners.push(tmp);
      }
      this.indexBanner = tmpBanners;
    },homePageSlidersInit(data, includedInfo) {
      let tmpSliders = [];
      for (let s of data.data) {
        let item = includedInfo.get(s.type + '.' + s.id);
        let tmp = {
          title: item.attributes.title,
          author: item.attributes.author,
          image: item.attributes.image,
          tid: item.attributes.thread_id,
        }
        tmpSliders.push(tmp);
      }
      this.sliderContent = tmpSliders;
    }
  },
  mounted() {
    //轮播
    let roundIndexBanner = () => {
      setInterval(() => {
        let max = this.indexBanner.length
        this.indexBannerActive = (this.indexBannerActive + 1) % max
      },10000)
    }
    roundIndexBanner()
    this.roundSlider()
  }
}
</script>
<style scoped>
.index-banner{
  margin-top: 4em;
  position: relative;
}
.banner{
  position: relative;
  height: 20em;
}
.banner-content{
  position: relative;
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.banner li{
  position: absolute;
  list-style: none;
  width: 100%;
  height: 20em;
  opacity: 0;
  transition: opacity 0.3s;
}
.banner-active{
  opacity: 1 !important;
}
.banner h1{
  margin-bottom: 0.8em;
  margin-top: 0.25em;
  color: var(--dark-color);
  letter-spacing: 0.05em;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
}
.banner p{
  font-weight: bold;
  letter-spacing: 0.2em;
  color: var(--dark-color);
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
}
.banner a{
  color: #fff;
  text-decoration: none;
  background: #333;
  width: max-content;
  padding: 1em 1.5em;
  border-radius: 3em;
  letter-spacing: 0.2em;
}
.banner img{
  max-height: 22em;
  position: absolute;
  right: 5em;
  bottom: 0;
}
.banner-dots{
  position: absolute;
  bottom: 1.5em;
  width: 100%;
}
.banner-dot{
  width: 1200px;
  max-width: calc(100% - 9em);
  margin: 0 auto;
  text-align: right;
}
.banner-dot li{
  display: inline-block;
  list-style: none;
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  border-radius: 1em;
  cursor: pointer;
  border: 2px solid #fff;
}
.banner-current{
  background: #fff;
}
/* 首页-区块 */
.block{
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
}
.block h2{
  margin: 0.5em 0;
  letter-spacing: 0.2em;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  color: var(--dark-color);
  font-weight: normal;
}
.title-tip{
  font-size: 0.6em;
  vertical-align: middle;
  letter-spacing: 0;
  color: var(--text-color);
  margin-left: 0.5em;
  text-shadow: none;
}
.block-content{
  display: flex;
}
/* 首页-论坛header */
.slidershow{
  position: relative;
  width: 28em;
  height: 16em;
  overflow: hidden;
  border-radius: 0.2em;
  transition: transform 0.3s;
}
.sliders{
  height: 100%;
  white-space: nowrap;
  transition: transform 0.6s;
}
.slider{
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
}
.slider-info{
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 0.5em;
  color: var(--line-color);
  background: rgba(0, 0, 0, 0.5);
}
.slider img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.slider-writer{
  font-size: 0.8em;
  opacity: 0.8;
}

.slider-bar{
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  right: 0;
  height: 100%;
  padding: 0.5em;
  z-index: 1;
  background: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0.9) 100%);
  transition: transform 0.3s;
}
.slider-bar li{
  list-style: none;
}
.slider-bar img{
  width: 3em;
  height: 2em;
  border-radius: 0.2em;
  border: 0.1em solid #fff;
  transition: opacity 0.3s;
}
.posts{
  width: calc(100% - 29em);
  background: var(--bg-color);
  margin-left: 1em;
  padding: 0.5em;
  border-radius: 0.2em;
}
.posts-option{
  margin-left: 0.5em;
  margin-top: -2.7em;
}
.posts-option li{
  display: inline-block;
  letter-spacing: 0.1em;
  margin-right: 0.5em;
  font-weight: bold;
  color: var(--text-color);
  text-shadow: 1px 0px 10px rgba(0, 0, 0, 0.2);
}
.option-active{
  color: var(--main-color) !important;
}
.post{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% + 0.5em);
  margin-top: 1.2em;
}
.post li{
  line-height: 1.65em;
  margin: 0.1em 0;
  padding: 0 0.5em;
  list-style: none;
  color: var(--text-color);
  border-radius: 0.2em;
  font-size: 0.9em;
  cursor: pointer;
}
.post li:hover{
  color: var(--main-color);
}
.post li:nth-child(even){
  background: var(--item-color);
}
.post-num{
  font-size: 1em !important;
  font-weight: bold;
  margin-right: 0.5em;
}
.post-writer{
  float: right;
  opacity: 0.6;
}
/* 论坛-板块 */
.boards{
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.board{
  list-style: none;
  width: calc(20% - 0.5em);
  height: 10em;
  background: var(--bg-color);
  border-radius: 0.2em;
  color: var(--text-color);
  transition: background 0.3s;
  cursor: pointer;
  margin-right: 0.6em;
  margin-top: 0.6em;
}
.board a{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: inherit;
  text-decoration: none;
}
.board:hover{
  background: var(--item-color);
}
.board:nth-child(5n + 5){
  margin-right: 0;
}
.board img{
  width: 4em;
  height: 4em;
  object-fit: cover;
  border-radius: 50%;
  border: 0.1em solid #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5em;
}
.board-name{
  color: var(--main-color);
  text-shadow: 1px 0px 10px rgba(0, 0, 0, 0.2);
}
.board-today{
  margin-left: 0.2em;
  font-size: 0.9em;
  opacity: 0.8;
}
.board-slogan{
  margin-top: 0.2em;
  font-size: 0.9em;
}
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
.iconfont{
  display: inline-block;
  width: 1.2em;
}
.icon{
  font-size: 1.3em;
  margin-right: 0.2em;
  vertical-align: text-bottom;
}
.postList a{
    color: var(--link-normal);
    text-decoration: none;
    transition: color 0.3s;
}
.postList a:hover {
    color: var(--link-highlight);
}
.postList a:visited {
    color: var(--link-visited);
}
</style>
