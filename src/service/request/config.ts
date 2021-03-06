// 根据process.env.NODE_ENV判断环境，使用不同的接口

let BASE_URL = ''
const TIME_OUT = 5000

if (process.env.NODE_ENV === 'development') {
  // vue.config.js设置代理跨域
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://product.com'
} else {
  // test环境
  BASE_URL = 'http://test.com'
}

export { BASE_URL, TIME_OUT }
