/**
 * 组件值类型。
 */
export type SwitchValueType = boolean | string | number

/**
 * Switch 组件的属性接口。
 */
export interface SwtichProps {
  /** v-model绑定值。 */
  modelValue: SwitchValueType

  /** 是否禁用。 */
  disabled?: boolean

  /** 开启状态显示文本。 */
  activeText?: string

  /** 关闭状态显示文本。 */
  inactiveText?: string

  /** 开启状态的值。 */
  activeValue?: SwitchValueType

  /** 关闭状态的值。 */
  inactiveValue?: SwitchValueType

  /** 输入框名称。 */
  name?: string

  /** 输入框ID。 */
  id?: string

  /** 开关尺寸。 */
  size?: 'small' | 'large'
}

/**
 * Switch 组件的事件接口。
 */
export interface SwtichEmits {
  /**
   * 更新绑定值时触发。
   * @param e 事件名称 'update:modelValue'。
   * @param value 更新后的值。
   */
  (e: 'update:modelValue', value: SwitchValueType): void

  /**
   * 切换开关时触发。
   * @param e 事件名称 'change'。
   * @param value 切换后的值。
   */
  (e: 'change', value: SwitchValueType): void
}
