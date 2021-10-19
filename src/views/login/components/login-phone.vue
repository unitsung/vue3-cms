<template>
  <div class="login-phone">
    <el-form :model="phoneInfo" :rules="rules" label-width="65px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="phoneInfo.phone" clearable></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode">
        <div class="get-code">
          <el-input clearable v-model="phoneInfo.verifyCode"></el-input>
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/phone-config'
export default defineComponent({
  setup() {
    const phoneInfo = reactive({
      phone: '',
      verifyCode: ''
    })

    const loginAction = function () {
      console.log('手机登录...')
    }
    return {
      phoneInfo,
      rules,
      loginAction
    }
  }
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
}
</style>
