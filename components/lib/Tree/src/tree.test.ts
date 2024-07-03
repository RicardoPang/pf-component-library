import { mount } from '@vue/test-utils'
import { describe, expect, test, beforeEach, vi } from 'vitest'
import PfTree from './Tree.vue'

vi.mock('axios')

describe('PfTree', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(PfTree, {
      props: {
        hasInput: true,
        placeholder: 'Search...',
        expandKeys: ['root'],
        defaultCheckedKeys: ['node1'],
        showCheckbox: true,
        showLine: true,
        draggable: true
      }
    })
  })

  test('渲染组件', () => {
    expect(wrapper.find('.pf-tree').exists()).toBe(true)
  })

  test('hasInput 为 true 渲染搜索栏', () => {
    expect(wrapper.find('.search-bar').exists()).toBe(true)
  })

  test('在搜索输入中渲染正确的占位符', () => {
    const input = wrapper.find('.input input')
    expect(input.attributes('placeholder')).toBe('Search...')
  })
})
