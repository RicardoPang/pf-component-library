import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../components/lib/button/src/main.vue'

describe('Button.vue', () => {
  // 测试 type prop
  it('renders the correct button type', () => {
    const type = 'primary'
    const wrapper = mount(Button, {
      props: { type }
    })
    expect(wrapper.classes()).toContain(`p-button-${type}`)
  })

  // 测试点击事件
  it('emits a click event when clicked', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  // 测试 plain prop
  it('renders as plain when plain prop is true', () => {
    const wrapper = mount(Button, {
      props: { plain: true }
    })
    expect(wrapper.classes()).toContain('is-plain')
  })

  // 测试 round prop
  it('renders as round when round prop is true', () => {
    const wrapper = mount(Button, {
      props: { round: true }
    })
    expect(wrapper.classes()).toContain('is-round')
  })

  // 测试 circle prop
  it('renders as circle when circle prop is true', () => {
    const wrapper = mount(Button, {
      props: { circle: true }
    })
    expect(wrapper.classes()).toContain('is-circle')
  })

  // 测试 disabled prop
  it('renders as disabled when disabled prop is true', () => {
    const wrapper = mount(Button, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.attributes('disabled')).toBe('')
  })

  // 测试 icon prop
  it('renders an icon when icon prop is provided', () => {
    const icon = 'check'
    const wrapper = mount(Button, {
      props: { icon }
    })
    const iconElement = wrapper.find(`.one-icon-${icon}`)
    expect(iconElement.exists()).toBe(true)
  })

  // 测试默认插槽
  it('renders default slot content', () => {
    const slotContent = 'Click me!'
    const wrapper = mount(Button, {
      slots: { default: slotContent }
    })
    expect(wrapper.text()).toContain(slotContent)
  })
})
