import type { VNode, ComponentInternalInstance } from 'vue'

export interface MessageProps {
  message?: string | VNode // 消息内容
  duration?: number // 消息显示时长，单位为毫秒，默认为 3000，设为 0 则不会自动关闭
  showClose?: boolean // 是否显示关闭按钮
  type?: 'success' | 'info' | 'warning' | 'danger' // 消息类型
  onDestory: () => void // 销毁消息
  id: string // 消息唯一标识
  zIndex: number // z-index消息层级
  offset?: number // 消息偏移量
  transitionName?: string // 消息动画名称
}

export interface MessageContext {
  id: string // 消息唯一标识
  vnode: VNode // 虚拟节点
  vm: ComponentInternalInstance // 组件实例
  props: MessageProps // 消息属性
  destory: () => void // 销毁函数
}

// 创建类型, 排除MessageProps中除了onDestory、id、zIndex之外的类型
export type CreateMessageProps = Omit<
  MessageProps,
  'onDestory' | 'id' | 'zIndex'
>
