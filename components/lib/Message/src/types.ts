import type { VNode, ComponentInternalInstance } from 'vue'

/**
 * 消息属性接口
 * @interface MessageProps
 */
export interface MessageProps {
  /**
   * 消息内容
   * @type {string | VNode}
   */
  message?: string | VNode

  /**
   * 消息显示时长，单位为毫秒，默认为 3000，设为 0 则不会自动关闭
   * @type {number}
   * @default 3000
   */
  duration?: number

  /**
   * 是否显示关闭按钮
   * @type {boolean}
   */
  showClose?: boolean

  /**
   * 消息类型
   * @type {'success' | 'info' | 'warning' | 'danger'}
   */
  type?: 'success' | 'info' | 'warning' | 'danger'

  /**
   * 销毁消息的回调函数
   * @type {() => void}
   */
  onDestory: () => void

  /**
   * 消息唯一标识
   * @type {string}
   */
  id: string

  /**
   * z-index消息层级
   * @type {number}
   */
  zIndex: number

  /**
   * 消息偏移量
   * @type {number}
   */
  offset?: number

  /**
   * 消息动画名称
   * @type {string}
   */
  transitionName?: string
}

/**
 * 消息上下文接口
 * @interface MessageContext
 */
export interface MessageContext {
  /**
   * 消息唯一标识
   * @type {string}
   */
  id: string

  /**
   * 虚拟节点
   * @type {VNode}
   */
  vnode: VNode

  /**
   * 组件实例
   * @type {ComponentInternalInstance}
   */
  vm: ComponentInternalInstance

  /**
   * 消息属性
   * @type {MessageProps}
   */
  props: MessageProps

  /**
   * 销毁函数
   * @type {() => void}
   */
  destory: () => void
}

/**
 * 创建消息属性类型，排除 `MessageProps` 中的 `onDestory`、`id` 和 `zIndex`
 * @type {Omit<MessageProps, 'onDestory' | 'id' | 'zIndex'>}
 */
export type CreateMessageProps = Omit<
  MessageProps,
  'onDestory' | 'id' | 'zIndex'
>
