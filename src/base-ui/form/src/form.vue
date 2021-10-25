<template>
  <div class="hy-form">
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
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
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-bind="item.otherOptions"
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
                  style="width: 100%"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
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
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;
}
</style>
