import { describe, expect, it } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Input from './Input.vue'

describe('Input.vue', () => {
  it('renders', () => {
    const wrapper: VueWrapper = mount(Input, {
      props: {
        size: 'large',
        type: 'text',
        modelValue: ''
      },
      slots: {
        prepend: 'prepend',
        prefix: 'prefix'
      }
    })
    expect(wrapper.classes()).toContain('pf-input--large')
    expect(wrapper.classes()).toContain('is-prefix')

    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.get('input').attributes('type')).toBe('text')

    expect(wrapper.find('.pf-input__prepend').exists()).toBeTruthy()
    expect(wrapper.find('.pf-input__prefix').exists()).toBeTruthy()

    const wrapper2 = mount(Input, {
      props: {
        type: 'textarea',
        modelValue: ''
      }
    })
    expect(wrapper2.find('textarea').exists()).toBeTruthy()
  })

  it('v-model', async () => {
    const wrapper: VueWrapper = mount(Input, {
      props: {
        modelValue: 'hello',
        'onUpdate:modelValue': (value: string) =>
          wrapper.setProps({ modelValue: value }),
        type: 'text'
      }
    })
    expect(wrapper.get('input').element.value).toBe('hello')

    await wrapper.get('input').setValue('world')
    expect((wrapper.props() as { modelValue: string }).modelValue).toBe('world')

    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')

    const inputEvent = wrapper.emitted('input') as any[]
    const changeEvent = wrapper.emitted('change') as any[]
    expect(inputEvent[0]).toEqual(['world'])
    expect(changeEvent[0]).toEqual(['world'])

    await wrapper.setProps({ modelValue: 'prop update' })
    expect(wrapper.get('input').element.value).toBe('prop update')
  })

  it('clear', async () => {
    const wrapper: VueWrapper = mount(Input, {
      props: {
        modelValue: 'hello',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
        type: 'text'
      },
      global: {
        stubs: ['Icon']
      }
    })
    expect(wrapper.find('.pf-input__clear').exists()).toBeFalsy()
    const input = wrapper.get('input')
    await input.trigger('focus')
    expect(wrapper.emitted()).toHaveProperty('focus')

    await input.trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur')
  })
  it('change the password display', async () => {
    const wrapper: VueWrapper = mount(Input, {
      props: {
        modelValue: '',
        showPassword: true,
        type: 'text'
      },
      global: {
        stubs: ['Icon']
      }
    })
    expect(wrapper.find('.pf-input__password').exists()).toBeFalsy()
    const input = wrapper.get('input')
    await input.setValue('hello')
    expect(input.element.type).toBe('password')

    const eyeIcon = wrapper.find('.pf-input__password')
    expect(eyeIcon.exists()).toBeTruthy()

    await eyeIcon.trigger('click')
    expect(input.element.type).toBe('text')
  })
})
