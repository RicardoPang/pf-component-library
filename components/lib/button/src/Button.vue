<template>
  <button
    @click="handleClick"
    ref="buttonRef"
    class="pf-button"
    :class="buttonClasses"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <pf-icon icon="spinner" spin v-if="loading" />
    <pf-icon :icon="icon" v-if="icon" />
    <span><slot /></span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
// 导入组件类型 type 只是导入类型
import type { ButtonEmits, ButtonProps } from './types'
import PfIcon from '../../Icon/src/Icon.vue'

// 定义组件名
defineOptions({
  name: 'PfButton'
})

// 定义props并设置默认值
const {
  type,
  size,
  plain,
  round,
  circle,
  disabled,
  nativeType = 'button',
  autofocus,
  loading,
  href,
  target = '_self'
} = defineProps<ButtonProps>()

const emits = defineEmits<ButtonEmits>()

/**
 * 计算按钮的类名
 * @returns {object} 按钮的类名对象
 */
const buttonClasses = computed(() => ({
  [`pf-button--${type}`]: type, // 根据类型添加类名
  [`pf-button--${size}`]: size, // 根据尺寸添加类名
  'is-plain': plain,
  'is-round': round,
  'is-circle': circle,
  'is-disabled': disabled,
  'is-loading': loading
}))

/**
 * 按钮元素的引用
 * @type {Ref<HTMLButtonElement>}
 */
const buttonRef = ref<HTMLButtonElement>()

const handleClick = (e: MouseEvent) => {
  if (loading || disabled) {
    return
  }
  if (href) {
    window.open(href, target)
    return
  }
  emits('click', e)
}

// 公共组件实例的属性和方法
defineExpose({
  /**
   * 按钮元素的引用
   * @type {Ref<HTMLButtonElement>}
   */
  ref: buttonRef
})
</script>
