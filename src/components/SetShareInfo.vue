<template>
  <div style="width: 90%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="分享描述" prop="description">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="分享类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择" @change="resetOtherType">
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
    var validatePassword = (rule, value, callback) => {
      if (this.ruleForm.type != 1)
        callback();
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        // 其他逻辑
        callback();
      }
    };
    var validateCost = (rule, value, callback) => {
      if (this.ruleForm.type != 2)
        callback();
      if (value === '') {
        callback(new Error('请输入价格'));
      } else {
        // 其他逻辑
        if (isNaN(Number(value)))
          callback(new Error('请输入数字'));
        callback();
      }
    };
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
        password:[
          { validator: validatePassword, trigger: 'change'}
        ],
        cost:[
          { validator: validateCost, trigger: 'change'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.$emit('handleShareReturn', that.ruleForm)
        } else {
          alert('无效输入');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 切换类型时清空另一组数据
    resetOtherType() {
      if (this.ruleForm.type === 0) {
        this.ruleForm.cost = 0;
        this.ruleForm.password = '';
      }
      else if (this.ruleForm.type === 1)
        this.ruleForm.cost = 0;
      else
        this.ruleForm.password = '';
    }
  }
}
</script>
