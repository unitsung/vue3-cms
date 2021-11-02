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
      label: '真实姓名',
      placeholder: '请输入真实姓名',
      type: 'input',
      field: 'realname'
    },
    {
      label: '电话号码',
      placeholder: '请输入电话号码',
      type: 'input',
      field: 'cellphone'
    },
    {
      label: '用户状态',
      placeholder: '请选择用户状态',
      type: 'select',
      options: [
        { title: '启用', value: 1 },
        { title: '禁用', value: 0 }
      ],
      field: 'enable'
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
