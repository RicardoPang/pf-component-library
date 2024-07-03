// 组件值类型
export type SwitchValueType = boolean | string | number

export interface SwtichProps {
  modelValue: SwitchValueType // v-model绑定值
  disabled?: boolean // 是否禁用
  activeText?: string // 开启状态显示文本
  inactiveText?: string // 关闭状态显示文本
  activeValue?: SwitchValueType // 开启状态的值
  inactiveValue?: SwitchValueType // 关闭状态的值
  name?: string // 输入框名称
  id?: string // 输入框ID
  size?: 'small' | 'large' // 开关尺寸
}

export interface SwtichEmits {
  // 更新绑定值
  (e: 'update:modelValue', value: SwitchValueType): void
  // 切换开关
  (e: 'change', value: SwitchValueType): void
}
