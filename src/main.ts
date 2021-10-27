import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import 'normalize.css'
import './assets/css/index.less'

// // 全局引入element-plus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// 按需引入
import { globalRegister } from './global'
const app = createApp(App)
// app.use(ElementPlus)

/*
 * app.use(function(app:App){})
 * vue3内部会去执行function,并传入app
 * app.use(install:{function(app:App){}})
 * 传对象会默认执行install对应的函数
 */

// 注册element-plus
app.use(globalRegister)
setupStore()
app.use(store)
app.use(router)

app.mount('#app')
