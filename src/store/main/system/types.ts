export interface ISystemState {
  userList: any[]
  userCount: number
  roleList: any[]
  roleCount: number
  goodsList: any[]
  goodsCount: number
  menuList: any[]
  menuCount: number
  categoryList: any[]
  categoryCount: number
  departmentList: any[]
  departmentCount: number
  storyCount: number
  storyList: any[]
  queryInfo: any
}

export interface IPageListPayload {
  pageName: string
  queryInfo: any
}
