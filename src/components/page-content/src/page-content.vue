<template>
  <div class="page-content">
    <hy-table :listData="userList" v-bind="contentTableConfig">
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="default">新建用户</el-button>
      </template>
      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button type="text" size="mini" icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button type="text" size="mini" icon="el-icon-delete"
            >删除</el-button
          >
        </div>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HyTable from '@/base-ui/table'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    HyTable
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
