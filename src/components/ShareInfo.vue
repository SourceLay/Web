<template>
<div>
  <template>
    <el-table
        ref="multipleTable"
        :data="cards"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        >
      <el-table-column
          type="selection"
          >
      </el-table-column>
      <el-table-column
          prop="filename"
          label="文件名"
          >
      </el-table-column>
      <el-table-column
          prop="type"
          label="类型"
          >
      </el-table-column>
      <el-table-column
          prop="likedCount"
          label="点赞数"
          >
      </el-table-column>
    </el-table>
  </template>
  <div style="text-align: center;margin-top: 2em;">
    <el-button type="primary" @click="handleCommit">确认</el-button>
  </div>
</div>
</template>

<script>
import IncludedHelper from "@/helpers/includedHelper";
import axios from "axios";
import {dzq} from "@/public";
import {globalErrorNotify} from "@/helpers/globalNotify";

export default {
name: "ShareInfo",
  props: ['reset'],
  watch: {
    reset() {
      this.GetSelfFile();
    }
  },
  created() {
    this.GetSelfFile();
  },
  data() {
    return {
      cards: [],
      selections: []
    }
  },
  methods: {
    // 获取属于自己的文件
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

        // let postsList = [];
        // fileShare.relationships.posts.data.forEach(threadIndex => {
        //   postsList.push(
        //       includedInfo.get('posts.' + threadIndex.id)
        //   )
        // })
        // console.log('postList')
        // console.log(postsList);  // 这里列出了这个分享的所有的帖子信息

        let passge = [];
        threadsList.forEach((s) => {
          passge.push(s);
        })

        this.included = includedInfo.data;

        this.cards.push({
          id: fileShare.attributes.id,
          type: fileInfo.attributes.type,
          filename: fileInfo.attributes.name,
          downloadLink: fileShare.attributes.downloadUrl ?? '',
          isLiked: fileInfo.attributes.is_liked ?? false,
          likedCount: fileInfo.attributes.likedCount ?? 0,
          Passge: passge,
        })

      })

    },
    handleSelectionChange(selection) {
      this.selections = selection
    },
    // 处理确认后的返回值
    handleCommit() {
        this.$emit('handleShareInfoReturn',this.selections);
        // 清空表格
        this.$refs.multipleTable.clearSelection();
    }
  }
}
</script>

<style scoped>

</style>
