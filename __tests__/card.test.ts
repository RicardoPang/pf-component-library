import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from '../components/lib/card/src/main.vue'

describe('Card.vue', () => {
  // 测试卡片宽度样式
  it('applies width style when the width prop is set', () => {
    const wrapper = mount(Card, {
      props: { width: 100 }
    })
    const cardElement = wrapper.find('.p-card')
    expect(cardElement.attributes('style')).toContain('width: 100px')
  })

  // 测试图片高度样式
  it('applies image height style when the imgHeight prop is set', () => {
    const wrapper = mount(Card, {
      props: { imgHeight: 200 }
    })
    const cardImgElement = wrapper.find('.p-card-img')
    expect(cardImgElement.attributes('style')).toContain('height: 200px')
  })

  // 测试图片源
  it('renders imgSrc correctly', () => {
    const imgSrc = 'test-image.jpg'
    const wrapper = mount(Card, {
      props: { imgSrc }
    })
    const imgElement = wrapper.find('img')
    expect(imgElement.attributes('src')).toBe(imgSrc)
  })

  // 测试摘要内容
  it('displays summary when the summary prop is provided', () => {
    const summary = 'This is a summary.'
    const wrapper = mount(Card, {
      props: { summary }
    })
    const summaryElement = wrapper.find('.p-card-summary')
    expect(summaryElement.text()).toBe(summary)
  })

  // 测试默认插槽内容
  it('renders default slot content', () => {
    const defaultSlotContent = 'Default slot content'
    const wrapper = mount(Card, {
      slots: { default: defaultSlotContent }
    })
    const summaryElement = wrapper.find('.p-card-summary')
    expect(summaryElement.text()).toBe(defaultSlotContent)
  })

  // 测试 footer 插槽内容
  it('renders footer slot content', () => {
    const footerSlotContent = 'Footer slot content'
    const wrapper = mount(Card, {
      slots: { footer: footerSlotContent }
    })
    const footerElement = wrapper.find('.p-card-footer')
    console.log(footerElement.html()) // Should show the HTML of the footer which includes the slot content
    console.log(footerSlotContent) // Should just log the string 'Footer slot content'
    expect(footerElement.text()).toBe(footerSlotContent)
  })
})
