import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import type { MenuOption } from './types'
import Dropdown from './Dropdown.vue'

const options: MenuOption[] = [
  { key: 1, label: 'item1' },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]

const createWrapper = () => {
  return mount(
    () => (
      <div>
        <div id="outside"></div>
        <Dropdown placement="bottom" trigger="click" menuOptions={options}>
          <button id="trigger"></button>
        </Dropdown>
      </div>
    ),
    {
      attachTo: document.body
    }
  )
}

describe('Dropdown.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  test('点击触发的基本下拉功能', async () => {
    const wrapper = createWrapper()

    // 静态测试
    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy()
    // 初始状态:工具提示应该不可见
    expect(wrapper.find('.pf-tooltip__popper').exists()).toBeFalsy()
    console.log('before', wrapper.html())

    // 触发点击按钮，检查工具提示是否出现
    triggerArea.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.pf-tooltip__popper').exists()).toBeTruthy()
    const menuItems = wrapper.findAll('.pf-dropdown__item')
    expect(menuItems).toHaveLength(options.length)
    expect(menuItems[1].classes()).toContain('is-disabled')
    expect(menuItems[2].classes()).toContain('is-divided')
    console.log('after', wrapper.html())

    // 触发点击外部区域，检查工具提示是否消失
    wrapper.get('#outside').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.pf-tooltip__popper').exists()).toBeFalsy()
  })

  test('disabled选项应不响应点击事件', async () => {
    const wrapper = createWrapper()

    // 触发点击按钮，打开下拉菜单
    const triggerArea = wrapper.find('#trigger')
    triggerArea.trigger('click')
    await vi.runAllTimers()

    // 尝试点击一个已禁用的菜单项
    const disabledMenuItem = wrapper.findAll('.pf-dropdown__item')[1] // 第二个是禁用的
    await disabledMenuItem.trigger('click')
    await vi.runAllTimers()

    // 菜单应该仍然可见，因为禁用的菜单项不应关闭下拉菜单
    expect(wrapper.find('.pf-tooltip__popper').exists()).toBeTruthy()
  })

  test('点击非禁用菜单项应关闭下拉菜单', async () => {
    const wrapper = createWrapper()

    // 触发点击按钮，打开下拉菜单
    const triggerArea = wrapper.find('#trigger')
    triggerArea.trigger('click')
    await vi.runAllTimers()

    // 点击一个非禁用的菜单项
    const menuItem = wrapper.findAll('.pf-dropdown__item')[0] // 第一个是非禁用的
    await menuItem.trigger('click')
    await vi.runAllTimers()

    // 菜单应该关闭
    expect(wrapper.find('.pf-tooltip__popper').exists()).toBeFalsy()
  })
})
