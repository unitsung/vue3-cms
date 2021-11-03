<template>
  <div class="menu">
    <page-content
      :content-table-config="contentTableConfig"
      page-name="menu"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'hy-menu',
  components: {
    pageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
