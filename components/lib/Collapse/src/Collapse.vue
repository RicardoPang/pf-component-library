<template>
  <div class="pf-collapse">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'

// 定义组件名
defineOptions({
  name: 'PfCollapse'
})

// 接收组件属性和事件
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()

/**
 * 当前激活的折叠项名称数组
 * @type {Ref<NameType[]>}
 */
const activeNames = ref<NameType[]>(props.modelValue || [])

/**
 * 监听 props.modelValue 的变化，并根据是否启用手风琴模式，调整 activeNames
 */
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

/**
 * 处理折叠项的点击事件
 * @param {NameType} item - 被点击的折叠项的名称
 */
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

/**
 * 提供给子组件使用的上下文对象
 * @type {CollapseContext}
 */
provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>
