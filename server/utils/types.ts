export interface Response<T> {
  code: number
  data: T
  message?: string
}

// 定义树形节点的接口
export interface TreeNode {
  id: string // 节点的唯一标识符，可选
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

// 定义树形返回数据的接口
export type GetTreeControllerResponse = Response<{
  tree: TreeNode[]
}>

// 定义虚拟滚动数据
export interface VScroll {
  id: string | number
  name: string
  picture_url: string
  price: number
  star_rating: number
  reviews_count: number
}

// 定义虚拟滚动返回数据的接口
export type GetVScrollControllerResponse = Response<{
  list: VScroll[]
}>
