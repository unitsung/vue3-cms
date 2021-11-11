<template>
  <div class="role">
    <page-search :search-form-config="searchFormConfig"></page-search>
    <page-content
      :content-table-config="contentTableConfig"
      page-name="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      :modalConfig="modalConfig"
      pageName="role"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { MapMenuLeafKeys } from '@/utils/mapMenus'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { usePageModal } from '@/hooks/usePageModal'
import { ElTree } from 'element-plus'
export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },

  setup() {
    // 1.处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      // 在服务器返回来的权限列表menuList中筛选需要选中的tree的叶子节点的keys数组
      const leafKeys = MapMenuLeafKeys(item.menuList)
      // 调用elTree的方法回显默认选中的节点（参数1：需要选中的节点keys,参数二：是否只选中叶子节点）

      // !有问题：这个函数执行的时候，此时elTreeRef还没绑定到elTree上，所以需要用nextTick
      nextTick(() => {
        // console.log(elTreeRef.value)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallback)

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)
    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      // 只包括选中的CheckBox
      const checkedKeys = data2.checkedKeys
      // 只包括半选的CheckBox
      const halfCheckedKeys = data2.halfCheckedKeys
      // 拿到所有选中的节点
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
