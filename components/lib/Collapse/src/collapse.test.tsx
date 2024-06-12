import { describe, test, expect, vi, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

// 使用mock函数模拟组件内部事件触发
const onChange = vi.fn()
let wrapper: VueWrapper
let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]
let firstContent: DOMWrapper<Element>,
  secondContent: DOMWrapper<Element>,
  disabledContent: DOMWrapper<Element>,
  firstHeader: DOMWrapper<Element>,
  secondHeader: DOMWrapper<Element>,
  disabledHeader: DOMWrapper<Element>

describe('Collapse.vue', () => {
  // 初始化组件并挂载到DOM
  beforeAll(() => {
    wrapper = mount(
      () => (
        <Collapse modelValue={['a']} onChange={onChange}>
          <CollapseItem name="a" title="title a">
            content a
          </CollapseItem>
          <CollapseItem name="b" title="title b">
            content b
          </CollapseItem>
          <CollapseItem name="c" title="title c" disabled>
            content c
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ['Icon']
        },
        attachTo: document.body // 直接挂载到真实DOM中可以测试和操作DOM
      }
    )
    headers = wrapper.findAll('.pf-collapse-item__header')
    contents = wrapper.findAll('.pf-collapse-item__wrapper')
    firstHeader = headers[0]
    secondHeader = headers[1]
    disabledHeader = headers[2]
    firstContent = contents[0]
    secondContent = contents[1]
    disabledContent = contents[2]
  })
  test('使用正确的文本呈现正确数量的标题和内容区域', () => {
    // 测试组件是否渲染正确数量的头部和内容区域
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)
    // 测试标题是否包含正确文本
    expect(firstHeader.text()).toBe('title a')
    expect(firstContent.text()).toBe('content a')
    // 测试第一个内容是否可见, 其他内容是否不可见
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(disabledContent.isVisible()).toBeFalsy()
  })
  test('在单击标题时切换内容可见性', async () => {
    // 点击第一个头部, 测试内容是否关闭
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    // 点击第二个头部, 测试内容是否打开
    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()
    // 测试onChange事件是否被正确触发
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith(['b'])
  })
  test('不切换禁用的内容', async () => {
    onChange.mockClear()
    expect(disabledHeader.classes()).toContain('is-disabled')
    // 触发点击事件, 测试禁用的内容是否没有反应
    await disabledHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()
    expect(onChange).not.toHaveBeenCalled()
  })
})

// 单独测试手风琴模式
test('手风琴模式应该只允许一次激活一个项目', async () => {
  // 创建手风琴模式的Collapse组件实例
  const accordionWrapper = mount(
    () => (
      <Collapse accordion modelValue={['a']} onChange={onChange}>
        <CollapseItem name="a" title="title a">
          content a
        </CollapseItem>
        <CollapseItem name="b" title="title b">
          content b
        </CollapseItem>
        <CollapseItem name="c" title="title c">
          content c
        </CollapseItem>
      </Collapse>
    ),
    {
      global: {
        stubs: ['Icon']
      },
      attachTo: document.body
    }
  )

  const accordionHeaders = accordionWrapper.findAll('.pf-collapse-item__header')
  const accordionContents = accordionWrapper.findAll(
    '.pf-collapse-item__wrapper'
  )

  // 初始状态, 只有第一项内容可见
  expect(accordionContents[0].isVisible()).toBeTruthy()
  expect(accordionContents[1].isVisible()).toBeFalsy()
  expect(accordionContents[2].isVisible()).toBeFalsy()

  // 触发第二个头部点击事件, 验证第二项内容被打开, 同时第一项内容被隐藏
  await accordionHeaders[1].trigger('click')
  expect(accordionContents[0].isVisible()).toBeFalsy()
  expect(accordionContents[1].isVisible()).toBeTruthy()

  // 触发第三个头部的点击事件，验证第三项内容被展开，同时第二项内容被隐藏
  await accordionHeaders[2].trigger('click')
  expect(accordionContents[1].isVisible()).toBeFalsy()
  expect(accordionContents[2].isVisible()).toBeTruthy()

  // 验证onChange回调函数被准确的调用了正确次数, 并传递了正确的参数
  expect(onChange).toHaveBeenCalledTimes(2)
  expect(onChange).toHaveBeenNthCalledWith(1, ['b'])
  expect(onChange).toHaveBeenNthCalledWith(2, ['c'])
})
