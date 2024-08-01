// Vitest导入, 编写测试套件和测试用例
import { describe, test, expect } from 'vitest'
// 用于挂载和渲染Vue组件
import { mount } from '@vue/test-utils'
import Button from './Button.vue'
// 用于渲染图标
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Icon from '../../Icon/src/Icon.vue'

describe('Button.vue', () => {
  // 基础按钮测试, 断言类名, 按钮文本, click事件
  test('basic button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'button'
      }
    })
    console.log(wrapper.html())

    // slot
    expect(wrapper.classes()).toContain('pf-button--primary')
    expect(wrapper.get('button').text()).toBe('button')

    // events, 测试原生click事件
    wrapper.get('button').trigger('click')
    console.log(wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('click')
  })
  // 禁用按钮测试, 断言disabled属性, click事件
  test('disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'disabled'
      }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').element.disabled).toBeDefined()
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })
  // 图标按钮测试, 断言组件存在并icon属性为arrow-up
  test('icon', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up'
      },
      slots: {
        default: 'icon'
      },
      global: {
        // 使用FontAwesomeIcon, 避免实际渲染
        stubs: ['FontAwesomeIcon']
      }
    })
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('arrow-up')
  })
  // 加载按钮测试, 断言组件存在并icon属性为spinner
  test('loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading'
      },
      global: {
        stubs: ['PfIcon']
      }
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
