export const rules = {
  phone: [
    {
      required: true,
      message: '请输入手机号...',
      trigger: 'blur'
    },
    {
      pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
      message: '手机号格式不正确，请重新输入！'
    }
  ],
  verifyCode: [
    {
      required: true,
      message: '请输入6位验证码...',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{6}$/,
      message: '验证码为6位数字！'
    }
  ]
}
