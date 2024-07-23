// 按钮类型
/**
 * 按钮的类型
 * @typedef {'primary' | 'success' | 'warning' | 'danger' | 'info'} ButtonType
 */
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

// 按钮尺寸
/**
 * 按钮的尺寸
 * @typedef {'large' | 'small'} ButtonSize
 */
export type ButtonSize = 'large' | 'small'

// 原生按钮类型
/**
 * 元素按钮的原生类型
 * @typedef {'button' | 'submit' | 'reset'} NativeType
 */
export type NativeType = 'button' | 'submit' | 'reset'

/**
 * 按钮属性接口
 * @interface ButtonProps
 */
export interface ButtonProps {
  /**
   * 按钮类型
   * @type {ButtonType}
   */
  type?: ButtonType

  /**
   * 按钮尺寸
   * @type {ButtonSize}
   */
  size?: ButtonSize

  /**
   * 是否为朴素按钮
   * @type {boolean}
   */
  plain?: boolean

  /**
   * 是否为圆角按钮
   * @type {boolean}
   */
  round?: boolean

  /**
   * 是否为圆形按钮
   * @type {boolean}
   */
  circle?: boolean

  /**
   * 是否禁用按钮
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * 元素按钮类型
   * @type {NativeType}
   */
  nativeType?: NativeType

  /**
   * 是否自动获取焦点
   * @type {boolean}
   */
  autofocus?: boolean

  /**
   * 按钮图标
   * @type {string}
   */
  icon?: string

  /**
   * 是否显示加载中
   * @type {boolean}
   */
  loading?: boolean

  /**
   * 按钮链接
   */
  href?: string

  /**
   * 按钮跳转目标
   */
  target?: string
}

/**
 * 按钮事件接口
 * @interface ButtonEmits
 * @param {string} e - 事件名称
 * @param {MouseEvent} value - 事件值
 */
export interface ButtonEmits {
  (e: 'click', value: MouseEvent): void
}

/**
 * 按钮实例接口
 * @interface ButtonInstance
 */
export interface ButtonInstance {
  /**
   * 按钮引用
   * @type {HTMLButtonElement}
   */
  ref: HTMLButtonElement
}
