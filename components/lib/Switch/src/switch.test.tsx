import { describe, expect, test, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Switch from './Switch.vue'
import { nextTick } from 'vue'

describe('Switch.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(Switch, {
      props: {
        modelValue: false,
        activeValue: true,
        inactiveValue: false
      }
    })
  })

  test('基础用法,绑定v-model到一个Boolean变量', async () => {
    await wrapper.setProps({ modelValue: true })
    await nextTick()
    expect(wrapper.find('input').element.checked).toBe(true)

    await wrapper.trigger('click')
    await nextTick()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
    expect(wrapper.emitted('change')![0]).toEqual([false])
  })

  test('禁用状态', async () => {
    await wrapper.setProps({ disabled: true })
    await wrapper.trigger('click')
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  test('不同尺寸', async () => {
    await wrapper.setProps({ size: 'small' })
    await nextTick()
    expect(wrapper.find('.pf-switch').classes()).toContain('pf-switch--small')

    await wrapper.setProps({ size: 'large' })
    await nextTick()
    expect(wrapper.find('.pf-switch').classes()).toContain('pf-switch--large')
  })

  test('自定义value类型', async () => {
    await wrapper.setProps({
      modelValue: 'on',
      activeValue: 'on',
      inactiveValue: 'off'
    })
    await nextTick()
    expect(wrapper.find('input').element.checked).toBe(true)

    await wrapper.trigger('click')
    await nextTick()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['off'])
    expect(wrapper.emitted('change')![0]).toEqual(['off'])
  })

  test('文字描述', async () => {
    await wrapper.setProps({ activeText: 'ON', inactiveText: 'OFF' })
    await nextTick()
    // console.log(wrapper.html())
    // expect(wrapper.text()).toContain('ON')
  })

  test('初始值和状态保持一致', async () => {
    await wrapper.setProps({ modelValue: true })
    await nextTick()
    expect(wrapper.find('input').element.checked).toBe(true)

    await wrapper.setProps({ modelValue: false })
    await nextTick()
    expect(wrapper.find('input').element.checked).toBe(false)
  })
})
