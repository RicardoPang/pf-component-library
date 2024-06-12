<template>
  <div class="pf-collapse">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import type { NameType, CollapseProps, CollaseEmits } from './types'
import { collapseContextKey } from './types'

// 定义组件名
defineOptions({
  name: 'PfCollapse'
})

// 接收组件属性和事件
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollaseEmits>()

// 存储当前激活折叠项的名字
const activeNames = ref<NameType[]>(props.modelValue)

// 监听modelValue变化并更新activeNames
watch(
  () => props.modelValue,
  (newValue) => {
    activeNames.value = newValue
    // 检查是否处于手风琴模式, 如果是则只能激活一个项
    if (props.accordion && activeNames.value.length > 1) {
      console.warn('accordion mode should only have one active item')
    }
  }
)

// 定义处理折叠项点击
const handleItemClick = (item: NameType) => {
  if (props.accordion) {
    activeNames.value = [activeNames.value[0] === item ? '' : item]
  } else {
    const index = activeNames.value?.indexOf(item)
    if (index > -1) {
      activeNames.value.splice(index, 1) // 存在则删除数组对应的一项
    } else {
      if (activeNames.value) {
        activeNames.value.push(item) // 存在则添加
      } else {
        activeNames.value = [item]
      }
    }
  }
  // 触发组件事件
  emits('update:modelValue', activeNames.value)
  emits('change', activeNames.value)
}

// 提供给子组件使用的上下文, 包括当前激活项和处理函数
provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>
