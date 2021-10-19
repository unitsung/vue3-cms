// const path = require('path')

module.exports = {
  outputDir: './build',
  // 配置方式一：webpack提供的方式，会合并 webpack默认会配置'@':src
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  }
  // 配置方式二：覆盖config
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // }
  // 配置方式三：
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // }
}
