import { Module } from 'vuex'
import { ILoginState } from './types'
import { IRootState } from '../types'

// 必须传入两个泛型 模块state的类型，根模块state类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  getters: {},
  mutations: {},
  actions: {
    accountLoginAction({ commit }, payload: any) {
      console.log('执行accountLoginAction', payload)
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log('执行phoneLogin')
    }
  }
}

export default loginModule