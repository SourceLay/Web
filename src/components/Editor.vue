<template>
  <div :class="[$route.name === 'Topic' ? 'topic' : '']" class="editor">
    <!-- 加载图片 -->
    <input @change="changeImage()" ref="load_pic" type="file" multiple accept="image/jpg,image/jpeg,image/png,image/gif" style="display: none">
    <!-- 顶部工具栏 -->
    <div class="editor-header">
      <div @click="closeEditor" class="header-btn close">
        <i class="iconfont icon-guanbi"></i>
      </div>
      <div v-if="$route.name === 'Topic'" @click="changeFixed" :style="{opacity: fixedEditor ? '1' : '0.5'}" class="header-btn fixed">
        <i class="iconfont icon-guding"></i>
      </div>
    </div>
    <!-- 主要区域 -->
    <div class="editor-area">
      <!-- 编辑 -->
      <div class="input">
        <!-- 预览区 -->
        <div @click="closePreview" v-if="preview" v-html="preview" class="preview bbcode"></div>
        <!-- 提示 -->
        <div :class="['error', isError ? 'error-open' : '']">
          <p>{{error}}</p>
        </div>
        <!-- 输入框 -->
        <input v-if="!preview" v-model="title" placeholder="标题…" type="text">
        <textarea v-if="!preview" v-model="content" ref="content" :placeholder="[replyData ? '回复#' + replyData.floor : '正文…']"></textarea>
      </div>
      <!-- 底部工具 -->
      <div class="btns">
        <ul class="btns-left">
          <li v-for="(tool, index) in toolInfo" :key="tool.name" @mouseleave="closetool" class="item">
            <i @click="add(tool.action)" @mouseover="opentool(index)" :class="['icon-' + tool.name, 'iconfont']"></i>
            <div v-if="toolIndex === index" class="tool">
              <ul v-if="tool.optionType === 'color'" :class="['tool-' + tool.optionType, 'tool-content']">
                <li @click="add(tool.action, tool.actionValue[index])" v-for="(option, index) in tool.option" :key="index" :class="[option]"></li>
              </ul>
              <ul v-else :class="['tool-' + tool.optionType, 'tool-content']">
                <li @click="add(tool.action, tool.actionValue[index])" v-for="(option, index) in tool.option" :key="index">{{option}}</li>
              </ul>
            </div>
          </li>
        </ul>
        <!-- 按钮 -->
        <ul class="btns-right">
          <li @click="send" :class="['btn', 'btn-send', sendLoad ? 'btn-load' : '']">发送</li>
          <li @click="showPreview" class="btn btn-preview">预览</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import XBBCODE from '.././xbbcode'
