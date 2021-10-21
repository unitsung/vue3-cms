// service 统一出口
import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }

      // console.log('请求拦截成功...')
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求拦截失败...')
      return err
    }
    // responseInterceptor: (res) => {
    //   console.log('响应拦截成功...')
    //   return res
    // },
    // responseInterceptorCatch: (err) => {
    //   console.log('响应拦截失败...')
    //   return err
    // }
  }
})

export default hyRequest
