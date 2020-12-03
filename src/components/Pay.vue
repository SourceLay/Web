<template>
<div>
  <h1 style="text-align: center">信息1</h1>
  <h1 style="text-align: center">信息2</h1>
  <h1 style="text-align: center">信息3</h1>
  <PayPassword></PayPassword>
  <div style="text-align: center">
    <el-button>支付</el-button>
  </div>
</div>
</template>

<script>
import PayPassword from "@/components/PayPassword";
export default {
name: "Pay",
  components: {PayPassword}
}
</script>

<style scoped>

</style>
