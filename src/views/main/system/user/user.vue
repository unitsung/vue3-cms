<template>
  <div class="user">
    <div class="content">
      <page-search
        :searchFormConfig="searchFormConfig"
        @handleReset="handleReset"
        @handleQuery="handleQuery"
      ></page-search>
      <page-content
        :contentTableConfig="contentTableConfig"
        pageName="user"
        ref="pageContentRef"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      >
        <template #status="scope">
          <el-button
            plain
            size="mini"
            :type="scope.row.enable ? 'success' : 'danger'"
            >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
          >
        </template>
      </page-content>
      <page-modal
        :modalConfig="modalConfigRef"
        ref="pageModalRef"
        :defaultInfo="defaultInfo"
        pageName="users"
      ></page-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleReset, handleQuery] = usePageSearch()

    // pageModal相关的hook逻辑 (页面自己的逻辑写在页面里，处理密码隐藏)
    const newCallback = () => {
      const item = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      item!.isHidden = false
    }
    const editCallback = () => {
      const item = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      item!.isHidden = true
    }

    // 2.动态添加部门和角色列表
    // (ps.存在问题：请求是异步请求的，刷新user，select没数据，需要放到computed里边，利用computed的effect：副作用更新select)
    const store = useStore()
    const modalConfigRef = computed(() => {
      const { entireDepartment, entireRole } = store.state
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      departmentItem!.options = entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      roleItem!.options = entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    // 3.调用hook获取公共的变量和函数
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback)
    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleReset,
      handleQuery,
      modalConfigRef,
      handleEditData,
      handleNewData,
      pageModalRef,
      defaultInfo
    }
  }
})
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
