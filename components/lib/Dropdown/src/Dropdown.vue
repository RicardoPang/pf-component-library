<template>
  <div class="pf-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :manual="manual"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <!-- 默认插槽 -->
      <slot />
      <!-- 内容插槽, 放置下拉菜单 -->
      <template #content>
        <ul class="pf-dropdown__menu">
          <!-- 确保key唯一性, 去重 -->
          <template v-for="item in uniqueMenuOptions" :key="item.key">
            <li
              v-if="item.divided"
              role="separator"
              class="divided-placeholder"
            />
            <li
              class="pf-dropdown__item"
              @click="itemClick(item)"
              :class="{
                'is-disabled': item.disabled,
                'is-divided': item.divided
              }"
              :id="`dropdown-item-${item.key}`"
            >
              <RenderVnode :vNode="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import type {
  DropdownProps,
  DropdownInstance,
  DropdownEmits,
  MenuOption
} from './types'

import RenderVnode from '../../Common/RenderVnode'
import Tooltip from '../../Tooltip/src/Tooltip.vue'
import type { TooltipInstance } from '../../Tooltip/src/types'

/**
 * PfDropdown 组件
 *
 * @description
 * 这个组件用来创建一个带有下拉菜单的按钮。通过 Tooltip 组件展示下拉菜单。
 */
defineOptions({
  name: 'PfDropdown'
})

const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true
})

const uniqueMenuOptions = computed(() => {
  const optionMap = new Map()
  for (const item of props.menuOptions) {
    optionMap.set(item.key, item)
  }
  return Array.from(optionMap.values())
})

const emits = defineEmits<DropdownEmits>()

const tooltipRef = ref<TooltipInstance | null>(null)

/**
 * 处理可见性变化事件
 *
 * @param {boolean} e - 当前可见性状态
 */
const visibleChange = (e: boolean) => {
  emits('visible-change', e)
}

/**
 * 处理菜单项点击事件
 *
 * @param {MenuOption} e - 被点击的菜单项
 */
const itemClick = (e: MenuOption) => {
  if (e.disabled) {
    return
  }
  emits('select', e)
  if (props.hideAfterClick) {
    tooltipRef.value?.hide() // 点击后隐藏
  }
}

// 暴露组件实例方法
defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide()
})
</script>