export default {
  name: 'editor',
  props: [
    'replyData'
  ],
  data: function() {
    return {
      inTopic: 0,
      title: '',
      content: '',
      toolIndex: -1,
      toolInfo: [
        {
          name: 'ziti',
          optionType: 'list',
          action: 'size',
          option: ['中', '大', '特大'],
          actionValue: ['m', 'l', 'xl']
        },
        {
          name: 'yanse',
          optionType: 'color',
          action: 'color',
          option: ['red', 'yellow', 'green', 'blue', 'purple'],
          actionValue: ['red', 'yellow', 'green', 'blue', 'purple']
        },
        {
          name: 'xieti',
          optionType: 'tip',
          action: 'i',
          option: ['斜体']
        },
        {
          name: 'jiacu',
          optionType: 'tip',
          action: 'b',
          option: ['加粗']
        },
        {
          name: 'shanchuxian',
          optionType: 'tip',
          action: 'del',
          option: ['删除线']
        },
        {
          name: 'lianjie',
          optionType: 'tip',
          action: 'url',
          option: ['链接']
        },
        {
          name: 'masaike',
          optionType: 'tip',
          action: 'black',
          option: ['黑幕']
        },
        {
          name: 'mokuai',
          optionType: 'list',
          action: 'mod',
          option: ['音乐', '视频'],
          actionValue: ['music', 'video']
        },
      ],
      preview: '',
      sendLoad: 0,
      isError: 0,
      error: '',
    }
  },
  computed: {
    ...mapState([
      'fixedEditor'
    ])
  },
  methods: {
    ...mapMutations([
      'setData'
    ]),
    closeEditor: function() {
      this.setData({
        key: 'showEditor',
        value: 0
      })
    },
    changeFixed: function() {
      this.setData({
        key: 'fixedEditor',
        value: !this.fixedEditor
      })
    },
    opentool: function(e) {
      this.toolIndex = e
    },
    closetool: function() {
      this.toolIndex = -1
    },
    showPreview: function() {
      let parser = XBBCODE();
      this.preview = parser.process({
        text: this.content,
        removeMisalignedTags: false,
        addInLineBreaks: true
      }).html
    },
    closePreview: function() {
      this.preview = ''
    },
    add: function(action, actionValue) {
      //console.log(action + ' ' + actionValue)
      var bbcodeL, bbcodeR
      if(['i','b','del','url','black'].includes(action)){
        console.log('选择了无属性项目' + action)
        bbcodeL = '[' + action + ']'
      }else if(typeof actionValue != 'undefined'){
        console.log('选择了带属性项目' + action + '属性为' + actionValue)
        if(action === 'img' && actionValue === 'local'){
          this.$refs.load_pic.files = null
          this.$refs.load_pic.click()
          return
        }
        bbcodeL = '[' + action + '=' + actionValue + ']'
      }else{
        return
      }
      bbcodeR = '[/' + action + ']'

      var content = this.$refs.content
      if(content.selectionStart === content.selectionEnd){
        var oldSelection = content.selectionStart
        this.content = this.content.slice(0, content.selectionStart) + bbcodeL + bbcodeR + this.content.slice(content.selectionStart)
        this.$refs.content.focus()
        this.$nextTick(function(){
          content.setSelectionRange(oldSelection + bbcodeL.length, oldSelection + bbcodeL.length)
        })
      }else{
        var oldSelectionStart = content.selectionStart
        var oldSelectionEnd = content.selectionEnd
        this.content = this.content.slice(0, content.selectionStart) + bbcodeL + this.content.slice(content.selectionStart, content.selectionEnd) + bbcodeR + this.content.slice(content.selectionEnd)
        this.$refs.content.focus()
        this.$nextTick(function(){
          content.setSelectionRange(oldSelectionStart, oldSelectionEnd + bbcodeL.length + bbcodeR.length)
        })
      }

    },
    send() {
      this.sendLoad = 1
      if(this.$route.name === 'Forum'){
        if(!this.title || !this.content){
          this.isError = 1
          this.error = '标题或正文为空！'
        }else{
          this.axios.post('/api/threads', {
            data: {
              attributes: {
                type: 1,
                title: this.title,
                content: this.content
              },
              relationships: {
                category: {
                  data: {
                    id: this.$route.params.id,
                    type: "categories",
                  }
                }
              }
            }
          }).then(response => {
            window.location.href = '/forums/topics/' + response.data.data.id
          }).catch(error => {
            this.isError = 1
            this.error = error.response.data.errors[0].detail[0]
          })
        }
      }else if(this.$route.name === 'Topic'){
        if(!this.content){
          this.isError = 1
          this.error = '正文为空！'
        }else{
          let attr = {}
          attr.content = this.content
          if(this.replyData){
            attr.replyId = this.replyData.id
          }
          this.axios.post('/api/posts', {
            data: {
              attributes: attr,
              relationships: {
                thread: {
                  data: {
                    id: this.$route.params.id,
                    type: "threads",
                  }
                }
              }
            }
          }).then(response => {
            this.content = null
            this.$emit('sendPost', response.data)
          }).catch(error => {
            this.isError = 1
            this.error = error.response.data.errors[0].detail[0]
          })
        }
      }
      setTimeout(() => {
        this.isError = 0
        this.sendLoad = 0
      }, 2000);
    },
    changeImage() {
      let files = this.$refs.load_pic.files
      let content = this.$refs.content
      files.forEach(e => {
        let data = new FormData()
        this.content = this.content.slice(0, content.selectionStart) + '[img=' + e.name +']上传中[/img]\n' + this.content.slice(content.selectionStart)
        data.append('type', 1)
        data.append('order', 2)
        data.append('file', e)
        this.axios.post('/api/attachments', data).then(response => {
          let data = response.data.data.attributes
          this.content = this.content.replace('[img=' + e.name +']上传中[/img]', '[img=' + e.name +']' + data.url + '[/img]')
        }).catch(error => {
          this.isError = 1
          this.error = error.response.data.errors[0].detail[0]
        })
      })
    }
  }
}
</script>

