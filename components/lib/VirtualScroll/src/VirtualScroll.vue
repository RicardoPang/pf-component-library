<template>
  <div
    class="pf-scroll-container"
    :class="{
      [`pf-scroll--${scrollDirection}`]: scrollDirection
    }"
    ref="scrollContainer"
    @scroll.passive="handleScroll"
  >
    <div :style="blankFillStyle">
      <div
        v-for="(item, index) in showDataList"
        :key="index"
        :style="[
          scrollDirection === 'vertical'
            ? { height: `${oneHeight}px` }
            : { width: `${oneWidth}px` }
        ]"
      >
        <slot :thisItem="item" />
      </div>
      <div
        class="msg"
        :class="{
          [`msg--${scrollDirection}`]: scrollDirection
        }"
        v-if="state.isRequestStatus"
      >
        <h2>{{ msg }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onActivated,
  nextTick,
  reactive,
  onUnmounted
} from 'vue'
import axios from 'axios'
import type { VirtualScrollProps } from './types'
import { throttle } from 'lodash-es'

defineOptions({
  name: 'PfVirtualScroll'
})

// 初始化属性并提供默认值
const props = withDefaults(defineProps<VirtualScrollProps>(), {
  msg: '正在载入...',
  oneHeight: 100,
  oneWidth: 100,
  requestUrl: 'http://codercba.com:1888/airbnb/api/entire/list',
  offset: 0,
  size: 200,
  scrollDirection: 'vertical'
})

// 定义状态
const state = reactive({
  // 用来保存所有列表元素
  allDataList: [] as any[],
  // 数据请求状态
  isRequestStatus: true,
  // 容器最大容积
  containSize: 0,
  // 记录当前滚动的第一个元素的索引
  startIndex: 0,
  // 记录当前滚动距离顶部的位移
  currentScrollTop: 0,
  // 记录当前滚动距离左侧的位移
  currentScrollLeft: 0
})

// 容器
const scrollContainer = ref<HTMLElement | null>(null)
// 分页偏移量
let offset = ref(props.offset)

// 获取数据列表
const getList = async (
  offset: number,
  size: number = props.size
): Promise<any[] | false> => {
  state.isRequestStatus = true
  try {
    const res = await axios.get(
      `${props.requestUrl}?offset=${offset}&size=${size}`
    )
    return res.data.list
  } catch (err) {
    console.log(err)
    return false
  } finally {
    state.isRequestStatus = false
  }
}

// 获取容器尺寸, ~~表示向下取整
const getContainerSize = () => {
  if (scrollContainer.value) {
    if (props.scrollDirection === 'vertical') {
      state.containSize = ~~(
        scrollContainer.value.offsetHeight / props.oneHeight +
        2
      )
    } else {
      state.containSize = ~~(
        scrollContainer.value.offsetWidth / props.oneWidth +
        2
      )
    }
  }
}

// 节流限制执行setDataStartIndex频率
const fps = 30
const throttleInterval = 1000 / fps
const throttledSetDataStartIndex = throttle(() => {
  // 使用requestAnimationFrame来确保滚动处理的性能
  window.requestAnimationFrame(setDataStartIndex)
}, throttleInterval)

const handleScroll = () => {
  throttledSetDataStartIndex()
}

// 设置开始索引
const setDataStartIndex = async () => {
  if (!scrollContainer.value) return
  let currentIndex = -1
  if (props.scrollDirection === 'vertical') {
    state.currentScrollTop = scrollContainer.value.scrollTop
    currentIndex = Math.floor(scrollContainer.value.scrollTop / props.oneHeight)
  } else {
    state.currentScrollLeft = scrollContainer.value.scrollLeft
    currentIndex = Math.floor(scrollContainer.value.scrollLeft / props.oneWidth)
  }
  if (state.startIndex === currentIndex) return
  state.startIndex = currentIndex
  if (
    state.startIndex + state.containSize > state.allDataList.length - 1 &&
    !state.isRequestStatus
  ) {
    offset.value++
    const list = await getList(offset.value)
    if (list) {
      // 追加请求新的数据
      state.allDataList = [...state.allDataList, ...list]
    }
  }
}

// 容器最后一个元素的索引
const endIndex = computed(() => {
  let endIndex = state.startIndex + state.containSize * 2
  if (!state.allDataList[endIndex]) {
    // 如果最后一个元素不存在
    endIndex = state.allDataList.length - 1
  }
  return endIndex
})

// 显示数据列表, state.startIndex - state.containSize超出一屏
const showDataList = computed(() => {
  const startIndex =
    state.startIndex <= state.containSize
      ? 0
      : state.startIndex - state.containSize
  return state.allDataList.slice(startIndex, endIndex.value)
})

// 定义空白填充样式
const blankFillStyle = computed(() => {
  const startIndex =
    state.startIndex <= state.containSize
      ? 0
      : state.startIndex - state.containSize

  if (props.scrollDirection === 'vertical') {
    return {
      paddingTop: `${startIndex * props.oneHeight}px`,
      paddingBottom: `${(state.allDataList.length - endIndex.value - 1) * props.oneHeight}px`
    }
  } else {
    return {
      display: 'flex',
      paddingLeft: `${startIndex * props.oneWidth}px`,
      paddingRight: `${(state.allDataList.length - endIndex.value - 1) * props.oneWidth}px`
    }
  }
})

onMounted(async () => {
  const list = await getList(offset.value)
  if (list) state.allDataList = list
  getContainerSize()
  window.addEventListener('resize', getContainerSize)
  window.addEventListener('orientationchange', getContainerSize)
})

// 路由记录使用到KeepAlive，可以调用onActivated
onActivated(() => {
  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = state.currentScrollTop
      scrollContainer.value.scrollLeft = state.currentScrollLeft
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', getContainerSize)
  window.removeEventListener('orientationchange', getContainerSize)
})
</script>
