<template>
  <div :class="['pf-collapse-item', { 'is-disabled': disabled }]">
    <div
      :class="[
        'pf-collapse-item__header',
        {
          'is-disabled': disabled,
          'is-active': isActive
        }
      ]"
      :id="headerId"
      @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
      <pf-icon icon="angle-right" class="header-angle" />
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div class="pf-collapse-item__wrapper" v-show="isActive">
        <div class="pf-collapse-item__content" :id="contentId">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
import type { CollapseItemProps } from './types'
import { collapseContextKey } from './types'
import PfIcon from '../../Icon/src/Icon.vue'

// 定义组件名
defineOptions({
  name: 'PfCollapseItem'
})

// 接收组件属性
const props = defineProps<CollapseItemProps>()

/**
 * 注入的折叠上下文，用于获取折叠面板的状态和操作函数
 * @type {CollapseContext | undefined}
 */
const collapseContext = inject(collapseContextKey)

/**
 * 计算折叠项标题的唯一 ID
 * @type {ComputedRef<string>}
 */
const headerId = computed(() => `item-header-${props.name}`)

/**
 * 计算折叠项内容的唯一 ID
 * @type {ComputedRef<string>}
 */
const contentId = computed(() => `item-content-${props.name}`)

/**
 * 计算当前折叠项是否激活
 * @type {ComputedRef<boolean>}
 */
const isActive = computed(() =>
  collapseContext?.activeNames.value?.includes(props.name)
)

/**
 * 处理折叠项的点击事件
 */
const handleClick = () => {
  if (props.disabled) {
    return
  }
  collapseContext?.handleItemClick(props.name)
}

/**
 * 折叠项的过渡动画事件
 * @type {Record<string, (el: HTMLElement) => void>}
 */
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el: HTMLElement) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el: HTMLElement) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el: HTMLElement) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el: HTMLElement) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el: HTMLElement) {
    el.style.height = '0px'
  },
  afterLeave(el: HTMLElement) {
    el.style.height = ''
    el.style.overflow = ''
  }
}
</script>