<style scoped>
/* 编辑器 */
.editor{
  position: fixed;
  height: 20em;
  width: 100%;
  bottom: 0;
  background: var(--base-color);
  box-shadow: 0px -5px 15px -10px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
/* 编辑器菜单部分 */
.editor-header{
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
.header-btn{
  position: absolute;
  width: 2.5em;
  height: 2.5em;
  line-height: 2.5em;
  right: 1.5em;
  top: -2em;
  border-radius: 0.2em 0.2em 0 0;
  background: var(--main-color);
  z-index: -1;
  text-align: center;
  color: #fff;
  transition: transform 0.3s;
}
.header-btn:hover{
  transform: translate(0, -0.5em);
}
/* 编辑器主体 */
.editor-area{
  padding: 1em 0;
  background: var(--base-color);
  width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}
.input{
  position: relative;
  box-sizing: border-box;
  padding: 1em;
  height: 15em;
  background: #f8f8f8;
  border-radius: 0.2em;
}
.preview{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 1em;
  background: #f8f8f8;
  overflow: hidden;
  overflow-y: auto;
}
.input input{
  width: 100%;
  font-size: 1.5em;
  margin-bottom: 0.5em;
  color: var(--text-color);
  display: block;
  border: none;
  background: none;
  outline: none;
}
.input textarea{
  width: 100%;
  height: 12.5em;
  line-height: 1.5em;
  color: var(--text-color);
  resize: none;
  border: none;
  background: none;
  outline: none;
}
/* 编辑器按钮 */
.btns{
  position: relative;
  margin-top: 1em;
}
.btns-left{
  display: flex;
}
.item{
  list-style: none;
  width: 2em;
  height: 2em;
  display: block;
  line-height: 2em;
  text-align: center;
  background: var(--bg-color);
  border-radius: 0.2em;
  margin-right: 0.4em;
  cursor: pointer;
  transition: background 0.3s;
}
.item:hover{
  background: var(--hover-color);
}
.item i{
  display: block;
  width: 100%;
  height: 100%;
  font-size: 1.25em;
  color: var(--text-color);
}
.tool{
  position: absolute;
  bottom: 100%;
  border-radius: 0.2em;
  border-bottom: 0.5em solid #fff;
}
.tool-content{
  position: relative;
  width: max-content;
  left: calc(-50% + 1em);
  background: var(--bg-color);
  border-radius: 0.2em;
  overflow: hidden;
}

.tool-list li{
  list-style: none;
  text-shadow: 1px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 0 1em;
  color: var(--text-color);
}
.tool-list li:hover{
  opacity: 0.8;
}
.tool-tip li{
  font-size: 0.8em;
  list-style: none;
  text-shadow: 1px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 0 0.8em;
  color: var(--text-color);
  background: var(--bg-color);
}
.tool-color{
  display: flex;
  flex-wrap: wrap;
  width: 6.5em;
  padding: 0.25em;
}
.tool-color li{
  display: block;
  width: 1.5em;
  height: 1.5em;
  margin: 0.25em;
  border-radius: 0.2em;
}
.tool-color li:hover{
  transform: scale(1.1);
}
.red{
  background: #e3527d;
}
.yellow{
  background: #f6a231;
}
.green{
  background: #4ebc55;
}
.blue{
  background: #3179db;
}
.purple{
  background: #ac48a2;
}
.btns-right{
  position: absolute;
  right: 0;
  top: 0;
}
.btns-right li{
  list-style: none;
}
.btn-send{
  background: #50bd55;
  color: #fff;
  float: right;
}
.btn-send:hover{
  background: #4bb259;
}
.btn-preview{
  background: var(--bg-color);
  color: var(--text-color);
  margin-right: 0.5em;
  float: right;
}
.btn-preview:hover{
  background: rgb(0, 0, 0, 0.1);
}
.icon-shanchuxian{
  font-size: 1em !important;
}
.icon-lianjie{
  font-size: 1.5em !important;
}
/* 主题页模式 */
.topic{
  position: relative;
  box-shadow: none;
  width: 100% !important;
}
.topic .close{
  display: none;
}
.topic input{
  display: none;
}
.topic .editor-header{
  width: 100%;
}
.topic .editor-area{
  width: 100%;
}
.fixed{
  transition: opacity 0.3s, transform 0.3s;
}
.error{
  position: absolute;
  right: 0;
  bottom: 1em;
  background: #e3527d;
  color: #fff;
  width: auto;
  padding: 0.5em;
  border-radius: 0.2em 0 0 0.2em;
  opacity: 0;
  transform: translate(5em, 0);
  transition: all 0.3s;
}
.error-open{
  opacity: 1;
  transform: translate(0, 0);
}
</style>
