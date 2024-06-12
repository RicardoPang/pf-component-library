import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

describe('Collapse.vue', () => {
  test('basic collapse', async () => {
    const wrapper = mount(Collapse, {
      props: {
        modelValue: ['a']
      },
      slots: {
        default: (
          <>
            <CollapseItem name="a" title="title a">
              content a
            </CollapseItem>
            <CollapseItem name="b" title="title b">
              content b
            </CollapseItem>
            <CollapseItem name="c" title="title c" disabled>
              content c
            </CollapseItem>
          </>
        )
      },
      global: {
        stubs: ['Icon']
      },
      attachTo: document.body
    })
    const headers = wrapper.findAll('.pf-collapse-item__header')
    const contents = wrapper.findAll('.pf-collapse-item__wrapper')

    // 测试组件是否渲染正确数量的头部和内容区域
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    const firstHeader = headers[0]
    const secondHeader = headers[1]
    const firstContent = contents[0]
    const secondContent = contents[1]
    const disabledContent = contents[2]

    // 使用数组索引访问元素，避免不必要的中间变量
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstHeader.text()).toBe('title a')
    expect(firstContent.text()).toBe('content a')

    // 测试点击事件和响应的变化
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()

    // 确认事件被正确触发
    expect(wrapper.emitted()).toHaveProperty('change')
    const changeEvent = wrapper.emitted('change') as any[]
    expect(changeEvent).toHaveLength(2)
    expect(changeEvent[1]).toEqual([['b']])

    // 测试禁用状态内容
    const disableHeader = headers[2]
    expect(disableHeader.classes()).toContain('is-disabled')
    await disableHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()
  })
})
