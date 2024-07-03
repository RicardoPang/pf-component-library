// 按钮类型
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
// 按钮尺寸
export type ButtonSize = 'large' | 'small'
// 原生按钮类型
export type NativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  type?: ButtonType // 按钮类型
  size?: ButtonSize // 按钮尺寸
  plain?: boolean // 是否为朴素按钮
  round?: boolean // 是否为圆角按钮
  circle?: boolean // 是否为圆形按钮
  disabled?: boolean // 是否禁用按钮
  nativeType?: NativeType // 元素按钮类型
  autofocus?: boolean // 是否自动获取焦点
  icon?: string // 按钮图标
  loading?: boolean // 是否显示加载中
}

export interface ButtonInstance {
  ref: HTMLButtonElement // 按钮引用
}
