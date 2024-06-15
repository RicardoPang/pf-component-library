import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Form from './Form.vue'
import FormItem from './FormItem.vue'
import Input from '../../Input/src/Input.vue'

// 创建一个测试组件
const TestComponent = {
  components: { Form, FormItem, Input },
  template: `
    <Form ref="form" :model="formData" :rules="rules">
      <FormItem label="Name" prop="name">
        <Input v-model="formData.name" placeholder="Enter your name" />
      </FormItem>
      <FormItem label="Email" prop="email">
        <Input v-model="formData.email" placeholder="Enter your email" />
      </FormItem>
    </Form>
  `,
  data() {
    return {
      formData: {
        name: '',
        email: ''
      },
      rules: {
        name: [
          { required: true, message: 'Name is required', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Email is required', trigger: 'blur' },
          { type: 'email', message: 'Email is not valid', trigger: 'blur' }
        ]
      }
    }
  }
}

describe('Form.vue', () => {
  it('呈现表单和表单项', async () => {
    const wrapper = mount(TestComponent)
    expect(wrapper.find('.pf-form').exists()).toBe(true)
    expect(wrapper.find('.pf-form-item').exists()).toBe(true)
    expect(wrapper.findAll('.pf-form-item').length).toBe(2)
  })

  it('验证必需的字段', async () => {
    const wrapper = mount(TestComponent)
    const form = wrapper.findComponent({ ref: 'form' }).vm as any
    try {
      await form.validate()
    } catch (errors) {
      expect(errors).toHaveProperty('name')
      expect(errors).toHaveProperty('email')
    }
  })

  it('验证电子邮件格式', async () => {
    const wrapper = mount(TestComponent)
    const vm = wrapper.vm as any
    vm.formData.email = 'invalid-email'
    await wrapper.vm.$nextTick()
    const form = wrapper.findComponent({ ref: 'form' }).vm as any
    try {
      await form.validate()
    } catch (errors: any) {
      expect(errors).toHaveProperty('email')
      expect(errors.email[0].message).toBe('Email is not valid')
    }
  })

  it('验证通过', async () => {
    const wrapper = mount(TestComponent)
    const vm = wrapper.vm as any
    vm.formData.name = 'Ricardo'
    vm.formData.email = 'ricardo.pangj@gmail.com'
    await wrapper.vm.$nextTick()
    const form = wrapper.findComponent({ ref: 'form' }).vm as any
    const result = await form.validate()
    expect(result).toBe(true)
  })

  it('重置字段', async () => {
    const wrapper = mount(TestComponent)
    const form = wrapper.findComponent({ ref: 'form' }).vm as any
    const vm = wrapper.vm as any
    vm.formData.name = 'Ricardo'
    vm.formData.email = 'ricardo.pangj@gmail.com'
    await form.resetFields()
    expect(vm.formData).toEqual({ name: '', email: '' })
  })
})
