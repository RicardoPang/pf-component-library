import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Icon from '../components/lib/icon/src/main.vue'

describe('Icon.vue', () => {
  it('renders the icon with correct class, size, and color', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'setting',
        size: 24,
        color: 'red'
      }
    })

    const iconElement = wrapper.find('i')
    expect(iconElement.classes()).toContain('one-icon-setting')
    expect(iconElement.attributes('style')).toContain('font-size: 24px;')
    expect(iconElement.attributes('style')).toContain('color: red;')
  })
})
