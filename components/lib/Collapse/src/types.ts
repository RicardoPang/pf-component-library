import type { InjectionKey, Ref } from 'vue'

export type NameType = string | number

export interface CollapseProps {
  // 当前激活面板名称数组
  modelValue: NameType[]
  // 是否启用手风琴模式
  accordion?: boolean
}

export interface CollapseItemProps {
  // 面板名称 唯一标识
  name: NameType
  // 面板标识
  title?: string
  // 是否禁用面板
  disabled?: boolean
}

export interface CollapseContext {
  // 当前激活面板名称数组
  activeNames: Ref<NameType[]>
  // 处理面板点击事件函数
  handleItemClick: (name: NameType) => void
}

export interface CollaseEmits {
  // 当modelValue更新时触发
  (e: 'update:modelValue', values: NameType[]): void
  // 当激活面板变化时触发
  (e: 'change', values: NameType[]): void
}

export const collapseContextKey: InjectionKey<CollapseContext> =
  Symbol('collapseContextKey')
