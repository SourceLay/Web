<template>
<div>
  <div>
    <span>文件名</span> : <span>{{fileInfo.attributes.name}}</span>
    <span>账户余额</span> : <span>{{userInfo.walletBalance}}</span>
    <span>价格</span> : <span>{{(shareInfo.attributes.cost / 100).toFixed(2)}}</span>
    <span>订单号</span> : <span>{{orderInfo.attributes.order_sn}}</span>
  </div>
  <PayPassword style="position: relative;margin-top: 1em;margin-bottom: -1em;" @handleChangePassword="handleChangePassword" :reset="reset"></PayPassword>
  <div style="text-align: center">
    <el-button type="primary" @click="handlePay" v-if="this.password.length === 6">支付</el-button>
    <el-button type="primary" @click="handlePay" v-if="this.password.length !== 6" disabled="true">支付</el-button>
  </div>
</div>
</template>

<script>
import PayPassword from "@/components/PayPassword";
import store from '../store/index'
import {globalErrorNotify} from "@/helpers/globalNotify";

export default {
name: "Pay",
  components: {PayPassword},
  props: ['fileInfo', 'shareInfo', 'orderInfo'],
  data() {
    return {
      password: '',
      reset: true,
      userInfo: store.state.userInfo,
    }
  },
  methods: {
    handleChangePassword(ret) {
      // 处理返回的密码的逻辑
      this.password = ret
    },
    handlePay() {
      if (this.password.length !== 6) {
        globalErrorNotify(this, "密码长度不对");
        return;
      }
      // 处理点击确认后的逻辑
      this.$emit('handlePay', this.password);
      this.reset = !this.reset;
      this.password = '';
    }
  }
}
</script>

<style scoped>

</style>
