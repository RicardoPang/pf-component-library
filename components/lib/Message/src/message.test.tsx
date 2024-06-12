import { describe, expect, test } from 'vitest'
import { nextTick } from 'vue'
import { createMessage, closeAll } from './method'

export const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null)
        await nextTick()
      })
    })
  })
}

function setTopValue(element: Element, value: number) {
  ;(element as HTMLElement).style.top = `${value}px`
}

function getTopValue(element: Element) {
  const styles = window.getComputedStyle(element)
  const topValue = styles.getPropertyValue('top')
  return Number.parseFloat(topValue)
}

describe('createMessage', () => {
  test('调用方法应该创建对应的Message组件', async () => {
    const instance = createMessage({ message: 'hello message', duration: 0 })
    await rAF()
    console.log('html', document.body.innerHTML)
    expect(document.querySelector('.pf-message')).toBeTruthy()
    instance.destory()
    await rAF()
    // 等待转换完成
    await new Promise((resolve) => setTimeout(resolve, 0))
    console.log('html2', document.body.innerHTML)
    expect(document.querySelector('.pf-message')).toBeFalsy()
  })
  test('多次调用方法创建多个实例', async () => {
    createMessage({ message: 'hello message', duration: 0 })
    createMessage({ message: 'hello message2', duration: 0 })
    await rAF()
    const elements = document.querySelectorAll('.pf-message')
    expect(elements.length).toBe(2)
    closeAll()
    await rAF()
    // 等待转换完成
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(document.querySelector('.pf-message')).toBeFalsy()
  })
  test('创建多个实例设置正确offset', async () => {
    createMessage({ message: 'hello message', duration: 0, offset: 100 })
    createMessage({ message: 'hello message2', duration: 0, offset: 50 })
    await rAF()

    const elements = document.querySelectorAll('.pf-message')
    expect(elements.length).toBe(2)

    setTopValue(elements[0], 100)
    setTopValue(elements[1], 50)

    const firstEleTop = getTopValue(elements[0])
    const secondEleTop = getTopValue(elements[1])

    console.log(firstEleTop, secondEleTop)

    expect(firstEleTop).toBe(100)
    expect(secondEleTop).toBe(50)
  })
})
