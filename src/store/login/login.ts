import { Module } from 'vuex'
import { ILoginState } from './types'
import { IRootState } from '../types'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import { IAccount } from '@/service/login/types'
import localCache from '@/utils/cache'
import router from '@/router'
import { mapMenuToRoutes, mapMenusToPermissions } from '@/utils/mapMenus'

// 必须传入两个泛型 模块state的类型，根模块state类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenu: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenu(state, userMenu: any) {
      state.userMenu = userMenu

      // userMenu => routes 动态添加路由
      // 根据服务器返回的url,匹配本地定义好的路由映射,动态添加routes
      const routes = mapMenuToRoutes(userMenu)
      // routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户按钮权限

      const permissions = mapMenusToPermissions(userMenu)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 拿到token之后，发送初始化请求（完整的role/department）
      // 发送根上的action {root:true}
      dispatch('getInitialDataAction', null, { root: true })

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.获取用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenu = userMenusResult.data
      commit('changeUserMenu', userMenu)
      localCache.setCache('userMenu', userMenu)

      // 4.跳转到首页
      router.push('/main')
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 拿到token之后，发送初始化请求（完整的role/department）
        // 发送根上的action {root:true}
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenu = localCache.getCache('userMenu')
      if (userMenu) {
        commit('changeUserMenu', userMenu)
      }
    }
  }
}

export default loginModule
