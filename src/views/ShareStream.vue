<template>
    <div id="content">


        <transition name="fade">
        <div v-show="showDetail" id="pop" v-bind:style="fadeInStyle">
            <div id="pop-content">
                <div id="pop-title">
                    <svg t="1606829000232" class="icon" viewBox="0 0 1185 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16670" width="48" height="48"><path d="M107.789474 0h319.218526A129.347368 129.347368 0 0 1 529.246316 50.176L840.757895 452.715789H0V107.789474a107.789474 107.789474 0 0 1 107.789474-107.789474z" fill="#EB9B00" p-id="16671"></path><path d="M138.186105 183.242105h909.312c48.074105 0 65.482105 5.012211 82.997895 14.389895 17.623579 9.377684 31.420632 23.174737 40.798316 40.744421 9.377684 17.569684 14.389895 35.031579 14.389895 82.997895v564.439579c0 48.074105-5.012211 65.482105-14.389895 82.997894-9.377684 17.623579-23.174737 31.420632-40.744421 40.798316-17.569684 9.377684-35.031579 14.389895-82.997895 14.389895H138.132211c-48.074105 0-65.482105-5.012211-82.997895-14.389895a97.926737 97.926737 0 0 1-40.798316-40.744421C5.012211 951.242105 0 933.834105 0 885.867789V321.374316c0-48.074105 5.012211-65.482105 14.389895-82.997895 9.377684-17.623579 23.174737-31.420632 40.744421-40.798316 17.569684-9.377684 35.031579-14.389895 82.997895-14.389894z" fill="#F8B700" p-id="16672"></path></svg>
                    <h1>{{detail.filename}}</h1>
                    <div id="pop-bottomBar">
                        <div class="pop-button" @click="downloadFile(detail)">
                            <svg t="1607153907088" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4181" width="200" height="200"><path d="M236.615854 752.86913h-0.484162A241.500139 241.500139 0 0 1 0.538332 527.733676a238.78883 238.78883 0 0 1 64.684079-180.011531 242.081134 242.081134 0 0 1 149.025146-74.367324 298.534454 298.534454 0 0 1 596.003751 25.951097V300.95207a221.262156 221.262156 0 0 1 213.031398 233.075715 222.714643 222.714643 0 0 1-221.262156 209.1581h-3.098639a27.500417 27.500417 0 0 1 0-54.904001h2.711309A167.520145 167.520145 0 0 0 968.378705 531.219644a166.261323 166.261323 0 0 0-166.16449-175.363573 151.058627 151.058627 0 0 0-18.204502 1.065157 27.500417 27.500417 0 0 1-30.211725-30.308558 240.822312 240.822312 0 0 0 1.549319-27.306752 243.727285 243.727285 0 0 0-487.357738 0 27.500417 27.500417 0 0 1-27.403584 27.500417 185.627813 185.627813 0 0 0-185.240484 197.538205A186.30564 186.30564 0 0 0 237.100016 697.965129a27.500417 27.500417 0 0 1-0.484162 54.904001z" p-id="4182"></path><path d="M513.266174 1021.869686a27.500417 27.500417 0 0 1-27.500417-27.403584v-484.162268a27.500417 27.500417 0 1 1 54.904001 0v484.162268a27.403584 27.403584 0 0 1-27.403584 27.403584z" p-id="4183"></path><path d="M513.266174 1024a27.500417 27.500417 0 0 1-19.366491-8.037094L342.260061 864.129619a27.500417 27.500417 0 1 1 38.732981-38.732981L513.266174 957.766602l130.530147-130.336483a27.500417 27.500417 0 0 1 38.732981 38.732982L532.632664 1015.962906a27.403584 27.403584 0 0 1-19.36649 8.037094z" p-id="4184"></path></svg>
                            <p>下载</p>
                        </div>
                        <div class="pop-button">
                        <svg t="1607154088633" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6066" width="200" height="200"><path d="M915.456 790.601143l97.865143 97.792a36.571429 36.571429 0 0 1-51.785143 51.785143l-97.792-97.865143a329.142857 329.142857 0 1 1 51.712-51.712zM36.571429 73.142857h877.714285a36.571429 36.571429 0 1 1 0 73.142857H36.571429a36.571429 36.571429 0 0 1 0-73.142857z m0 365.714286h219.428571a36.571429 36.571429 0 0 1 0 73.142857h-219.428571a36.571429 36.571429 0 0 1 0-73.142857z m0 365.714286H292.571429a36.571429 36.571429 0 1 1 0 73.142857H36.571429a36.571429 36.571429 0 1 1 0-73.142857z m621.714285 36.571428a256 256 0 1 0 0-512 256 256 0 0 0 0 512z" p-id="6067"></path></svg>
                            <p>查看文件</p>
                        </div>
                        <div v-if="detail.isLiked===true" @click="like(detail.id, true)" class="pop-button">
                            <svg t="1607154189066" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7011" data-spm-anchor-id="a313x.7781069.0.i18" width="200" height="200"><path d="M566.686 455.5c-19.882 0-36-16.118-36-36a36 36 0 0 1 5.188-18.617c30.044-49.725 45.067-104.52 45.067-164.383 0-27.257-1.565-53.723-7.941-79-3.85-25-19.643-43-43.5-43s-43.23 19.206-43.497 43c-0.003 0.167-0.003 0.333-0.003 0.5 0 115-58.333 214.8-175 299.402V879.5c0 8.837 7.163 16 16 16h485.496a16 16 0 0 0 15.773-13.312l66.36-389.311c2.97-17.422-8.746-33.952-26.168-36.922a32 32 0 0 0-5.377-0.455H566.686z m392.31 39.133l-71.9 411.873c-5.348 30.637-31.946 52.994-63.046 52.994H97c-17.673 0-32-14.327-32-32v-504c0-17.673 14.327-32 32-32h178.43a64 64 0 0 0 39.35-13.527C385.03 323.203 420.77 249.88 422 158c0.004-0.167 0-0.333 0-0.5C422 98.13 470.13 50 529.5 50S626.532 94.692 637 157.5c2 12 7.94 51.925 7.94 79 0 55.13-11.556 107.56-32.38 155h259.747c48.601 0 88 39.399 88 88a88 88 0 0 1-1.31 15.133zM231 455.5h-87c-8.837 0-16 7.163-16 16v408c0 8.837 7.163 16 16 16h87c8.837 0 16-7.163 16-16v-408c0-8.837-7.163-16-16-16z" p-id="7012" fill="#d6204b"></path></svg>
                            <p style="color:red">{{detail.likedCount}}</p>
                        </div>
                        <div v-else-if="detail.isLiked===false" @click="like(detail.id, false)" class="pop-button">
                            <svg t="1607154189066" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7011" width="200" height="200"><path d="M566.686 455.5c-19.882 0-36-16.118-36-36a36 36 0 0 1 5.188-18.617c30.044-49.725 45.067-104.52 45.067-164.383 0-27.257-1.565-53.723-7.941-79-3.85-25-19.643-43-43.5-43s-43.23 19.206-43.497 43c-0.003 0.167-0.003 0.333-0.003 0.5 0 115-58.333 214.8-175 299.402V879.5c0 8.837 7.163 16 16 16h485.496a16 16 0 0 0 15.773-13.312l66.36-389.311c2.97-17.422-8.746-33.952-26.168-36.922a32 32 0 0 0-5.377-0.455H566.686z m392.31 39.133l-71.9 411.873c-5.348 30.637-31.946 52.994-63.046 52.994H97c-17.673 0-32-14.327-32-32v-504c0-17.673 14.327-32 32-32h178.43a64 64 0 0 0 39.35-13.527C385.03 323.203 420.77 249.88 422 158c0.004-0.167 0-0.333 0-0.5C422 98.13 470.13 50 529.5 50S626.532 94.692 637 157.5c2 12 7.94 51.925 7.94 79 0 55.13-11.556 107.56-32.38 155h259.747c48.601 0 88 39.399 88 88a88 88 0 0 1-1.31 15.133zM231 455.5h-87c-8.837 0-16 7.163-16 16v408c0 8.837 7.163 16 16 16h87c8.837 0 16-7.163 16-16v-408c0-8.837-7.163-16-16-16z" p-id="7012"></path></svg>
                            <p>{{detail.likedCount}}</p>
                        </div>
                      <div v-if="isSelf" class="pop-button" @click="deleteFile(detail)">
                        <svg t="1607323035300" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1812" width="200" height="200"><path d="M970.24 256h-301.44L592.64 160H431.36L355.2 256H53.76V192h270.72l76.16-96h222.72L699.52 192h270.72v64zM803.84 928H220.16L144 356.48l64-8.96 67.84 516.48h472.32l67.84-516.48 64 8.96-76.16 571.52z" fill="#2c2c2c" p-id="1813"></path><path d="M376.96 412.16h64v371.84h-64zM583.04 412.16h64v371.84h-64z" fill="#2c2c2c" p-id="1814"></path></svg>
                        <p>删除</p>
                      </div>
                    </div>
                </div>
                <div id="pop-passages">
                    <div id="pop-passages-item" v-for="item in detail.Passge" :key="item.id">
                        {{item.title}}
                    </div>
                    <post></post>
                </div>
            </div>
            <div v-on:click="showDetail=false" id="pop-close">
                <svg t="1607150466431" id="pop-close-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3274" width="200" height="200"><path d="M512.2 64.4c-247.4 0-447.9 200.6-447.9 448s200.5 447.9 447.9 447.9 447.9-200.5 447.9-447.9-200.5-448-447.9-448z m203.5 605.9c12.5 12.5 12.5 33.1 0 45.6s-33.1 12.5-45.6 0l-158-158-158 158c-12.5 12.5-33.1 12.5-45.6 0s-12.5-33.1 0-45.6l158-158-158-158c-12.5-12.5-12.5-33.1 0-45.6s33.1-12.5 45.6 0l158 158 158-158c12.5-12.5 33.1-12.5 45.6 0s12.5 33.1 0 45.6l-158 158 158 158z" p-id="3275" fill="#ffffff"></path></svg>
            </div>
        </div>
        </transition>


        <div id="top"/>
        <h1 id="title">文件分享大厅
          <el-checkbox v-model="isSelf" @click="GetSelfFile" size="medium" style="margin-left: 1em; z-index: 0;">只显示个人文件</el-checkbox>
        </h1>
        <div id="stream">
            <div @click="popDetail(card)" class="fileCard" v-for="card in cards" :key="card.id">
                <svg t="1606829000232" class="icon" viewBox="0 0 1185 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16670" width="48" height="48"><path d="M107.789474 0h319.218526A129.347368 129.347368 0 0 1 529.246316 50.176L840.757895 452.715789H0V107.789474a107.789474 107.789474 0 0 1 107.789474-107.789474z" fill="#EB9B00" p-id="16671"></path><path d="M138.186105 183.242105h909.312c48.074105 0 65.482105 5.012211 82.997895 14.389895 17.623579 9.377684 31.420632 23.174737 40.798316 40.744421 9.377684 17.569684 14.389895 35.031579 14.389895 82.997895v564.439579c0 48.074105-5.012211 65.482105-14.389895 82.997894-9.377684 17.623579-23.174737 31.420632-40.744421 40.798316-17.569684 9.377684-35.031579 14.389895-82.997895 14.389895H138.132211c-48.074105 0-65.482105-5.012211-82.997895-14.389895a97.926737 97.926737 0 0 1-40.798316-40.744421C5.012211 951.242105 0 933.834105 0 885.867789V321.374316c0-48.074105 5.012211-65.482105 14.389895-82.997895 9.377684-17.623579 23.174737-31.420632 40.744421-40.798316 17.569684-9.377684 35.031579-14.389895 82.997895-14.389894z" fill="#F8B700" p-id="16672"></path></svg>
                <h1>{{card.filename}}</h1>
                <div id="card-bottom">
                    <div v-if="card.isLiked===true" id="card-like" @click="like(card.id,true)">
                        <svg t="1607154189066"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7011" data-spm-anchor-id="a313x.7781069.0.i18" width="200" height="200"><path d="M566.686 455.5c-19.882 0-36-16.118-36-36a36 36 0 0 1 5.188-18.617c30.044-49.725 45.067-104.52 45.067-164.383 0-27.257-1.565-53.723-7.941-79-3.85-25-19.643-43-43.5-43s-43.23 19.206-43.497 43c-0.003 0.167-0.003 0.333-0.003 0.5 0 115-58.333 214.8-175 299.402V879.5c0 8.837 7.163 16 16 16h485.496a16 16 0 0 0 15.773-13.312l66.36-389.311c2.97-17.422-8.746-33.952-26.168-36.922a32 32 0 0 0-5.377-0.455H566.686z m392.31 39.133l-71.9 411.873c-5.348 30.637-31.946 52.994-63.046 52.994H97c-17.673 0-32-14.327-32-32v-504c0-17.673 14.327-32 32-32h178.43a64 64 0 0 0 39.35-13.527C385.03 323.203 420.77 249.88 422 158c0.004-0.167 0-0.333 0-0.5C422 98.13 470.13 50 529.5 50S626.532 94.692 637 157.5c2 12 7.94 51.925 7.94 79 0 55.13-11.556 107.56-32.38 155h259.747c48.601 0 88 39.399 88 88a88 88 0 0 1-1.31 15.133zM231 455.5h-87c-8.837 0-16 7.163-16 16v408c0 8.837 7.163 16 16 16h87c8.837 0 16-7.163 16-16v-408c0-8.837-7.163-16-16-16z" p-id="7012" fill="#d6204b"></path></svg>
                        <p style="color:red">{{card.likedCount}}</p>
                    </div>
                    <div v-else-if="card.isLiked===false" id="card-like" @click="like(card.id,false)">
                        <svg t="1607154189066" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7011" width="200" height="200"><path d="M566.686 455.5c-19.882 0-36-16.118-36-36a36 36 0 0 1 5.188-18.617c30.044-49.725 45.067-104.52 45.067-164.383 0-27.257-1.565-53.723-7.941-79-3.85-25-19.643-43-43.5-43s-43.23 19.206-43.497 43c-0.003 0.167-0.003 0.333-0.003 0.5 0 115-58.333 214.8-175 299.402V879.5c0 8.837 7.163 16 16 16h485.496a16 16 0 0 0 15.773-13.312l66.36-389.311c2.97-17.422-8.746-33.952-26.168-36.922a32 32 0 0 0-5.377-0.455H566.686z m392.31 39.133l-71.9 411.873c-5.348 30.637-31.946 52.994-63.046 52.994H97c-17.673 0-32-14.327-32-32v-504c0-17.673 14.327-32 32-32h178.43a64 64 0 0 0 39.35-13.527C385.03 323.203 420.77 249.88 422 158c0.004-0.167 0-0.333 0-0.5C422 98.13 470.13 50 529.5 50S626.532 94.692 637 157.5c2 12 7.94 51.925 7.94 79 0 55.13-11.556 107.56-32.38 155h259.747c48.601 0 88 39.399 88 88a88 88 0 0 1-1.31 15.133zM231 455.5h-87c-8.837 0-16 7.163-16 16v408c0 8.837 7.163 16 16 16h87c8.837 0 16-7.163 16-16v-408c0-8.837-7.163-16-16-16z" p-id="7012"></path></svg>
                        <p>{{card.likedCount}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="bottom">

        </div>
    </div>
</template>

<script>
import axios from "axios";
import {dzq} from "@/public";
import IncludedHelper from '../helpers/includedHelper'
import {globalErrorNotify} from "@/helpers/globalNotify";
export default {
  created() {
    // this.GetSelfFile();
    this.GetAllFile();
  },
  watch: {
    isSelf(newVal) {
      if (newVal) {
        this.GetSelfFile();
      } else {
        this.GetAllFile();
      }
    }
  },
  methods:{
        deleteFile(detail) {
          // TODO 所有文件的删除
          this.showDetail = false;
          axios.delete(dzq({
                name: 'sourcelay/fileshare/' + detail.id
              })
          ).then(response => {
            console.log(response)
          }).catch(err=>globalErrorNotify(this,err))
          // 更新界面
          for(let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].id == detail.id) {
              this.cards.splice(i,1);
              break;
            }
          }
          this.detail = {}
        },
        // 将card相关response转成card数据
        handleResponseCard(response) {
          //TODO post和included
          console.log('response')
          console.log(response);

          let includedInfo = new IncludedHelper(response.data.included);
          console.log('includedInfo')
          console.log(includedInfo)

          this.cards = [];
          response.data.data.forEach(fileShare => {
            let fileInfo = includedInfo.get('sourcelay-file.' + fileShare.attributes.file_id)
            console.log('fileShare')
            console.log(fileShare); // 这里拿出了分享信息
            console.log('fileInfo')
            console.log(fileInfo);  // 这里拿出了文件信息

            let threadsList = [];
            fileShare.relationships.threads.data.forEach(threadIndex => {
              threadsList.push(
                  includedInfo.get('threads.' + threadIndex.id)
              )
            })
            console.log('threadsList')
            console.log(threadsList);  // 这里列出了这个分享的所有的帖子信息

            let postsList = [];
            fileShare.relationships.posts.data.forEach(threadIndex => {
              postsList.push(
                  includedInfo.get('posts.' + threadIndex.id)
              )
            })
            console.log('postList')
            console.log(postsList);  // 这里列出了这个分享的所有的帖子信息

            this.cards.push({
              id: fileShare.attributes.id,
              type: fileInfo.attributes.type,
              filename: fileInfo.attributes.name,
              downloadLink: fileShare.attributes.downloadUrl ?? '',
              isLiked: fileInfo.attributes.is_liked ?? false,
              likedCount: fileInfo.attributes.likedCount ?? 0,
              Passge:[
                {link:"",title:"轩轩轩轩轩"},
                {link:"",title:"练练练练练"},
                {link:"",title:"源源源源源"}
              ]
            })

          })

        },
        // 获取属于自己的文件或全部文件
        GetSelfFile: function () {
          var that = this;
            this.cards = [];
            axios.get(
                dzq({
                  name: 'sourcelay/fileshare',
                  include: [
                    'file', 'posts', 'threads', 'user'
                  ],
                  filter: {
                    self: true,
                  }
                })
            ).then(response => that.handleResponseCard(response)).catch(err=>globalErrorNotify(that,err))
        },
        // 获取所有文件
        GetAllFile: function () {
          var that = this;
          this.cards = [];
          axios.get(
              dzq({
                name: 'sourcelay/fileshare',
                include: [
                  'file', 'posts', 'threads', 'user'
                ]
              })
          ).then(
              response => that.handleResponseCard(response)
          ).catch(err=>globalErrorNotify(this,err))
        },
        downloadFile:function (detail) {
            axios.get(detail.downloadLink, { responseType: 'blob' })
                .then(response => {
                  const blob = new Blob([response.data], { type: detail.type ?? 'application/octet-stream' })
                  const link = document.createElement('a')
                  link.href = URL.createObjectURL(blob)
                  link.download = detail.filename
                  link.click()
                  URL.revokeObjectURL(link.href)
                }).catch((err) => {
              globalErrorNotify(this, err);
            });
        },
        popDetail:function(item){
            this.detail=item;
            this.showDetail=true;
        },
        like:function(id, isLiked){
          var that = this;
          axios.patch(dzq({
            name: 'sourcelay/fileshare/' + id
          }), {
            data: {
              attributes: {
                is_liked: !isLiked
              }
            }
          }).then(res=>{
            console.log('like');
            console.log(res);
          })
          .catch( err =>
              globalErrorNotify(that, err)
          )
            var i;
            if(this.detail.isLiked){
                this.detail.isLiked=false;
                this.detail.likedCount--;
                for(i=0;i<this.cards.length;i++){
                    if(this.cards[i].id==i){
                        this.cards[i].isLiked=false;
                        this.cards[i].likedCount--;
                        break;
                    }
                }
            }
            else{
                this.detail.isLiked=true;
                this.detail.likedCount++;
                for(i=0;i<this.cards.length;i++){
                    if(this.cards[i].id==i){
                        this.cards[i].isLiked=true;
                        this.cards[i].likedCount++;
                        break;
                    }
                }
            }

            /*
             * 需要添加上传 点赞/取消点赞 信息给后端的代码
             */
        }
    },
    data(){
        return{
            isSelf: false,
            showDetail:false,
            fadeInStyle:{
                background: 'rgba(0, 0, 0, 0.4)'
            },
            detail:{},
            cards:[
                {id:0,type:"rar",filename:"hyt搞黄色",downloadLink:"",isLiked:true,likedCount:114514,
                    Passge:[
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"}
                    ]
                },
                {id:1,type:"rar",filename:"hyt搞黄色",downloadLink:"",isLiked:false,likedCount:114514,
                    Passge:[
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"}
                    ]
                },
                {id:2,type:"rar",filename:"hyt搞黄色",downloadLink:"",isLiked:false,likedCount:114514,
                    Passge:[
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"}
                    ]
                },
                {id:3,type:"rar",filename:"hyt搞黄色asdfsdafasdfasd发射点发射点发手动阀手动阀",downloadLink:"",isLiked:false,likedCount:114514,
                    Passge:[
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"}
                    ]
                },
                {id:4,type:"rar",filename:"hyt搞黄色",downloadLink:"",isLiked:false,likedCount:114514,
                    Passge:[
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"}
                    ]
                },
                {id:5,type:"rar",filename:"hyt搞黄色",downloadLink:"",isLiked:false,likedCount:114514,
                    Passge:[
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"}
                    ]
                },
                {id:6,type:"rar",filename:"hyt搞黄色",downloadLink:"",isLiked:false,likedCount:114514,
                    Passge:[
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"}
                    ]
                },
                {id:7,type:"rar",filename:"hyt搞黄色",downloadLink:"",isLiked:false,likedCount:114514,
                    Passge:[
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"}
                    ]
                },
                {id:8,type:"rar",filename:"hyt搞黄色",downloadLink:"",isLiked:false,likedCount:114514,
                    Passge:[
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"}
                    ]
                },
                {id:9,type:"rar",filename:"hyt搞黄色",downloadLink:"",isLiked:false,likedCount:114514,
                    Passge:[
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"}
                    ]
                },
                {id:10,type:"rar",filename:"hyt搞黄色",downloadLink:"",isLiked:false,likedCount:114514,
                    Passge:[
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"}
                    ]
                },
                {id:11,type:"rar",filename:"hyt搞黄色",downloadLink:"",isLiked:false,likedCount:114514,
                    Passge:[
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"}
                    ]
                },
                {id:12,type:"rar",filename:"hyt搞黄色",downloadLink:"",isLiked:false,likedCount:114514,
                    Passge:[
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"},
                        {link:"",title:"hyt干好事，加冰现场说法"},
                        {link:"",title:"震惊，hyt干好事视频泄露"}
                    ]
                }
            ]
        }
    }
}
</script>

