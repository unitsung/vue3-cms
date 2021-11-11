import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login/login'
import { IRootState, IStoreType } from './types'
import system from './main/system/system'
import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      entireDepartment: [],
      entireRole: []
    }
  },
  modules: {
    login,
    system
  },
  mutations: {
    changeEntireDepartment(state, entireDepartment: any) {
      state.entireDepartment = entireDepartment
    },
    changeEntireRole(state, entireRole: any) {
      state.entireRole = entireRole
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      // 2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
    }
  }
})

// 解决页面刷新，vuex（数据保存在内存中）里的数据被清空问题
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

// vuex对typescript支持不好，自己封装一个vuex 自己定义一个类型，别人再用的时候就有代码提示
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
