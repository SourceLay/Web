<template>
  <div :class="[$route.name == 'Topic' ? 'topic' : '']" class="editor">
    <div class="editor-header">
      <div @click="closeEditor" class="header-btn close">
        <i class="iconfont icon-guanbi"></i>
      </div>
      <div v-if="$route.name == 'Topic'" @click="changeFixed" :style="{opacity: fixedEditor ? '1' : '0.5'}" class="header-btn fixed">
        <i class="iconfont icon-guding"></i>
      </div>
    </div>
    <div class="editor-area">
      <div class="input">
        <div @click="closePreview" v-if="preview" v-html="preview" class="preview bbcode">
        </div>
        <input v-model="title" placeholder="标题…" type="text">
        <textarea v-model="content" ref="content" placeholder="正文…"></textarea>
      </div>
      <div class="btns">
        <ul class="btns-left">
          <li v-for="(tool, index) in toolInfo" :key="tool.name" @mouseleave="closetool" class="item">
            <i @click="add(tool.action)" @mouseover="opentool(index)" :class="['icon-' + tool.name, 'iconfont']"></i>
            <div v-if="toolIndex == index" class="tool">
              <ul v-if="tool.optionType != 'color'" :class="['tool-' + tool.optionType, 'tool-content']">
                <li @click="add(tool.action, tool.actionValue[index])" v-for="(option, index) in tool.option" :key="index">{{option}}</li>
              </ul>
              <ul v-if="tool.optionType == 'color'" :class="['tool-' + tool.optionType, 'tool-content']">
                <li @click="add(tool.action, tool.actionValue[index])" v-for="(option, index) in tool.option" :key="index" :class="[option]"></li>
              </ul>
            </div>
          </li>
        </ul>
        <ul class="btns-right">
          <li @click="send" class="btn btn-send">发送</li>
          <li @click="showPreview" class="btn btn-preview">预览</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import XBBCODE from 'xbbcode-parser'
export default {
  name: 'editor',
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
          name: 'tupian',
          optionType: 'list',
          action: 'img',
          option: ['网络图片', '本地上传']
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
      preview: ''
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
      this.preview = XBBCODE.process({
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
        bbcodeL = '[' + action + '=' + actionValue + ']'
      }else{
        return
      }
      bbcodeR = '[/' + action + ']'

      var content = this.$refs.content
      if(content.selectionStart == content.selectionEnd){
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
    send: function() {
      if(this.$route.name == 'Forum'){
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
        })
      }
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
  background: var(--dark-color);
  border-radius: 0.2em;
  overflow: hidden;
}
.tool-list{
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
.tool-list li{
  list-style: none;
  text-shadow: 1px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 0 1em;
  color: var(--base-color);
}
.tool-list li:hover{
  opacity: 0.8;
}
.tool-tip li{
  font-size: 0.8em;
  list-style: none;
  text-shadow: 1px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 0 0.8em;
  color: var(--base-color);
  background: var(--dark-color);
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
</style>