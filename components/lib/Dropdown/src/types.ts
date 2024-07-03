import type { VNode } from 'vue'
import type { TooltipProps } from '../../Tooltip/src/types'

// 组件属性接口
export interface DropdownProps extends TooltipProps {
  menuOptions: MenuOption[] // 菜单选项
  hideAfterClick?: boolean // 是否点击后隐藏
}

export interface MenuOption {
  label: string | VNode // 菜单展示标签
  key: string | number // 菜单唯一标识
  disabled?: boolean // 是否禁用
  divided?: boolean // 分割线
}

// 组件事件接口
export interface DropdownEmits {
  (e: 'visible-change', value: boolean): void
  (e: 'select', value: MenuOption): void
}

// 组件实例方法接口
export interface DropdownInstance {
  show: () => void
  hide: () => void
}
