/**
 * 通用响应接口。
 * @template T - 响应数据的类型。
 */
export interface Response<T> {
  /** 响应代码。 */
  code: number

  /** 响应数据。 */
  data: T

  /** 响应消息，可选。 */
  message?: string
}

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
  checked?: boolean

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
 * 定义树形返回数据的接口。
 * @typedef {Response<{ tree: TreeNode[] }>} GetTreeControllerResponse
 */
export type GetTreeControllerResponse = Response<{
  /** 树形节点数组。 */
  tree: TreeNode[]
}>

/**
 * 定义虚拟滚动数据的接口。
 */
export interface VScroll {
  /** 唯一标识符。 */
  id: string | number

  /** 名称。 */
  name: string

  /** 图片 URL。 */
  picture_url: string

  /** 价格。 */
  price: number

  /** 星级评分。 */
  star_rating: number

  /** 评论数量。 */
  reviews_count: number
}

/**
 * 定义虚拟滚动返回数据的接口。
 * @typedef {Response<{ list: VScroll[] }>} GetVScrollControllerResponse
 */
export type GetVScrollControllerResponse = Response<{
  /** 虚拟滚动数据列表。 */
  list: VScroll[]
}>
