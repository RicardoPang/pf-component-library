import { render, h, shallowReactive } from 'vue'
import type { CreateMessageProps, MessageContext } from './types'
import MessageConstructor from './Message.vue'
import useZIndex from '../../hooks/useZIndex'

// 定义id和实例数组
let seed = 1
const instances: MessageContext[] = shallowReactive([])

// 创建实例函数
export const createMessage = (props: CreateMessageProps) => {
  const { nextZIndex } = useZIndex()
  const id = `message_${seed++}`
  const container = document.createElement('div')

  // 销毁函数
  const destory = () => {
    // 删除数组中的实例
    const idx = instances.findIndex((instance) => instance.id === id)
    if (idx !== -1) {
      instances.splice(idx, 1)
      render(null, container) // 渲染空内容以卸载组件
      const firstChild = container.firstElementChild
      if (firstChild) {
        document.body.removeChild(firstChild) // 从DOM中移除该容器
      }
    }
  }

  // 手动调用删除, 其实就是手动调整组件中visible的值
  // visible通过expose传出来的
  const manualDestory = () => {
    const instance = instances.find((instance) => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false // 设置组件可见性为false
    }
  }

  // 创建新属性, 传入属性,ID,zIndex和销毁函数
  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: destory
  }

  const vnode = h(MessageConstructor, newProps) // 创建messsage组件的虚拟DOM
  render(vnode, container) // 渲染虚拟DOM到容器
  document.body.appendChild(container.firstElementChild!) // 挂载到body

  // 获取组件实例
  const vm = vnode.component!
  // 消息实例
  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    destory: manualDestory
  }

  instances.push(instance)
  return instance
}

// 获取最后一个实例
export const getLastInstance = () => {
  return instances.at(-1)
}

// 获取上一个实例的底部偏移量
export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id)
  if (idx <= 0) return 0
  return instances[idx - 1].vm.exposed!.bottomOffset.value
}

// 关闭所有实例
export const closeAll = () => {
  instances.forEach((instance) => instance.destory())
}
