<template>
  <div class="pf-check-box">
    <div
      v-if="showBox"
      :class="[
        'box',
        {
          'is-checked': checked,
          'is-part-checked': indeterminate,
          'is-disabled': disabled
        }
      ]"
      @click="onChecked"
    />
    <div @click="onSingleChecked" @dblclick="onDBLChecked">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { depthFirstEach } from './utils'
import type { TreeNodeEmits, TreeNodeProps } from './types'

// 定义组件名
defineOptions({
  name: 'PfTreeNode'
})

/**
 * 组件的 props
 * @typedef {Object} TreeNodeProps
 * @property {boolean} checked - 是否选中
 * @property {boolean} indeterminate - 是否部分选中
 * @property {boolean} disabled - 是否禁用
 * @property {string} checkedAction - 选中操作方式
 * @property {boolean} showCheckbox - 是否显示复选框
 * @property {boolean} isLeaf - 是否是叶子结点
 * @property {boolean} showCheckboxLeafOnly - 是否只在叶子结点显示复选框
 * @property {boolean} checkStriclty - 是否严格遵循父子不互相关联模式
 * @property {boolean} draggable - 是否可拖动
 */
const props = withDefaults(defineProps<TreeNodeProps>(), {
  checked: true,
  indeterminate: false,
  disabled: false,
  checkedAction: 'none',
  showCheckbox: false,
  isLeaf: true,
  showCheckboxLeafOnly: false,
  checkStriclty: false,
  draggable: false
})
const emits = defineEmits<TreeNodeEmits>()

// 内部值引用 props.modelValue
const innerValue = ref(props.modelValue)

/**
 * 计算是否被选中
 * @returns {boolean} 是否选中
 */
const checked = computed(() => innerValue.value === props.checked)

/**
 * 计算是否显示复选框
 * @returns {boolean} 是否显示复选框
 */
const showBox = computed(() => {
  if (props.showCheckbox) {
    if (props.showCheckboxLeafOnly) {
      // 如果只在叶子结点显示复选框且当前节点是叶子结点
      return props.isLeaf
    }
    return true
  }
  return false
})

// 监听props.modelValue变化并更新innerValue
watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal
  }
)

/**
 * 复选框点击事件处理函数
 */
const onChecked = () => {
  if (props.disabled) return
  // 获取新的选中状态
  const newValue = getNewChecked(checked.value)
  emits('update:modelValue', newValue)
  emits('checked-change', newValue)
  emits('on-checked')
}

/**
 * 标签点击事件处理函数
 */
const labelClick = () => {
  emits('on-click-label')
}

/**
 * 单击事件处理函数
 */
const onSingleChecked = () => {
  if (props.checkedAction === 'click' && showBox.value) onChecked()
  labelClick()
}

/**
 * 双击事件处理函数
 */
const onDBLChecked = () => {
  if (props.checkedAction === 'dblclick' && showBox.value) onChecked()
  labelClick()
}

/**
 * 获取新的选中状态
 * @param {boolean} oldChecked - 旧的选中状态
 * @returns {boolean} 新的选中状态
 */
const getNewChecked = (oldChecked: boolean): boolean => {
  if (props.node) {
    if (props.node.isLeaf || props.checkStriclty) {
      // 如果是叶子结点或严格的遵循父子不互相关联模式，直接取反
      return !oldChecked
    }
    let newChecked = false
    depthFirstEach({ tree: props.node.children ?? [] }, (node) => {
      if (node.isLeaf && !node.disabled && !node.checked) {
        newChecked = true
        // 如果找到未选中的叶子结点, 设置newChecked为true并循环终止
        return 'break'
      }
    })
    return newChecked
  }
  return false
}
</script>
