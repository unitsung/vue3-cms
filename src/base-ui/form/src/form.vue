<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in item.options"
                    :value="option.value"
                    :key="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'date-picker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                  style="width: 100%"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  props: {
    formItems: {
      // vue3 语法，将array断言为PropsType 从而接收一个泛型
      type: Array as PropType<IFormItem[]>,
      // vue3中ts,要求default默认值为Object或者Array必须为箭头函数
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    // v-bind = "itemStyle" 一次性绑定多个属性
    itemStyle: {
      type: Object,
      default: () => {
        return { padding: '10px 40px' }
      }
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >=1920px显示4个 栅格布局将页面分为24等份，每一份占的份数为6
        lg: 8, // >=1200px
        md: 12, // >=992px
        sm: 24, //>=768px
        xs: 24 //<768px
      })
    },
    modelValue: {
      type: Object,
      requried: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    /* 方式一：双向绑定 */
    const formData = ref({ ...props.modelValue })
    // 监听数据发生变化(formData的属性改变，需要添加deep:true) ，手动实现双向绑定而不是修改props
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      { deep: true }
    )

    /* 方式二：不采用双向绑定*/
    // const handleValueChange = (value: any, field: string) => {
    //   // 一但el-input内容发生改变，就把整个props.modelValue(也就是父组件绑定的formData)传出去
    //   // 并且将modelValue的[field]属性，也就是el-input绑定的内容，改变
    //   emit('update:modelValue', { ...props.modelValue, [field]: value })
    // }

    return {
      formData
      // handleValueChange
    }
  }
})
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;
}
</style>
