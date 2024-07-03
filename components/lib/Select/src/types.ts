import type { VNode } from 'vue'

export interface SelectOption {
  label: string // 显示标签
  value: string // 对应值
  disabled?: boolean // 是否禁用
}

export interface SelectProps {
  // v-model绑定值
  modelValue: string
  // 选项
  options?: SelectOption[]
  // 基本表单属性
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  renderLabel?: RenderLabelFunc
  filterable?: boolean
  filterMethod?: CustomFilterFunc
  remote?: boolean
  remoteMethod?: CustomFilterRemoteFunc
}

export interface SelectStates {
  inputValue: string // 输入框的值
  selectedOption: null | SelectOption // 选中的选项
  mouseHover: boolean // 鼠标是否悬停
  loading: boolean // 是否加载中
  highlightIndex: number // 高亮选项索引
}

// 渲染标签
export type RenderLabelFunc = (option: SelectOption) => VNode
// 过滤方法
export type CustomFilterFunc = (value: string) => SelectOption[]
// 远程过滤
export type CustomFilterRemoteFunc = (value: string) => Promise<SelectOption[]>

export interface SelectEmits {
  (e: 'change', value: string): void
  (e: 'update:modelValue', value: string): void
  (e: 'visible-change', value: boolean): void
  (e: 'clear'): void
}
