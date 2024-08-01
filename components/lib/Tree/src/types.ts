export type TreeValueType = boolean | string | number

/**
 * 表示树形节点的接口。
 */
export interface TreeNode {
  /** 节点的唯一标识符。 */
  id?: string

  /** 标识是否为叶子节点。 */
  isLeaf?: boolean

  /** 子节点数组。 */
  children?: TreeNode[]

  /** 父节点的ID。顶级节点的父节点ID可能为null。 */
  parentId?: string | null

  /** 节点到根节点的路径数组。 */
  path?: (string | number)[]

  /** 节点是否被选中。 */
  checked: boolean

  /** 节点是否处于不确定状态（即部分子节点被选中）。 */
  indeterminate?: boolean

  /** 节点是否被禁用。 */
  disabled?: boolean

  /** 节点的显示标签。 */
  label?: string

  /** 节点是否被隐藏。 */
  isHidden?: boolean

  /** 节点是否被展开。 */
  isExpand?: boolean

  /** 节点的叶子节点数量。 */
  leafCount?: number

  /** 子节点映射，以子节点ID为键。 */
  childrenMap?: { [key: string]: TreeNode }
}

/**
 * 定义传递给树形节点的属性接口。
 */
export interface TreeNodeProps {
  /** 节点的值。 */
  modelValue: TreeValueType

  /** 节点是否被选中。 */
  checked?: boolean

  /** 节点是否处于不确定状态。 */
  indeterminate?: boolean

  /** 节点是否被禁用。 */
  disabled?: boolean

  /** 选中节点时的动作类型。 */
  checkedAction?: string

  /** 是否显示复选框。 */
  showCheckbox?: boolean

  /** 标识是否为叶子节点。 */
  isLeaf?: boolean

  /** 是否仅在叶子节点显示复选框。 */
  showCheckboxLeafOnly?: boolean

  /** 当前节点的数据。 */
  node?: TreeNode

  /** 是否严格按照层级关系进行选中操作。 */
  checkStriclty?: boolean

  /** 是否可拖拽。 */
  draggable?: boolean
}

/**
 * 定义树形节点的事件接口。
 */
export interface TreeNodeEmits {
  /**
   * 更新节点值事件。
   * @param e - 事件名称。
   * @param value - 节点值。
   */
  (e: 'update:modelValue', value: TreeValueType): void

  /**
   * 节点选中状态改变事件。
   * @param e - 事件名称。
   * @param value - 节点值。
   */
  (e: 'checked-change', value: TreeValueType): void

  /**
   * 节点被选中事件。
   * @param e - 事件名称。
   */
  (e: 'on-checked'): void

  /**
   * 标签被点击事件。
   * @param e - 事件名称。
   */
  (e: 'on-click-label'): void
}

/**
 * 定义树形组件的属性接口。
 */
export interface TreeProps {
  /** 是否含有过滤输入框。 */
  hasInput?: boolean

  /** 缩进。 */
  indent?: string | number

  /** 指定 id 展开。 */
  expandKeys?: string[]

  /** 展开程度。 */
  expandLevel?: string | number

  /** 过滤输入框的 placeholder。 */
  placeholder?: string

  /** 是否正在加载。 */
  isLoading?: boolean

  /** 选中节点时的动作类型。 */
  checkedAction?: string

  /** 内容为空时展示的文本。 */
  emptyText?: string

  /** 是否展示 checkbox。 */
  showCheckbox?: boolean

  /** 是否仅叶子节点展示 checkbox。 */
  showCheckboxLeafOnly?: boolean

  /** 默认选中的节点 ID 列表。 */
  defaultCheckedKeys?: string[]

  /** 是否严格的遵循父子不互相关联的做法。 */
  checkStriclty?: boolean

  /** 是否显示连线。 */
  showLine?: boolean

  /** 是否可拖拽。 */
  draggable?: boolean
}

/**
 * 定义树形组件的事件接口。
 */
export interface TreeEmits {
  /**
   * 节点状态改变事件。
   * @param e - 事件名称。
   * @param checkedKeys - 选中的节点 ID 列表。
   * @param checkedNodes - 选中的节点对象列表。
   */
  (e: 'on-change', checkedKeys: string[], checkedNodes: TreeNode[]): void

  /**
   * 复选框被点击事件。
   * @param e - 事件名称。
   * @param checkedNode - 被点击的节点对象。
   */
  (e: 'on-click-checkbox', checkedNode: TreeNode): void

  /**
   * 标签被点击事件。
   * @param e - 事件名称。
   * @param checkedNodes - 被点击的节点对象。
   */
  (e: 'on-click-label', checkedNodes: TreeNode): void
}

/**
 * 定义海量数据的接口。
 */
export interface BigData {
  /** 海量数据的树形结构。 */
  _data: TreeNode[]

  /** 扁平化的树形结构。 */
  list: TreeNode[]

  /** 根据关键词过滤后的列表。 */
  filterList: TreeNode[]

  /** `filterList` 对应的映射。 */
  listMap: { [key: string]: any }

  /** 根据关键词过滤后的树形结构。 */
  filterTree: TreeNode[]

  /** 被禁用的节点列表。 */
  disabledList: TreeNode[]

  /** 选中的节点 ID 列表。 */
  checkedKeys: string[]

  /** 选中的节点对象列表。 */
  checkedNodes: TreeNode[]

  /** 所有选中的节点，用于开启 `isOnlyInCheckedSearch` 时，仅在选中节点里筛选。 */
  allCheckedList: TreeNode[]
}

/**
 * 定义树形组件实例接口。
 */
export interface TreeInstance {
  /** 组件的引用。 */
  ref: HTMLElement

  /**
   * 设置树形数据。
   * @param data - 树形数据。
   */
  setData: (data: TreeNode[]) => void

  /** 清除所有数据。 */
  clear: () => void

  /** 仅显示选中的节点。 */
  showCheckedOnly: () => void

  /** 恢复所有数据。 */
  restore: () => void
}

/**
 * 定义根节点接口。
 */
export interface RootNode {
  [key: string]: TreeNode
}
