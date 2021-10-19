import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
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
app.use(router).use(store).mount('#app')

// import hyRequest from './service'

// hyRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独请求的response')
//       return res
//     }
//   }
// })

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// hyRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//   })
// hyRequest
//   .get<DataType>({
//     url: '/home/multidata',
//     showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//   })
