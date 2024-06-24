import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import PfVirtualScroll from './VirtualScroll.vue'
import axios from 'axios'

// 创建 axios mock 实例
vi.mock('axios')

// 定义一个类ResizeObserver来模拟原生的ResizeObserver
class ResizeObserver {
  callback: (entries: any[], observer: ResizeObserver) => void

  constructor(callback: (entries: any[], observer: ResizeObserver) => void) {
    this.callback = callback
  }

  observe(target: HTMLElement) {
    // Simulate calling the callback with initial contentRect
    this.callback(
      [{ target, contentRect: target.getBoundingClientRect() }],
      this
    )
  }

  unobserve() {}

  disconnect() {}
}

;(global as any).ResizeObserver = ResizeObserver

const createWrapper = (propsData = {}) => {
  return mount(PfVirtualScroll, {
    props: {
      ...propsData
    },
    slots: {
      default: '<div>{{thisItem.id}}</div>'
    }
  })
}

describe('PfVirtualScroll.vue', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  // 测试加载数据
  test('should load data on initialization', async () => {
    ;(axios.get as any).mockResolvedValueOnce({
      data: {
        list: Array.from({ length: 50 }, (_, i) => ({ id: i }))
      }
    })

    const wrapper = createWrapper()
    await flushPromises() // 等待所有异步操作完成

    const vm = wrapper.vm as any
    expect(vm.state.allDataList.length).toBe(50)
    expect(wrapper.findAll('div').length).toBeGreaterThan(0)
  })

  // 测试在autoHeight模式下高度计算是否正确
  test('should calculate heights correctly with autoHeight', async () => {
    ;(axios.get as any).mockResolvedValueOnce({
      data: {
        list: Array.from({ length: 50 }, (_, i) => ({ id: i }))
      }
    })

    const wrapper = createWrapper({
      autoHeight: true,
      estimatedItemHeight: 120
    })
    await flushPromises()

    const vm = wrapper.vm as any
    const itemHeights = vm.getAllItemHeights()
    expect(itemHeights.every((height) => height === 120)).toBe(true)
  })

  // 测试在没有数据时组件是否能处理
  test('should handle no data gracefully', async () => {
    ;(axios.get as any).mockResolvedValueOnce({
      data: {
        list: []
      }
    })

    const wrapper = createWrapper()
    await flushPromises()

    const vm = wrapper.vm as any
    expect(vm.state.allDataList.length).toBe(0)
  })
})
