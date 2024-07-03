import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export interface IconProps {
  border?: boolean // 是否显示边框
  fixedWidth?: boolean // 是否固定宽度
  flip?: 'horizontal' | 'vertical' | 'both' // 翻转方向
  icon: object | Array<string> | string | IconDefinition // 图标 对象 | 数组 | 字符串
  mask?: object | Array<string> | string // 图标遮罩 对象 | 数组 | 字符串
  listItem?: boolean // 是否为列表项
  pull?: 'right' | 'left' // 图标拉动方向
  pulse?: boolean // 是否闪烁
  rotation?: 90 | 180 | 270 | '90' | '180' | '270' // 旋转角度
  swapOpacity?: boolean // 是否交换透明度
  // 图标尺寸
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
  spin?: boolean // 是否自旋
  transform?: object | string // 图标变换
  symbol?: boolean | string // 是否为符号
  title?: string // 图标标题
  inverse?: boolean // 是否反色
  bounce?: boolean // 是否反弹
  shake?: boolean // 是否抖动
  beat?: boolean // 是否心跳
  fade?: boolean // 是否淡入淡出
  beatFade?: boolean // 是否心跳淡入淡出
  spinPulse?: boolean // 是否自旋
  spinReverse?: boolean // 是否反向
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' // 图标类型
  color?: string // 图标颜色
}
