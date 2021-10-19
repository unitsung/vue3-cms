export const rules = {
  name: [
    {
      required: true,
      message: '请输入账号...',
      trigger: 'blur'
    },
    {
      pattern: /^[A-z0-9]{3,15}$/,
      message: '用户名必须为3-15位字母或数字！'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码...',
      trigger: 'blur'
    },
    {
      pattern: /^[A-z0-9]{4,}$/,
      message: '密码必须为4-15位字母或数字'
    }
  ]
}
