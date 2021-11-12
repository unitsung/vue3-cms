<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <hy-card title="分类商品数量（饼图）">
          <pie-echart :pie-data="categoryGoodsCount"></pie-echart>
        </hy-card>
      </el-col>
      <el-col :span="10">
        <hy-card title="不同城市销量"></hy-card>
      </el-col>
      <el-col :span="7">
        <hy-card title="分类商品数量（玫瑰图）">
          <rose-echart :rose-data="categoryGoodsCount"></rose-echart>
        </hy-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <hy-card title="分类商品销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </hy-card>
      </el-col>
      <el-col :span="12">
        <hy-card title="分类商品收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </hy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'
import HyCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart
} from '@/components/page-echarts'

const store = useStore()
// 请求数据
store.dispatch('dashboard/getDashboardDataAction')

// 获取数据
const categoryGoodsCount = computed(() => {
  return store.state.dashboard.categoryGoodsCount.map((item: any) => {
    return {
      name: item.name,
      value: item.goodsCount
    }
  })
})
const categoryGoodsSale = computed(() => {
  const xLabels: string[] = []
  const values: any[] = []

  const categoryGoodsSale = store.state.dashboard.categoryGoodsSale

  for (const item of categoryGoodsSale) {
    xLabels.push(item.name)
    values.push(item.goodsCount)
  }

  return {
    xLabels,
    values
  }
})
const categoryGoodsFavor = computed(() => {
  const xLabels: string[] = []
  const values: any[] = []

  const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor

  for (const item of categoryGoodsFavor) {
    xLabels.push(item.name)
    values.push(item.goodsFavor)
  }
  return {
    xLabels,
    values
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 30px;
}
</style>
