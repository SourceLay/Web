<template>
<div>
  <h1 style="text-align: center">信息1</h1>
  <h1 style="text-align: center">信息2</h1>
  <h1 style="text-align: center">信息3</h1>
  <PayPassword @handleChangePassword="handleChangePassword"></PayPassword>
  <div style="text-align: center">
    <el-button @click="handlePay">支付</el-button>
  </div>
</div>
</template>

<script>
import PayPassword from "@/components/PayPassword";
export default {
name: "Pay",
  components: {PayPassword},
  data() {
    return {
      password: ''
    }
  },
  methods: {
    handleChangePassword(ret) {
      // 处理返回的密码的逻辑
      this.password = ret
    },
    handlePay() {
      // 处理点击确认后的逻辑
      this.$emit('handlePay', this.password);
    }
  }
}
</script>

<style scoped>

</style>
