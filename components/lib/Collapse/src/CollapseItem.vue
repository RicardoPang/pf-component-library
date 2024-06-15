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
// 获取上下文
const collapseContext = inject(collapseContextKey)

const headerId = computed(() => `item-header-${props.name}`)
const contentId = computed(() => `item-header-${props.name}`)
// 当前折叠项是否激活
const isActive = computed(() =>
  collapseContext?.activeNames.value?.includes(props.name)
)

// 定义点击折叠项
const handleClick = () => {
  if (props.disabled) {
    return
  }
  collapseContext?.handleItemClick(props.name)
}

// 折叠项过度动画
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
