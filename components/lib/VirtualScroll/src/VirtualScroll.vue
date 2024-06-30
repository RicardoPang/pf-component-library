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
      <template v-if="autoHeight">
        <div
          v-for="item in showDataList"
          :key="item.id"
          :ref="(el) => setItemRef(el as HTMLElement, item.id)"
        >
          <slot :thisItem="item" />
        </div>
      </template>
      <template v-else>
        <div
          v-for="item in showDataList"
          :key="item.id"
          :style="[
            scrollDirection === 'vertical'
              ? { height: `${oneHeight}px` }
              : { width: `${oneWidth}px` }
          ]"
        >
          <slot :thisItem="item" />
        </div>
      </template>
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
  size: 20,
  scrollDirection: 'vertical',
  autoHeight: false,
  estimatedItemHeight: 100
})

// 定义组件状态
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

// 组件容器
const scrollContainer = ref<HTMLElement | null>(null)
// 分页偏移量
let offset = ref(props.offset)
// 收集观察器
const observers = new Map<number | string, ResizeObserver>()
// Item项高度
const allItemHeights = ref<Map<number | string, number>>(new Map())

// 设置项目引用并添加观察器ResizeObserver
const setItemRef = (el: HTMLElement | null, id: string) => {
  if (!el) return

  const observer = new ResizeObserver((entries) => {
    const entry = entries[0]
    if (entry) {
      if (entry.contentRect.height > 0) {
        // 记录项目高度
        allItemHeights.value.set(id, entry.contentRect.height)
      } else if (!allItemHeights.value.has(id)) {
        // 使用预估高度
        allItemHeights.value.set(id, props.estimatedItemHeight)
      }
    }
  })

  observer.observe(el)
  observers.set(id, observer)
}

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
    const list = res.data?.list || []
    if (list.length > 0 && props.autoHeight) {
      list.forEach((item: any) => {
        // 设置预估高度
        allItemHeights.value.set(item.id, props.estimatedItemHeight)
      })
    } else {
      return list
    }
    return res.data.list
  } catch (err) {
    console.log(err)
    return false
  } finally {
    state.isRequestStatus = false
  }
}

// 获取容器尺寸, ~~表示向下取整
const getContainerSize = (isScroll = false) => {
  if (scrollContainer.value) {
    if (props.scrollDirection === 'vertical') {
      if (!isScroll) {
        state.containSize = ~~(
          scrollContainer.value.offsetHeight / props.oneHeight +
          2
        )
      } else {
        let totalHeight = 0
        let itemsCount = 0
        const itemHeights = getAllItemHeights()
        while (
          totalHeight < scrollContainer.value.clientHeight &&
          itemsCount < itemHeights.length
        ) {
          totalHeight += itemHeights[itemsCount]
          itemsCount++
        }
        state.containSize = itemsCount + 2
      }
    } else {
      state.containSize = ~~(
        scrollContainer.value.offsetWidth / props.oneWidth +
        2
      )
    }
  }
}

// 节流提高性能
const fps = 30
const throttleInterval = 1000 / fps // 每帧的时间间隔, 最多每 33.33 毫秒触发一次
const throttledSetDataStartIndex = throttle(() => {
  // 使用requestAnimationFrame来确保滚动处理的性能
  window.requestAnimationFrame(setDataStartIndex)
}, throttleInterval)

// 滚动处理
const handleScroll = () => {
  throttledSetDataStartIndex()
}

const getAllItemHeights = () => {
  return Array.from(allItemHeights.value.values())
}

