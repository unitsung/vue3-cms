<template>
  <div class="page-content">
    <hy-table
      v-bind="contentTableConfig"
      :listData="dataList"
      :listCount="dataCount"
      v-model:page="pageInfo"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" size="medium"
          >新建用户</el-button
        >
      </template>
      <!-- 2.列中的插槽 -->
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button v-if="isUpdate" type="text" size="mini" icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            type="text"
            size="mini"
            icon="el-icon-delete"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 在page-content中插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import HyTable from '@/base-ui/table'
import { usePermission } from '@/hooks/usePermission'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    HyTable
  },
  setup(props) {
    // 0.获取操作权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1.双向绑定pageInfo
    const store = useStore()
    const pageInfo = ref({ pageSize: 10, currentPage: 0 })
    watch(pageInfo, () => {
      getPageData()
    })

    // 2.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      // 如果没有查询的权限就返回
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3.从vuex拿到数据
    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    const dataCount = computed(() => {
      return store.getters['system/pageListCount'](props.pageName)
    })

    // 4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        // if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete
    }
  }
})
</script>

<style scoped></style>
