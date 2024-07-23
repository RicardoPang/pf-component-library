/**
 * 输入框属性接口
 * @interface InputProps
 */
export interface InputProps {
  /**
   * 输入框类型
   * @type {string}
   */
  type?: string

  /**
   * 绑定值
   * @type {string}
   */
  modelValue: string

  /**
   * 尺寸
   * @type {'large' | 'small'}
   */
  size?: 'large' | 'small'

  /**
   * 是否禁用
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * 是否显示清除按钮
   * @type {boolean}
   */
  clearable?: boolean

  /**
   * 是否显示密码
   * @type {boolean}
   */
  showPassword?: boolean

  /**
   * 占位符
   * @type {string}
   */
  placeholder?: string

  /**
   * 是否只读
   * @type {boolean}
   */
  readonly?: boolean

  /**
   * 自动补全
   * @type {string}
   */
  autocomplete?: string

  /**
   * 自动获取焦点
   * @type {boolean}
   */
  autofocus?: boolean

  /**
   * 表单字段
   * @type {string}
   */
  form?: string
}

/**
 * 输入框事件接口
 * @interface InputEmits
 * @param {string} e - 事件名称
 * @param {string | FocusEvent} [value] - 事件值
 */
export interface InputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'input', value: string): void
  (e: 'focus', value: FocusEvent): void
  (e: 'blur', value: FocusEvent): void
  (e: 'clear'): void
}

/**
 * 输入框实例接口
 * @interface InputInstance
 */
export interface InputInstance {
  /**
   * 输入框或文本区域的引用
   * @type {HTMLInputElement | HTMLTextAreaElement}
   */
  ref: HTMLInputElement | HTMLTextAreaElement
}
