<template>
  <div class="para-content">
    <!-- 首页-banner -->
    <div class="index-banner">
      <ul class="banner">
        <li v-for="(banner, index) in indexBanner" :key="index" :style="{'background': banner[5]}" :class="[indexBannerActive == index ? 'banner-active' : '']">
          <div class="banner-content">
            <p>{{banner[0]}}</p>
            <h1>{{banner[1]}}</h1>
            <a :href="banner[3]">{{banner[2]}}</a>
            <img :src="require('../assets/' + banner[4])" alt="">
          </div>
        </li>
      </ul>
      <div class="banner-dots">
        <ul class="banner-dot">
          <li v-for="(banner, index) in indexBanner" :key="index" :class="[indexBannerActive == index ? 'banner-current' : '']" @mouseover="showIndexBanner(index)"></li>
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
            <li @mouseover="showSlider(index)" :style="{'opacity' : [slidershowActive == index ? '1' : '0.5']}" v-for="(slider, index) in sliderContent" :key="index">
              <img :src="require('../assets/' + slider[2])" alt="">
            </li>
          </ul>
          <ul :style="{'transform':'translateX(-' + 100 * slidershowActive + '%)'}" class="sliders">
            <li v-for="(slider, index) in sliderContent" :key="index" class="slider">
              <img :src="require('../assets/' + slider[2])" alt="">
              <div class="slider-info">
                <p>{{slider[0]}}</p>
                <p>{{slider[1]}}</p>
              </div>
            </li>
          </ul>
        </div>
        <!-- 热点 -->
        <div class="posts">
          <ul class="posts-option">
            <li @mouseover="showPost(index)" v-for="(item, index) in postInfo" :key="index" :class="[postInfoActive == index ? 'option-active' : '']">{{item}}</li>
          </ul>
          <ul class="post">
            <li>
              <span class="post-num">1</span>
              <span>[我的世界] 为什么这个村民在哭？</span>
              <span class="post-writer">陆陆侠</span>
            </li>
            <li>
              <span class="post-num">2</span>
              <span>[板块名] 主题名</span>
              <span class="post-writer">发帖人</span>
            </li>
            <li><span class="post-num">3</span>[板块名] 主题名</li>
            <li><span class="post-num">4</span>[板块名] 主题名</li>
            <li><span class="post-num">5</span>[板块名] 主题名</li>
            <li><span class="post-num">6</span>[板块名] 主题名</li>
            <li><span class="post-num">7</span>[板块名] 主题名</li>
            <li><span class="post-num">8</span>[板块名] 主题名</li>
            <li><span class="post-num">9</span>[板块名] 主题名</li>
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
              <!-- 这里可以套娃展开，但是实际上没必要 -->
              <img src="../assets/mc.jpeg" alt="">
              <p class="board-name">{{board.name}}<span class="board-today">({{board.activitiesDaily.threads}} / {{board.activitiesDaily.posts}})</span></p>
              <p class="board-slogan">{{board.slogan}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
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
        [
          "这个寒假，一起哈啤！",
          "Server 鸽子号 is now online.",
          "立即前往 ▶",
          "",
          "banner.png",
          "linear-gradient( 135deg, #79F1A4 10%, #0E5CAD 100%)"
        ],
        [
          "众人喜笑颜开",
          "Hyt搞黄色，快来欣赏",
          "立即前往 ▶",
          "",
          "banner.png",
          "linear-gradient( 135deg, #FDEB71 10%, #F8D800 100%)"
        ],
        [
          "喜闻乐见",
          "剑羽十年努力，终于成为太空人！",
          "立即前往 ▶",
          "",
          "banner.png",
          "linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%)"
        ]
      ],
      //轮播内容
      sliderContent: [
        [
          '标题1',
          '作者1',
          'share.png'
        ],
        [
          '标题2',
          '作者2',
          'share.png'
        ],
        [
          '标题3',
          '作者3',
          'share.png'
        ],
        [
          '标题4',
          '作者4',
          'share.png'
        ],
        [
          '标题5',
          '作者5',
          'share.png'
        ]
      ],
      //主题菜单
      postInfo: [
        '最新主题', '最新回复', '热门主题'
      ]
    }
  },
  computed: {
    ...mapState([
      'boardInfo'
    ]),

  },
  methods: {
    showIndexBanner(index) {
      this.indexBannerActive = index
    },
    showSlider(index) {
      this.slidershowActive = index
    },
    roundSlider() {
      let max = this.sliderContent.length
      this.sliderTimer = setInterval(() => {
        this.slidershowActive ++
        if(this.slidershowActive == max){
          this.slidershowActive = 0
        }
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
    }
  },
  mounted() {
    //轮播
    let roundIndexBanner = () => {
      let max = this.indexBanner.length
      setInterval(() => {
        this.indexBannerActive ++
        if(this.indexBannerActive == max){
          this.indexBannerActive = 0
        }
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
  margin-bottom: 1em;
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
  background: rgb(0, 0, 0, 0.5);
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
.iconfont{
  display: inline-block;
  width: 1.2em;
}
.icon{
  font-size: 1.3em;
  margin-right: 0.2em;
  vertical-align: text-bottom;
}
</style>
