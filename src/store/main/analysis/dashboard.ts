import { Module } from 'vuex'
import { IDashboardState } from './types'
import { IRootState } from '@/store/types'
import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale,
  getAmountList,
  getGoodsSaleTop10
} from '@/service/main/analysis/dashboard'
const dashBoardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: [],
      topPanelData: [],
      goodsSaleTop10: []
    }
  },
  mutations: {
    changeTopPanelData(state, list) {
      state.topPanelData = list
    },
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    },
    changeGoodsSaleTop10(state, list) {
      state.goodsSaleTop10 = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryCountResult.data)
      const categorySaleResult = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categorySaleResult.data)
      const categoryFavorResult = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryFavorResult.data)
      const addressSaleResult = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressSaleResult.data)
      const resultTopPanelData = await getAmountList()
      commit('changeTopPanelData', resultTopPanelData.data)
      const saleTop10 = await getGoodsSaleTop10()
      commit('changeGoodsSaleTop10', saleTop10)
    }
  }
}

export default dashBoardModule
