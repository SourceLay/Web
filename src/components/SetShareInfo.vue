<template>
  <div style="width: 90%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="分享描述" prop="description">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="分享类型" prop="description">
        <el-select v-model="ruleForm.type" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 1" label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 2" label="价格" prop="cost">
        <el-input v-model="ruleForm.cost"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SetShareInfo',
  data() {
    // 自定义验证逻辑
    return {
      options: [{
        value: 0,
        label: '公开'
      }, {
        value: 1,
        label: '密码'
      }, {
        value: 2,
        label: '付费'
      }],
      ruleForm: {
        description: '',
        type: 0,
        password: '',
        cost: 0,
      },
      rules: {
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
