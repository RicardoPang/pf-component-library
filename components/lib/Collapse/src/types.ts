import type { InjectionKey, Ref } from 'vue'

/**
 * 名称类型
 * @typedef {string | number} NameType
 */
export type NameType = string | number

/**
 * 折叠组件属性接口
 * @interface CollapseProps
 */
export interface CollapseProps {
  /**
   * 当前激活面板名称数组
   * @type {NameType[]}
   */
  modelValue: NameType[]

  /**
   * 是否启用手风琴模式
   * @type {boolean}
   */
  accordion?: boolean
}

/**
 * 折叠面板属性接口
 * @interface CollapseItemProps
 */
export interface CollapseItemProps {
  /**
   * 面板名称，唯一标识
   * @type {NameType}
   */
  name: NameType

  /**
   * 面板标题
   * @type {string}
   */
  title?: string

  /**
   * 是否禁用面板
   * @type {boolean}
   */
  disabled?: boolean
}

/**
 * 折叠上下文接口
 * @interface CollapseContext
 */
export interface CollapseContext {
  /**
   * 当前激活面板名称数组
   * @type {Ref<NameType[]>}
   */
  activeNames: Ref<NameType[]>

  /**
   * 处理面板点击事件函数
   * @param {NameType} name 面板名称
   */
  handleItemClick: (name: NameType) => void
}

/**
 * 折叠组件事件接口
 * @interface CollapseEmits
 * @param {string} e - 事件名称
 * @param {NameType[]} values - 事件值
 */
export interface CollapseEmits {
  /**
   * 当 modelValue 更新时触发
   * @param {NameType[]} values 更新后的面板名称数组
   */
  (e: 'update:modelValue', values: NameType[]): void

  /**
   * 当激活面板变化时触发
   * @param {NameType[]} values 激活的面板名称数组
   */
  (e: 'change', values: NameType[]): void
}

/**
 * 折叠上下文注入键
 * @type {InjectionKey<CollapseContext>}
 */
export const collapseContextKey: InjectionKey<CollapseContext> =
  Symbol('collapseContextKey')
