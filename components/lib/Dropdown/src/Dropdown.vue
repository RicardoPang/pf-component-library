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
          <template v-for="item in menuOptions" :key="item.key">
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
import { ref } from 'vue'
import type {
  DropdownProps,
  DropdownInstance,
  DropdownEmits,
  MenuOption
} from './types'

import RenderVnode from '../../Common/RenderVnode'
import Tooltip from '../../Tooltip/src/Tooltip.vue'
import type { TooltipInstance } from '../../Tooltip/src/types'

defineOptions({
  name: 'PfDropdown'
})
const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true
})
const emits = defineEmits<DropdownEmits>()
const tooltipRef = ref<TooltipInstance | null>(null)
const visibleChange = (e: boolean) => {
  emits('visible-change', e)
}
const itemClick = (e: MenuOption) => {
  if (e.disabled) {
    return
  }
  emits('select', e)
  if (props.hideAfterClick) {
    tooltipRef.value?.hide() // 点击后隐藏
  }
}
defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide()
})
</script>
