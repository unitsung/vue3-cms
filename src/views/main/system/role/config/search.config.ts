import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  formItems: [
    {
      label: '角色名',
      placeholder: '请输入角色名',
      type: 'input',
      field: 'name'
    },
    {
      label: '角色权限',
      placeholder: '请输入角色权限',
      type: 'input',
      field: 'intro'
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
