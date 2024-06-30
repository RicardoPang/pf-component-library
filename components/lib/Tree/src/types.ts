export type TreeValueType = boolean | string | number

// 定义树形节点的接口
export interface TreeNode {
  id?: string // 节点的唯一标识符，可选
  isLeaf?: boolean // 标识是否为叶子节点
  children?: TreeNode[] // 子节点数组，可选
  parentId?: string | null // 父节点的ID，可选，如果为顶级节点则可能为null
  path?: (string | number)[] // 节点到根节点的路径数组，可选
  checked?: boolean // 节点是否被选中，可选
  indeterminate?: boolean // 节点是否处于不确定状态（即部分子节点被选中），可选
  disabled?: boolean // 节点是否被禁用，可选
  label?: string // 节点的显示标签，可选
  isHidden?: boolean // 节点是否被隐藏，可选
  isExpand?: boolean // 节点是否被展开，可选
  leafCount?: number // 节点的叶子节点数量，可选
  childrenMap?: { [key: string]: TreeNode } // 子节点映射
}

// 定义传递给树形节点的属性接口
export interface TreeNodeProps {
  modelValue: TreeValueType
  checked?: boolean // 节点是否被选中
  indeterminate?: boolean // 节点是否处于不确定状态
  disabled?: boolean // 节点是否被禁用
  checkedAction?: string // 选中节点时的动作类型
  showCheckbox?: boolean // 是否显示复选框
  isLeaf?: boolean // 标识是否为叶子节点
  showCheckboxLeafOnly?: boolean // 是否仅在叶子节点显示复选框
  node?: TreeNode // 当前节点的数据
  checkStriclty?: boolean // 是否严格按照层级关系进行选中操作
  draggable?: boolean // 是否可拖拽
}

export interface TreeNodeEmits {
  (e: 'update:modelValue', value: TreeValueType): void
  (e: 'checked-change', value: TreeValueType): void
  (e: 'on-checked'): void
  (e: 'on-click-label'): void
}

export interface TreeProps {
  hasInput?: boolean // 是否含有过滤输入框
  indent?: string | number // 缩进
  expandKeys?: string[] // 指定 id 展开
  expandLevel?: string | number // 展开程度
  placeholder?: string // 过滤输入框的 placeholder
  isLoading?: boolean // 是否正在加载
  checkedAction?: string // 选中节点时的动作类型
  emptyText?: string // 内容为空展示的文本
  showCheckbox?: boolean // 是否展示 checkbox
  showCheckboxLeafOnly?: boolean // 是否仅叶子节点展示 checkbox
  defaultCheckedKeys?: string[] // 默认选中
  checkStriclty?: boolean // 是否严格的遵循父子不互相关联的做法
  showLine?: boolean // 是否显示连线
  draggable?: boolean // 是否可拖拽
}

export interface TreeEmits {
  (e: 'on-change', checkedKeys: string[], checkedNodes: TreeNode[]): void
  (e: 'on-click-checkbox', checkedNode: TreeNode): void
  (e: 'on-click-label', checkedNodes: TreeNode): void
}

export interface BigData {
  // 海量数据 tree
  _data: TreeNode[]
  // 扁平化的tree
  list: TreeNode[]
  // 根据关键词过滤后的list
  filterList: TreeNode[]
  // this.big.filterList 对应的 map
  listMap: { [key: string]: any }
  // 根据关键词过滤后的tree
  filterTree: TreeNode[]
  // disabled 为true组成的数组
  disabledList: TreeNode[]
  // 选中的 ids
  checkedKeys: string[]
  // 选中的 nodes
  checkedNodes: TreeNode[]
  // 所有选中的节点， 用于开启开关 isOnlyInCheckedSearch 时， 仅在选中节点里筛选
  allCheckedList: TreeNode[]
}

export interface TreeInstance {
  ref: HTMLElement
  setData: (data: TreeNode[]) => void
  clear: () => void
  showCheckedOnly: () => void
  restore: () => void
}

export interface RootNode {
  [key: string]: TreeNode
}
