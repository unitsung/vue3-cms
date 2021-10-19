import { createStore } from 'vuex'

import login from './login/login'
import { IRootState } from './types'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'tom',
      age: 18
    }
  },
  modules: {
    login
  }
})

export default store
