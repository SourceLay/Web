<template>
  <div style="width: 90%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="原密码" prop="oldPassword" v-if="profile.hasPassword">
        <el-input type="password" v-model="ruleForm.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="ruleForm.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmNewPassword">
        <el-input type="password" v-model="ruleForm.confirmNewPassword"></el-input>
      </el-form-item>
      <el-form-item label="旧支付密码" prop="oldPayPassword" v-if="profile.hasPayPassword">
        <el-input type="password" v-model="ruleForm.oldPayPassword"></el-input>
      </el-form-item>
      <el-form-item label="支付密码" prop="payPassword">
        <el-input type="password" v-model="ruleForm.payPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认支付密码" prop="confirmPayPassword">
        <el-input type="password" v-model="ruleForm.confirmPayPassword"></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import store from '../store/index'

export default {
  name: 'SetUserInfo',
  data() {

    var validateOldPassword = (rule, value, callback) => {
      // 如果用户原先没有密码则可以跳过这个空
      if (this.profile.hasPassword !== true) {
        callback();
      }
      // 如果用户填了需要原密码才可以改的信息但又没有写密码就报错
      if ((this.ruleForm.newPassword !== '' || 
      this.ruleForm.confirmNewPassword !== '' || 
      this.ruleForm.email !== store.state.userInfo.email) && value === '') {
          callback(new Error('请输入原密码'));
      }
      callback();
    };

    var validateNewPassword = (rule, value, callback) => {
      // 如果用户填了确认新密码或这里填了密码
      if (this.ruleForm.confirmNewPassword !== '' && value === '') {
        callback(new Error('请输入新密码'));
      } else {
        // 其他逻辑
        callback();
      }
    };

    var validateConfirmNewPassword = (rule, value, callback) => {

      if (this.ruleForm.newPassword !== '' && value === '')
      {
        callback(new Error('请再次输入新密码'));
      } else if (this.ruleForm.newPassword !== value && value !== ''){
          callback(new Error('两次密码不一致'));
      }
      callback();

    };
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback();
      }
      if (value.indexOf("@") === -1 ) {
        callback(new Error('邮箱格式有误'));
      }
      callback();
    };



    var validateoldPayPassword = (rule, value, callback) => {
      if (this.profile.hasPayPassword !== true) {
        callback()
      }
      // 如果用户填了需要原密码才可以改的信息但又没有写密码就报错
      if ((this.ruleForm.payPassword !== '' || 
      this.ruleForm.confirmPayPassword !== '' ) && value === '') {
          callback(new Error('请输入原密码'));
      }
      callback();

    };

    var validatePayPassword = (rule, value, callback) => {
      if (this.ruleForm.confirmPayPassword !== '' && value === '') {
        callback(new Error('请输入支付密码'));
      } else if (value !== '') {
        // 如果填了密码
        if (value.length != 6 || !/^\d+$/.test(value))
          callback(new Error('支付密码必须为六位数字'));
        callback();
      }
      callback();
    };

    var validateConfirmPayPassword = (rule, value, callback) => {
      if (this.ruleForm.payPassword !== '' && value === '') {
        callback(new Error('请再次输入支付密码'));
      } else if (value !== ''){
        if (!(value === this.ruleForm.payPassword))
          callback(new Error('两次输入的密码不同'));
        callback();
      }
      callback();
    };

    return {
      profile: {
        hasPayPassword: store.state.userInfo.hasPayPassword,
        hasPassword: store.state.userInfo.hasPassword,
        email: store.state.userInfo.email
      },
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        oldPayPassword: '',
        payPassword: '',
        confirmPayPassword: '',
        email: store.state.userInfo.email
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
        ],
        oldPayPassword: [
          { validator: validateoldPayPassword, trigger: 'change'}
        ],
        payPassword: [
          { validator: validatePayPassword, trigger: 'change'}
        ],
        confirmPayPassword: [
          { validator: validateConfirmPayPassword, trigger: 'change'}
        ],
        email: [
          { validator: validateEmail, trigger: 'change'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.$emit('handleSetUserInfo', that.ruleForm, (s) => {
            console.log(s);
            that.profile.hasPassword = s.data.attributes.hasPassword;
            that.profile.hasPayPassword = s.data.attributes.hasPayPassword;
            that.profile.email = s.data.attributes.email;

            that.$refs[formName].resetFields();
            that.ruleForm.email = that.profile.email;
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.email = this.profile.email;
    }
  }
}
</script>
