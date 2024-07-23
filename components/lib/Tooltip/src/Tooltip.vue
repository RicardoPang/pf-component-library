<template>
  <div class="pf-tooltip" ref="poperContainerNode" v-on="outerEvents">
    <!-- 触发器 -->
    <div class="pf-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>
    <!-- 工具提示内容 -->
    <Transition :name="transition">
      <div v-if="isOpen" class="pf-tooltip__popper" ref="popperNode">
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, onUnmounted, computed } from 'vue'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
import { debounce } from 'lodash-es'
import useClickOutside from '../../hooks/useClickOutside'
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'

/** 定义组件名 */
defineOptions({
  name: 'PfTooltip'
})

/** 初始化属性并提供默认值 */
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0
})

/** 定义事件 */
const emits = defineEmits<TooltipEmits>()

/** 定义状态和引用 */
const isOpen = ref(false) // 是否打开状态
const popperNode = ref<HTMLElement>() // 提示内容
const triggerNode = ref<HTMLElement>() // 触发器
let popperInstance: null | Instance = null // popper实例
let events: Record<string, any> = reactive({}) // 事件对象
let outerEvents: Record<string, any> = reactive({}) // 外部事件对象

/**
 * 清除事件
 */
const clearEvents = () => {
  events = {}
  outerEvents = {}
}

/**
 * 计算Popper配置选项
 */
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8]
        }
      }
    ],
    ...props.popperOptions
  }
})

/**
 * 打开工具提示
 */
const open = () => {
  isOpen.value = true
  emits('visible-change', true)
}

/**
 * 关闭工具提示
 */
const close = () => {
  isOpen.value = false
  emits('visible-change', false)
}

/**
 * 使用debounce处理打开和关闭延迟
 */
const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

/**
 * 最终打开工具提示
 */
const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}

/**
 * 最终关闭工具提示
 */
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}

/**
 * 切换工具提示显示状态
 */
const togglePopper = () => {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}

/**
 * 使用自定义hooks处理点击外部关闭逻辑
 */
useClickOutside(popperNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeFinal() // 如果是点击触发且当前不是手动控制, 则关闭
  }
  if (isOpen.value) {
    emits('click-outside', true)
  }
})

/**
 * 根据触发器类型添加事件, v-on 动态绑定事件
 */
const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = openFinal
    outerEvents['mouseleave'] = closeFinal
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}

if (!props.manual) {
  attachEvents()
}

/**
 * 监听manual变化, 添加或清除事件
 */
watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      clearEvents()
    } else {
      attachEvents()
    }
  }
)

/**
 * 监听trigger变化, 重新附加事件
 */
watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger) {
      clearEvents()
      attachEvents()
    }
  }
)

/**
 * 监听trigger变化, 重新附加事件
 */
watch(
  isOpen,
  (newValue) => {
    if (newValue) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(
          triggerNode.value,
          popperNode.value,
          popperOptions.value
        )
      } else {
        popperInstance?.destroy()
      }
    }
  },
  { flush: 'post' }
)

onUnmounted(() => {
  popperInstance?.destroy()
})

/**
 * 向外暴露接口方法
 */
defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal
})
</script>
