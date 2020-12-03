<template>
  <div style="width: 90%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input type="password" v-model="ruleForm.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="ruleForm.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmNewPassword">
        <el-input type="password" v-model="ruleForm.confirmNewPassword"></el-input>
      </el-form-item>
      <el-form-item label="支付密码" prop="payPassword">
        <el-input type="password" v-model="ruleForm.payPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认支付密码" prop="confirmPayPassword">
        <el-input type="password" v-model="ruleForm.confirmPayPassword"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobileNumber">
        <el-input v-model="ruleForm.mobileNumber"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SetUserInfo',
  data() {
    // 自定义验证逻辑
    var validateOldPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'));
      } else {
        // 其他逻辑
        callback();
      }
    };
    var validateNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        // 其他逻辑
        callback();
      }
    };
    var validateConfirmNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else {
        // 其他逻辑
        if (!(value === this.ruleForm.newPassword))
          callback(new Error('两次密码不一致'));
        callback();
      }
    };
    return {
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        payPassword: '',
        confirmPayPassword: '',
        mobileNumber: ''
      },
      rules: {
        oldPassword: [
          { validator: validateOldPassword, trigger: 'blur' }
        ],
        newPassword: [
          { validator: validateNewPassword, trigger: 'blur' }
        ],
        confirmNewPassword: [
          { validator: validateConfirmNewPassword, trigger: 'change'}
        ]
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
