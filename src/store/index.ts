import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login/login'
import { IRootState, IStoreType } from './types'
import system from './main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'tom',
      age: 18
    }
  },
  modules: {
    login,
    system
  }
})

// 解决页面刷新，vuex（数据保存在内存中）里的数据被清空问题
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

// vuex对typescript支持不好，自己封装一个vuex 自己定义一个类型，别人再用的时候就有代码提示
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
