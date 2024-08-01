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
 * props传递给本地ref 需要watch更新数据
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
  // 将响应式对象activeNames.value 转换为真正的数组 (防止数据联动)
  let _activeNames = [...activeNames.value]
  if (props.accordion) {
    _activeNames = [activeNames.value[0] === item ? '' : item]
    activeNames.value = _activeNames
  } else {
    const index = _activeNames.indexOf(item)
    if (index > -1) {
      // 存在，删除数组对应的一项
      _activeNames.splice(index, 1)
    } else {
      // 不存在，插入对应的name
      _activeNames.push(item)
    }
    activeNames.value = _activeNames
  }
  emits('update:modelValue', _activeNames)
  emits('change', _activeNames)
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
