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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { usePageSearch } from '@/hooks/usePageSearch'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const [pageContentRef, handleReset, handleQuery] = usePageSearch()
    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleReset,
      handleQuery
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
