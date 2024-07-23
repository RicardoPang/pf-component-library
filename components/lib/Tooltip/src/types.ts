import type { Placement, Options } from '@popperjs/core'

/**
 * 定义 Tooltip 组件的属性接口。
 */
export interface TooltipProps {
  /** Tooltip 的内容。 */
  content?: string

  /** 触发方式，可选 'click' 或 'hover'。 */
  trigger?: 'click' | 'hover'

  /** 弹出位置，使用 Popper.js 的 Placement 类型。 */
  placement?: Placement

  /** 是否手动控制显示隐藏。 */
  manual?: boolean

  /** Popper.js 的选项。 */
  popperOptions?: Partial<Options>

  /** 过渡动画名称。 */
  transition?: string

  /** 显示延时（毫秒）。 */
  openDelay?: number

  /** 隐藏延时（毫秒）。 */
  closeDelay?: number
}

/**
 * 定义 Tooltip 组件的事件接口。
 */
export interface TooltipEmits {
  /**
   * 当可见性变化时触发。
   * @param e 事件名称 'visible-change'。
   * @param value 当前的可见性状态。
   */
  (e: 'visible-change', value: boolean): void

  /**
   * 当点击外部区域时触发。
   * @param e 事件名称 'click-outside'。
   * @param value 是否点击了外部区域。
   */
  (e: 'click-outside', value: boolean): void
}

/**
 * 定义 Tooltip 实例的方法接口。
 */
export interface TooltipInstance {
  /** 显示 Tooltip。 */
  show: () => void

  /** 隐藏 Tooltip。 */
  hide: () => void
}
