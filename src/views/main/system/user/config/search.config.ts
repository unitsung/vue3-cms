import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  formItems: [
    { label: 'ID', placeholder: '请输入ID', type: 'input', field: 'id' },
    {
      label: '用户名',
      placeholder: '请输入用户名',
      type: 'input',
      field: 'name'
    },
    {
      label: '密码',
      placeholder: '请输入密码',
      type: 'password',
      field: 'password'
    },
    {
      label: '喜欢的运动',
      placeholder: '请选择喜欢的运动',
      type: 'select',
      options: [
        { title: '篮球', value: 'basketball' },
        { title: '足球', value: 'football' }
      ],
      field: 'sport'
    },
    {
      label: '创建时间',
      type: 'date-picker',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      },
      field: 'createTime'
    }
  ],
  // colLayout: {
  //   span: 8
  // },
  itemStyle: {
    padding: '10px 40px'
  }
}
