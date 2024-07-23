import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

/**
 * 图标属性接口
 * @interface IconProps
 */
export interface IconProps {
  /**
   * 是否显示边框
   * @type {boolean}
   */
  border?: boolean

  /**
   * 是否固定宽度
   * @type {boolean}
   */
  fixedWidth?: boolean

  /**
   * 翻转方向
   * @type {'horizontal' | 'vertical' | 'both'}
   */
  flip?: 'horizontal' | 'vertical' | 'both'

  /**
   * 图标，可以是对象、数组或字符串
   * @type {object | Array<string> | string | IconDefinition}
   */
  icon: object | Array<string> | string | IconDefinition

  /**
   * 图标遮罩，可以是对象、数组或字符串
   * @type {object | Array<string> | string}
   */
  mask?: object | Array<string> | string

  /**
   * 是否为列表项
   * @type {boolean}
   */
  listItem?: boolean

  /**
   * 图标拉动方向
   * @type {'right' | 'left'}
   */
  pull?: 'right' | 'left'

  /**
   * 是否闪烁
   * @type {boolean}
   */
  pulse?: boolean

  /**
   * 旋转角度
   * @type {90 | 180 | 270 | '90' | '180' | '270'}
   */
  rotation?: 90 | 180 | 270 | '90' | '180' | '270'

  /**
   * 是否交换透明度
   * @type {boolean}
   */
  swapOpacity?: boolean

  /**
   * 图标尺寸
   * @type {'2xs' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x'}
   */
  size?:
    | '2xs'
    | 'xs'
    | 'sm'
    | 'lg'
    | 'xl'
    | '2xl'
    | '1x'
    | '2x'
    | '3x'
    | '4x'
    | '5x'
    | '6x'
    | '7x'
    | '8x'
    | '9x'
    | '10x'

  /**
   * 是否自旋
   * @type {boolean}
   */
  spin?: boolean

  /**
   * 图标变换，可以是对象或字符串
   * @type {object | string}
   */
  transform?: object | string

  /**
   * 是否为符号
   * @type {boolean | string}
   */
  symbol?: boolean | string

  /**
   * 图标标题
   * @type {string}
   */
  title?: string

  /**
   * 是否反色
   * @type {boolean}
   */
  inverse?: boolean

  /**
   * 是否反弹
   * @type {boolean}
   */
  bounce?: boolean

  /**
   * 是否抖动
   * @type {boolean}
   */
  shake?: boolean

  /**
   * 是否心跳
   * @type {boolean}
   */
  beat?: boolean

  /**
   * 是否淡入淡出
   * @type {boolean}
   */
  fade?: boolean

  /**
   * 是否心跳淡入淡出
   * @type {boolean}
   */
  beatFade?: boolean

  /**
   * 是否自旋
   * @type {boolean}
   */
  spinPulse?: boolean

  /**
   * 是否反向
   * @type {boolean}
   */
  spinReverse?: boolean

  /**
   * 图标类型
   * @type {'primary' | 'success' | 'warning' | 'danger' | 'info'}
   */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'

  /**
   * 图标颜色
   * @type {string}
   */
  color?: string
}