<style scoped>
#pop{
    position: fixed;
    left:4em;
    right:0;
    top:0;
    bottom:0;
    background: rgba(0, 0, 0, 0.692);
    z-index: 1;
    display: flex;
    justify-content: center;
    padding-top:4em;
}
#pop-close{
    height:60px;
    width:60px;
    text-align: center;
    border-radius: 2em;
    margin:20px;
    transition: 100ms all;
}
#pop-close:hover{
    background:rgb(243, 55, 86);
}
#pop-close:active{
    background:rgb(248, 152, 168);
}
#pop-passages{
    width:800px;
    height:500px;
    background: rgb(255, 255, 255);
    border-radius: 0px 0px 5px 5px;
}
#pop-title{
    width:800px;
    height:120px;
    backdrop-filter:blur(10px);
    background:rgba(255, 255, 255, 0.8);
    border-radius: 5px 5px 0px 0px;
    display:grid;
    grid:50px 1fr / 60px 1fr;
    font-size:0.6em;
}
#pop-title h1{
    font-weight: normal;
    font-size:1.5em;
    padding-top:1em;
    grid-column: 2;
    grid-row: 1;
}
/* #pop-passages{
    display: flex;
    flex-direction: column;
    grid-row:2;
    grid-column-start:span 2;
    padding:60px;
} */
#pop-passages-item{
    padding: 5px;
    font-size: 0.8em;
}
#pop-bottomBar{
    grid-row:2;
    grid-column-start: span 2;
    display: flex;
    justify-content: center;
}
#pop-close-icon{
    margin:9px;
    width:2em;
    height:2em;
}
.pop-button{
    font-size:0.8em;
    display: flex;
    padding: 0px 20px;
    margin:4px;
    transition: 100ms all;
    user-select: none;
    border-radius: 5px;
}
.pop-button:hover{
    color:rgb(255, 255, 255);
    background: rgba(248, 101, 101, 0.979);
}

