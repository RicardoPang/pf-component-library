<template>
  <Transition
    :name="transitionName"
    @after-leave="destroyComponent"
    @enter="updateHeight"
  >
    <div
      class="pf-message"
      v-show="visible"
      :class="messageClasses"
      role="alert"
      ref="messageRef"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="pf-message__content">
        <slot>
          <RenderVnode :vNode="message" v-if="message" />
        </slot>
      </div>
      <div class="pf-message__close" v-if="showClose">
        <pf-icon @click.stop="visible = false" icon="xmark" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { MessageProps } from './types'
import { getLastBottomOffset } from './method'
import RenderVnode from '../../Common/RenderVnode'
import PfIcon from '../../Icon/src/Icon.vue'
import useEventListener from '../../hooks/useEventListener'

defineOptions({
  name: 'PfMessage'
})

// 定义组件的props并设置默认值
const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade-up'
})

const visible = ref(false) // 是否显示
const messageRef = ref<HTMLDivElement>() // 消息元素
const height = ref(0) // 消息元素高度

// 上一个实例的底部偏移量
const lastOffset = computed(() => getLastBottomOffset(props.id))
// 元素最高端top值
const topOffset = computed(() => height.value + lastOffset.value)
// 元素最低端bottom值
const bottomOffset = computed(() => height.value + topOffset.value)

/**
 * 计算css样式
 * @returns 元素的 CSS 样式
 */
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex
}))

/**
 * 计算类名
 * @returns 元素的类名
 */
const messageClasses = computed(() => ({
  [`pf-message--${props.type}`]: props.type,
  'is-close': props.showClose
}))

let timer: any

/**
 * 开始计时器
 */
const startTimer = () => {
  if (props.duration !== 0) {
    timer = setTimeout(() => {
      visible.value = false
    }, props.duration)
  }
}

/**
 * 清除计时器
 */
const clearTimer = () => {
  if (timer) {
    clearTimeout(timer)
  }
}

onMounted(async () => {
  visible.value = true
  startTimer()
})

/**
 * 监听键盘 ESC 事件
 * @param e - 键盘事件
 */
const keydown = (e: Event) => {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    visible.value = false
  }
}

useEventListener(document, 'keydown', keydown) // 使用事件监听钩子

/**
 * 销毁组件
 */
const destroyComponent = () => {
  props.onDestory()
}

/**
 * 更新高度
 */
const updateHeight = () => {
  height.value = messageRef.value?.getBoundingClientRect().height || 0
}

// 暴露底部偏移量及可见性
defineExpose({
  bottomOffset,
  visible
})
</script>
