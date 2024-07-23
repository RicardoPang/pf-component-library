import type { VNode } from 'vue'
import type { TooltipProps } from '../../Tooltip/src/types'

/**
 * 下拉组件属性接口
 * @interface DropdownProps
 * @extends TooltipProps
 */
export interface DropdownProps extends TooltipProps {
  /**
   * 菜单选项
   * @type {MenuOption[]}
   */
  menuOptions: MenuOption[]

  /**
   * 是否点击后隐藏
   * @type {boolean}
   */
  hideAfterClick?: boolean
}

/**
 * 菜单选项接口
 * @interface MenuOption
 */
export interface MenuOption {
  /**
   * 菜单展示标签
   * @type {string | VNode}
   */
  label: string | VNode

  /**
   * 菜单唯一标识
   * @type {string | number}
   */
  key: string | number

  /**
   * 是否禁用
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * 是否显示分割线
   * @type {boolean}
   */
  divided?: boolean
}

/**
 * 下拉组件事件接口
 * @interface DropdownEmits
 * @param {string} e - 事件名称
 * @param {boolean | MenuOption} value - 事件值
 */
export interface DropdownEmits {
  (e: 'visible-change', value: boolean): void
  (e: 'select', value: MenuOption): void
}

/**
 * 下拉组件实例方法接口
 * @interface DropdownInstance
 */
export interface DropdownInstance {
  /**
   * 显示下拉菜单
   */
  show: () => void

  /**
   * 隐藏下拉菜单
   */
  hide: () => void
}
