<template>
  <button
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
import type { ButtonProps } from './types'
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
  loading
} = defineProps<ButtonProps>()

// 计算属性构建按钮类名
const buttonClasses = computed(() => ({
  [`pf-button--${type}`]: type, // 根据类型添加类名
  [`pf-button--${size}`]: size, // 根据尺寸添加类名
  'is-plain': plain,
  'is-round': round,
  'is-circle': circle,
  'is-disabled': disabled,
  'is-loading': loading
}))

// 创建按钮元素引用
const buttonRef = ref<HTMLButtonElement>()

// 公共组件实例的属性和方法
defineExpose({
  ref: buttonRef
})
</script>
