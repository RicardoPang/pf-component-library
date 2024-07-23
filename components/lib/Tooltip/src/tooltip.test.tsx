import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Tooltip from './Tooltip.vue'

vi.mock('@popperjs/core')
const onVisibleChange = vi.fn()

const createWrapper = () => {
  return mount(
    () => (
      <div>
        <div id="outside"></div>
        <Tooltip
          content="hello tooltip"
          trigger="click"
          onVisible-change={onVisibleChange}
        >
          <button id="trigger"></button>
        </Tooltip>
      </div>
    ),
    {
      attachTo: document.body
    }
  )
}

describe('Tooltip.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    onVisibleChange.mockClear()
  })
  test('点击触发的基本工具提示功能', async () => {
    const wrapper = createWrapper()

    // 静态测试
    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy()
    // 初始状态:工具提示应该不可见
    expect(wrapper.find('.pf-tooltip__popper').exists()).toBeFalsy()
    console.log('before', wrapper.html())

    // 触发点击按钮，检查工具提示是否出现
    triggerArea.trigger('click')
    await vi.runAllTimers() // 让所有timer运行完毕
    expect(wrapper.find('.pf-tooltip__popper').exists()).toBeTruthy()
    expect(wrapper.get('.pf-tooltip__popper').text()).toBe('hello tooltip')
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    console.log('after', wrapper.html())

    // 触发点击外部区域，检查工具提示是否消失
    wrapper.get('#outside').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.pf-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  })
})
