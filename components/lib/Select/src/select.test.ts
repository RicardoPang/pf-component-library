import { describe, expect, test, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Select from './Select.vue'

describe('Select.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(Select, {
      props: {
        modelValue: '1',
        options: [
          { label: 'hello', value: '1' },
          { label: 'xyz', value: '2' },
          { label: 'testing', value: '3' },
          { label: 'check', value: '4', disabled: true }
        ]
      },
      global: {
        stubs: ['Icon']
      }
    })
  })

  test('基础用法', async () => {
    expect(wrapper.find('input').element.value).toBe('hello')
  })
})
