import type { VNode } from 'vue'

/**
 * 选项的接口。
 */
export interface SelectOption {
  /** 显示标签。 */
  label: string

  /** 对应值。 */
  value: string

  /** 是否禁用。 */
  disabled?: boolean
}

/**
 * Select 组件的属性接口。
 */
export interface SelectProps {
  /** v-model绑定值。 */
  modelValue: string

  /** 选项列表。 */
  options?: SelectOption[]

  /** 输入框的占位符文本。 */
  placeholder?: string

  /** 是否禁用输入框。 */
  disabled?: boolean

  /** 是否显示清除按钮。 */
  clearable?: boolean

  /** 自定义渲染标签的函数。 */
  renderLabel?: RenderLabelFunc

  /** 是否可过滤选项。 */
  filterable?: boolean

  /** 自定义过滤方法。 */
  filterMethod?: CustomFilterFunc

  /** 是否启用远程过滤。 */
  remote?: boolean

  /** 自定义远程过滤方法。 */
  remoteMethod?: CustomFilterRemoteFunc
}

/**
 * Select 组件的状态接口。
 */
export interface SelectStates {
  /** 输入框的值。 */
  inputValue: string

  /** 选中的选项。 */
  selectedOption: null | SelectOption

  /** 鼠标是否悬停在组件上。 */
  mouseHover: boolean

  /** 是否正在加载中。 */
  loading: boolean

  /** 高亮显示的选项索引。 */
  highlightIndex: number
}

/**
 * 自定义渲染标签的函数类型。
 * @param option 选项。
 * @returns 渲染的 VNode。
 */
export type RenderLabelFunc = (option: SelectOption) => VNode

/**
 * 自定义过滤方法的函数类型。
 * @param value 输入的值。
 * @returns 过滤后的选项列表。
 */
export type CustomFilterFunc = (value: string) => SelectOption[]

/**
 * 自定义远程过滤方法的函数类型。
 * @param value 输入的值。
 * @returns 过滤后的选项列表的 Promise。
 */
export type CustomFilterRemoteFunc = (value: string) => Promise<SelectOption[]>

/**
 * Select 组件的事件接口。
 */
export interface SelectEmits {
  /**
   * 值改变时触发。
   * @param e 事件名称 'change'。
   * @param value 改变后的值。
   */
  (e: 'change', value: string): void

  /**
   * 更新绑定值时触发。
   * @param e 事件名称 'update:modelValue'。
   * @param value 更新后的值。
   */
  (e: 'update:modelValue', value: string): void

  /**
   * 可见性变化时触发。
   * @param e 事件名称 'visible-change'。
   * @param value 当前可见状态。
   */
  (e: 'visible-change', value: boolean): void

  /**
   * 清除选项时触发。
   * @param e 事件名称 'clear'。
   */
  (e: 'clear'): void
}
