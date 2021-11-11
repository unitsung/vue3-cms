<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" width="30%" center destroy-on-close>
      <template #title>
        {{ isEdit ? `编辑${getPageName()}` : `新建${getPageName()}` }}
      </template>
      <hy-form v-bind="modalConfig" v-model="formData"></hy-form>
      <slot></slot>
      <template #footer>
        <span>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import HyForm from '@/base-ui/form'
import { useStore } from '@/store'
export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    otherInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    pageName: { type: String, required: true }
  },
  components: {
    HyForm
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    watch(
      () => props.defaultInfo,
      () => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = props.defaultInfo[`${item.field}`]
        }
      }
    )
    // 点击确定按钮逻辑
    const store = useStore()
    // 判断是否是编辑
    const isEdit = computed(() =>
      Object.keys(props.defaultInfo).length ? true : false
    )
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (isEdit.value) {
        // 编辑操作
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建操作
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    const pageNameMap = new Map([
      ['user', '用户'],
      ['users', '用户'],
      ['role', '角色'],
      ['menu', '菜单']
    ])
    const getPageName = () => {
      if (props.pageName) {
        return pageNameMap.get(props.pageName)
      }
    }
    return {
      dialogVisible,
      formData,
      handleConfirmClick,
      isEdit,
      getPageName
    }
  }
})
</script>

<style scoped></style>
