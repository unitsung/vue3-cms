<template>
  <div class="login-account">
    <el-form :model="account" :rules="rules" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input clearable show-password v-model="account.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import { useStore } from 'vuex'
import localCache from '@/utils/cache'
export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    // 获取实例的类型
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPwd: boolean) => {
      formRef.value?.validate((valid) => {
        // valid为true，验证通过，判断是否记住密码
        if (valid) {
          if (isKeepPwd) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }

          // 执行登录逻辑
          store.dispatch('login/accountLoginAction', { ...account })
          console.log('account login .....')
        }
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped lang="less"></style>
