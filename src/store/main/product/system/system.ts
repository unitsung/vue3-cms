import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState, IPageListPayload } from './types'
import { getPageListData } from '@/service/main/system/system'
import toUpper from '@/utils/toUpper'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  getters: {
    pageListData(state) {
      // getters可以返回一个函数
      return (pageName: string) => {
        switch (pageName) {
          case 'user':
            return state.userList
          case 'role':
            return state.roleList
          default:
            break
        }
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
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: IPageListPayload) {
      // 1.封装通用的请求数据逻辑
      const pageName = payload.pageName
      // const pageUrl = `/${pageName}/list`
      let pageUrl = ''
      switch (pageName) {
        case 'user':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
        default:
          break
      }

      // 2.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data

      // 3.将数据存储到state中
      commit(`change${toUpper(pageName)}List`, list)
      commit(`change${toUpper(pageName)}Count`, totalCount)
    }
  }
}
export default systemModule
