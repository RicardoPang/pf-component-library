import type { Placement, Options } from '@popperjs/core'

export interface TooltipProps {
  // 内容
  content?: string
  // 触发方式
  trigger?: 'click' | 'hover'
  // 弹出位置
  placement?: Placement
  // 是否手动控制显示隐藏
  manual?: boolean
  // popperjs选项
  popperOptions?: Partial<Options>
  // 过度动画名称
  transition?: string
  // 显示延时
  openDelay?: number
  // 隐藏延时
  closeDelay?: number
}

export interface TooltipEmits {
  // 可见性变化触发
  (e: 'visible-change', value: boolean): void
  // 点击外部触发
  (e: 'click-outside', value: boolean): void
}

// 实例方法
export interface TooltipInstance {
  // 显示
  show: () => void
  // 隐藏
  hide: () => void
}
