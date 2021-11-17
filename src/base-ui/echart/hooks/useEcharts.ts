import * as echarts from 'echarts'

import ChinaMapData from '../data/china.json'
// 注册地图
echarts.registerMap('china', ChinaMapData)

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  // 监听窗口变化，改变echarts大小
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  // 点击收起或者展开按钮，改变echarts大小
  const updateSize = () => {
    echartInstance.resize()
  }

  return { echartInstance, setOptions, updateSize }
}
