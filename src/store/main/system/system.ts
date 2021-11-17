import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState, IPageListPayload } from './types'
import {
  deletePageData,
  getPageListData,
  createPageData,
  editPageData
} from '@/service/main/system/system'
import toUpper from '@/utils/toUpper'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      categoryList: [],
      categoryCount: 0,
      departmentList: [],
      departmentCount: 0,
      storyCount: 0,
      storyList: [],
      queryInfo: {}
    }
  },
  getters: {
    pageListData(state) {
      // getters可以返回一个函数
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      // getters可以返回一个函数
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },
    changeCategoryList(state, list: any) {
      state.categoryList = list
    },
    changeCategoryCount(state, categoryCount: any) {
      state.categoryCount = categoryCount
    },
    changeQueryInfo(state, queryInfo: any) {
      state.queryInfo = queryInfo
    },
    changeDepartmentCount(state, totalCount: number) {
      state.departmentCount = totalCount
    },
    changeDepartmentList(state, departmentList: any) {
      state.departmentList = departmentList
    },
    changeStoryCount(state, totalCount: number) {
      state.storyCount = totalCount
    },
    changeStoryList(state, storyList: any) {
      state.storyList = storyList
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: IPageListPayload) {
      // 1.封装通用的请求数据逻辑
      const pageName = payload.pageName
      let pageUrl = ''
      if (pageName === 'user') {
        pageUrl = '/users/list'
      } else {
        pageUrl = `/${pageName}/list`
      }
      // let pageUrl = ''
      // switch (pageName) {
      //   case 'user':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      //   default:
      //     break
      // }

      // 2.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data

      // 3.将数据存储到state中
      commit(`change${toUpper(pageName)}List`, list)
      commit(`change${toUpper(pageName)}Count`, totalCount)
    },
    async deletePageDataAction({ state, dispatch }, payload: any) {
      // 1.获取pageName和id
      // 1.pageName -> /users
      // 2.id -> /users/id
      const { id } = payload
      let { pageName } = payload
      if (pageName === 'user') pageName = 'users'
      const pageUrl = `${pageName}/${id}`

      //2.调用删除网络请求
      await deletePageData(pageUrl)
      if (pageName === 'users') pageName = 'user'
      // 3.重新请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
          ...state.queryInfo
        }
      })
    },
    async createPageDataAction({ state, dispatch }, payload: any) {
      const { newData } = payload
      let { pageName } = payload
      const pageUrl = `${pageName}`

      //2.创建数据网络请求
      await createPageData(pageUrl, newData)

      // 3.重新请求最新的数据
      if (pageName === 'users') pageName = 'user'
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
          ...state.queryInfo
        }
      })
    },
    async editPageDataAction({ state, dispatch }, payload: any) {
      const { editData, id } = payload
      let { pageName } = payload
      const pageUrl = `${pageName}/${id}`

      //2.编辑数据网络请求
      await editPageData(pageUrl, editData)

      // 3.重新请求最新的数据
      if (pageName === 'users') pageName = 'user'
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
          ...state.queryInfo
        }
      })
    }
  }
}
export default systemModule