// 设置数据开始索引
const setDataStartIndex = async () => {
  if (!scrollContainer.value) return
  let currentIndex = -1
  // 使用动态宽度计算当前索引
  let scrollOffset = 0
  if (props.scrollDirection === 'vertical') {
    state.currentScrollTop = scrollContainer.value.scrollTop
    if (props.autoHeight) {
      const itemHeights = getAllItemHeights()
      for (let i = 0; i < itemHeights.length; i++) {
        scrollOffset += itemHeights[i]
        if (scrollOffset > state.currentScrollTop) {
          currentIndex = i
          getContainerSize(true)
          break
        }
      }
      if (itemHeights.length < endIndex.value) {
        for (let i = itemHeights.length; i < endIndex.value; i++) {
          allItemHeights.value.set(i, props.estimatedItemHeight)
        }
      }
    } else {
      currentIndex = Math.floor(
        scrollContainer.value.scrollTop / props.oneHeight
      )
    }
  } else {
    state.currentScrollLeft = scrollContainer.value.scrollLeft
    currentIndex = Math.floor(scrollContainer.value.scrollLeft / props.oneWidth)
  }

  if (state.startIndex === currentIndex) return
  state.startIndex = currentIndex

  // 检查是否需要加载更多数据
  if (
    state.startIndex + state.containSize > state.allDataList.length - 1 &&
    !state.isRequestStatus
  ) {
    offset.value += props.size
    const list = await getList(offset.value)
    if (list) {
      // 追加请求新的数据
      state.allDataList = [...state.allDataList, ...list]
    }
  }
}

// 结束索引: state.containSize * 2 乘以2的原因是为了确保在滚动时能够预加载足够多的元素，以提供更流畅的滚动体验
const endIndex = computed(() => {
  // 计算endIndex为当前startIndex加上两倍的containSize
  let endIndex = state.startIndex + state.containSize * 2
  if (!state.allDataList[endIndex]) {
    // 如果endIndex超出allDataList的长度，则设置endIndex为allDataList的最后一个元素的索引
    endIndex = state.allDataList.length - 1
  }
  return endIndex
})

// 显示数据列表, state.startIndex - state.containSize超出一屏
const showDataList = computed(() => {
  // 确定startIndex的起始值
  // 小于等于 state.containSize 确保最初内容完整显示
  // 否则 确保在当前可视区域上方加载更多内容 平滑滚动
  const startIndex =
    state.startIndex <= state.containSize
      ? 0
      : state.startIndex - state.containSize
  // 返回从startIndex到endIndex之间的元素
  return state.allDataList.slice(startIndex, endIndex.value)
})

// 计算空白填充高度
const calculatePaddingTop = (startIndex: number, containSize: number) => {
  const itemHeights = getAllItemHeights()
  const sliceHeight = itemHeights.slice(containSize + 1).slice(0, startIndex)
  return `${sliceHeight.reduce((acc, height) => acc + height, 0)}px`
}
const calculatePaddingBottom = (startIndex: number, containSize: number) => {
  const itemHeights = getAllItemHeights()
  const sliceHeight = itemHeights
    .slice(containSize + 1)
    .slice(0, state.allDataList.length - endIndex.value - 1)
  console.log(
    startIndex,
    containSize,
    state.allDataList.length - endIndex.value,
    itemHeights
  )
  return `${sliceHeight.reduce((acc, height) => acc + height, 0)}px`
}

// 空白填充样式 确保滚动条反应列表完整高度或宽度 模拟未渲染部分
const blankFillStyle = computed(() => {
  const startIndex = Math.max(0, state.startIndex - state.containSize)
  if (props.scrollDirection === 'vertical') {
    let paddingTop = '0px'
    let paddingBottom = '0px'
    if (props.autoHeight) {
      if (startIndex > 0) {
        paddingTop = calculatePaddingTop(startIndex, state.containSize)
      }
      paddingBottom = calculatePaddingBottom(startIndex, state.containSize)
    } else {
      paddingTop = `${startIndex * props.oneHeight}px`
      paddingBottom = `${(state.allDataList.length - endIndex.value - 1) * props.oneHeight}px`
    }
    return {
      paddingTop,
      paddingBottom
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
  window.addEventListener('resize', () => getContainerSize())
  window.addEventListener('orientationchange', () => getContainerSize())
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
  window.removeEventListener('resize', () => getContainerSize())
  window.removeEventListener('orientationchange', () => getContainerSize())
  // 清除所有观察器
  observers.forEach((observer) => observer.disconnect())
  observers.clear()
})
</script>
