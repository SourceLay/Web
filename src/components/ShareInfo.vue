<template>
<div>
  <template>
    <el-table
        ref="multipleTable"
        :data="cards"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        >
      <el-table-column
          type="selection"
          >
      </el-table-column>
      <el-table-column
          prop="fileInfo.attributes.name"
          label="文件名"
          >
      </el-table-column>
      <el-table-column
          prop="fileInfo.attributes.type"
          label="类型"
          >
      </el-table-column>
      <el-table-column
          prop="fileInfo.attributes.like_count"
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
      loading: true,
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
              'file'
            ],
            filter: {
              self: true,
            }
          })
      ).then(response => {
        this.loading=false;
        that.handleResponseCard(response);
        }
        ).catch(err=>globalErrorNotify(that,err))
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
        
        this.included = includedInfo.data;

        this.cards.push({
          fileInfo: fileInfo,
          shareInfo: fileShare,
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
