export interface InputProps {
  type?: string // 输入框类型
  modelValue: string // 绑定值
  size?: 'large' | 'small' // 尺寸
  disabled?: boolean // 是否禁用
  clearable?: boolean // 是否显示清除按钮
  showPassword?: boolean // 是否显示密码
  placeholder?: string // 占位符
  readonly?: boolean // 是否只读
  autocomplete?: string // 自动补全
  autofocus?: boolean // 自动获取焦点
  form?: string // 表单字段
}

export interface InputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'input', value: string): void
  (e: 'focus', value: FocusEvent): void
  (e: 'blur', value: FocusEvent): void
  (e: 'clear'): void
}

export interface InputInstance {
  ref: HTMLInputElement | HTMLTextAreaElement
}
