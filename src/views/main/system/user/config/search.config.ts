import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  formItems: [
    { label: 'ID', placeholder: '请输入ID', type: 'input' },
    { label: '用户名', placeholder: '请输入用户名', type: 'input' },
    { label: '密码', placeholder: '请输入密码', type: 'password' },
    {
      label: '喜欢的运动',
      placeholder: '请选择喜欢的运动',
      type: 'select',
      options: [
        { title: '篮球', value: 'basketball' },
        { title: '足球', value: 'football' }
      ]
    },
    {
      label: '创建时间',
      type: 'date-picker',
      otherOptions: {
        startPlaceHolder: '开始时间',
        endPlaceHolder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  colLayout: {
    span: 8
  },
  itemStyle: {
    padding: '10px 40px'
  }
}