.pop-button:active{
    color:rgb(255, 255, 255);
    background: rgb(187, 52, 52);
}
.pop-button p{
    margin:auto 0px;
    font-size:1.5em;
}
.pop-button svg{
    margin:auto 10px;
    margin-left:0px;
}

#content{
    padding-left:4em;
    padding-top:4em;
}
#top{
    height:330px;
    background-image: url('../assets/shareStream.jpg');
}
#title{
    padding-left:100px;
    padding-top:40px;
    font-weight: normal;
    background-image: url('../assets/lvbaoshi.png') no-repeat bottom right;
}

#bottom{
    height:400px;
}
.icon{
    font-size: 2em;
    margin:20px;
}


#card-like{
    display: flex;
    width:70px;
    position:absolute;
    right:10px;
    bottom:10px;
    font-size:0.8em;
}
#card-like svg{
    width:2em;
    height:1.4em;
}
#card-like p{
    padding:5px 0px;
}
@media screen and (min-width: 800px) {
    .fileCard{
        padding:20px;
        margin:10px;
        background: RGB(238,238,238);
        border-radius: 4px;
        min-width:300px;
        max-width:320px;
        transition: 100ms all;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
    .fileCard h1{
        font-size:1em;
        padding-top:10px;
        flex-grow: 1;
    }
    #stream{
        padding:20px 50px;
        display:flex;
        flex-wrap: wrap;
    }
    .fileCard:hover{
        box-shadow: 0px 0px 10px #0f0f0f48;
        transform : scale(1.02);
    }
    #card-bottom{
        width:100%;
        height:50px;
        position:relative;
    }
}
@media screen and (max-width: 800px) {
    .fileCard{
        padding:20px;
        margin:10px;
        border-bottom:1px solid rgba(128, 128, 128, 0.192);
        width:95%;
        height:100px;
        transition: 100ms all;
        flex-grow: 1;
        display: flex;
        vertical-align: center;
    }
    .fileCard h1{
        margin:auto 0px;
        font-size:1em;
        flex-grow: 1;
    }

    #stream{
        padding:50px;
        display:flex;
        flex-wrap: wrap;
    }
    .fileCard:active{
        transform : scale(0.98);
    }
    #card-bottom{
        width:150px;
        height:50px;
        position:relative;
    }
}

</style>
