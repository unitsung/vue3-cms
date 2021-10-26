import axios from 'axios'
import { AxiosInstance } from 'axios'
import type { HYRequestConfig, HYRequestInterceptors } from './type'

import { ElLoading } from 'element-plus'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

// 1.根据不同的config创建不同的axios实例
// 2.给config:AxiosRequestConfig 添加上拦截器

const DEFAULT_LOADING = true

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  loading?: ILoadingInstance
  showLoading: boolean

  constructor(config: HYRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? true

    // 使用拦截器
    // 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例都有的拦截器：请求拦截成功...')

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在加载中...',
            background: 'rgba(0,0,0,0.7)'
          })
        }
        return config
      },
      (err) => {
        // console.log('所有实例都有的拦截器：请求拦截失败...')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有实例都有的拦截器：响应拦截成功...')

        // 将loading移除
        this.loading?.close()

        const data: any = res.data
        if (data.returnCode === '-1001') {
          // console.log('请求失败~,错误信息...')
        } else {
          return data
        }
      },
      (err) => {
        // console.log('所有的实例的拦截器:响应拦截失败...')
        this.loading?.close()

        if (err.response.status === 404) {
          // console.log('404错误...')
        }
        return err
      }
    )
  }

  request<T = any>(config: HYRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 2. 判断是否显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // console.log(res)
          // 2.将showLoading设置为true,遮掩不会影响下一次请求
          this.showLoading = DEFAULT_LOADING
          // 3.将返回的结果，返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置为true,遮掩不会影响下一次请求
          reject(err)
          this.showLoading = DEFAULT_LOADING
          return err
        })
    })
  }
  get<T = any>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  put<T = any>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }
  patch<T = any>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
