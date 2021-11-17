<template>
  <div class="category">
    <page-search
      :search-form-config="searchFormConfig"
      @handle-query="handleReset"
      @handle-reset="handleQuery"
    />
    <page-content
      ref="pageContentRef"
      pageName="category"
      :content-table-config="contentTableConfig"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { usePageSearch } from '@/hooks/usePageSearch'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'category',
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

<style scoped></style>
