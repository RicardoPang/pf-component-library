import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'

describe('Collapse.vue', () => {
  test('测试Collapse组件的行为', async () => {
    // 进行断言和操作，测试Collapse组件的行为
    test('Collapse组件应该能够处理没有子组件的情况', () => {
      const wrapper = mount(Collapse)
      expect(wrapper.findAll('.pf-collapse-item__wrapper').length).toBe(0)
    })
    test('Collapse组件应该响应外部props变化', async () => {
      const wrapper = mount(Collapse, {
        props: { modelValue: [] }
      })
      await wrapper.setProps({ modelValue: ['a'] })
      expect(
        wrapper.find('.pf-collapse-item__wrapper').isVisible()
      ).toBeTruthy()
    })
    test('Collapse组件应当在modelValue变化时更新活动的CollapseItem', async () => {
      const wrapper = mount(Collapse, {
        props: { modelValue: ['a'] }
      })
      expect(
        wrapper.findAll('.pf-collapse-item__wrapper')[0].isVisible()
      ).toBeTruthy()
      await wrapper.setProps({ modelValue: ['b'] })
      expect(
        wrapper.findAll('.pf-collapse-item__wrapper')[1].isVisible()
      ).toBeTruthy()
    })
  })
})
