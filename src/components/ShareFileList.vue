<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="分享管理" name="manage">
        <el-table
            :data="manageTable"
            style="width: 100%">
          <el-table-column
              prop="name"
              label="文件名">
          </el-table-column>
          <el-table-column
              prop="owner"
              label="分享者">
          </el-table-column>
          <el-table-column
              prop="size"
              label="大小">
          </el-table-column>
          <el-table-column
              prop="date"
              label="分享日期">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="success"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">撤销</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="添加分享" name="share">
        <el-table
            :data="shareTable"
            style="width: 100%">
          <el-table-column
              prop="name"
              label="文件名">
          </el-table-column>
          <el-table-column
              prop="size"
              label="大小">
          </el-table-column>
          <el-table-column
              prop="date"
              label="修改日期">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="primary"
                  @click="handleShare(scope.$index, scope.row)">分享</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "ShareFileList",
  data() {
    return {
      activeName: 'manage',
      manageTable: [],
      shareTable: []
    }
  },
  created() {
    this.manageTable.push({
      name: 'test',
      owner: 'test',
      size: 100,
      date: '2020-1-11',
      isShared: false
    })
    this.manageTable.push({
      name: 'test2',
      owner: 'test2',
      size: 200,
      date: '2020-2-22',
      isShared: true
    })
    this.shareTable.push({
      name: 'test',
      owner: 'test',
      size: 100,
      date: '2020-1-11',
      isShared: false
    })
    this.shareTable.push({
      name: 'test2',
      owner: 'test2',
      size: 200,
      date: '2020-2-22',
      isShared: true
    })
  }
}
</script>

<style scoped>

</style>
