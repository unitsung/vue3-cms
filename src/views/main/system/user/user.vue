<template>
  <div class="user">
    <div class="content">
      <page-search :searchFormConfig="searchFormConfig"></page-search>
      <page-content
        :contentTableConfig="contentTableConfig"
        :userList="userList"
      ></page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { searchFormConfig } from './config/search.config'
import { useStore } from '@/store'
import { contentTableConfig } from './config/content.config'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() => store.state.system.userList)
    // const userCount = computed(() => store.state.system.userCount)

    return {
      searchFormConfig,
      userList,
      // userCount,
      contentTableConfig
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
