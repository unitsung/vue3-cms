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
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
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
    }
  }
}
export default systemModule
