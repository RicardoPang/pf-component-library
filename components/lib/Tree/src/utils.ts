import type { RootNode, TreeNode } from './types'

/**
 * 判断 自己 | 子节点 | 孙节点 是否包含关键字
 * @param {TreeNode} node 当前节点
 * @param {string} keyword 关键字
 * @param {TreeNode[]} list
 * @returns {boolean}
 */
export function isIncludesKeyword(
  node: TreeNode,
  keyword: string,
  list: TreeNode[]
): boolean {
  // 拆分关键字并过滤空值
  const keywords = keyword.split(/[,，]/).filter((v) => v)
  // 判断当前节点是否包含关键字
  const isInclude = keywords.some((keyword) => node.label?.includes(keyword))
  if (isInclude) {
    return true
  }
  // 如果不是叶子节点, 递归检查子节点
  if (!node.isLeaf) {
    // 找到所有直接子节点
    const allDirectChildren = list.filter((i) => i.parentId === node.id)
    // 递归检查子节点是否包含关键字
    return allDirectChildren.some((i) => isIncludesKeyword(i, keyword, list))
  }
  return false
}

/**
 * 判断 自己 | 子节点 | 孙节点 是否选中
 * @param {TreeNode} node 当前节点
 * @param {TreeNode[]} list 所有节点列表
 * @returns  {boolean}
 */
export function isCheckedOrIndeterminate(
  node: TreeNode,
  list: TreeNode[]
): boolean {
  // 检查当前节点是否选中或部分选中
  const isCheck = node.checked || node.indeterminate
  if (isCheck) {
    return true
  }
  // 如果不是叶子节点, 递归检查子节点
  if (!node.isLeaf) {
    // 找到所有直接子节点
    const allDirectChildren = list.filter((i) => i.parentId === node.id)
    // 递归检查子节点是否被选中或部分选中
    return allDirectChildren.some((i) => isCheckedOrIndeterminate(i, list))
  }
  return false
}

/**
 * 找到后端叶子节点数量
 * @param {TreeNode[]} tree 整个树
 * @param {TreeNode} node 当前节点
 * @returns {number}
 */
export function getLeafCount(tree: TreeNode[], node: TreeNode): number {
  const subTree = findSubTree(tree, node.id ?? '') || [] // 找到子树, 不存在则返回空数组
  let count = 0
  depthFirstEach({ tree: subTree }, (node: TreeNode) => {
    if (node.isLeaf) {
      count++ // 计算叶子节点数量
    }
  })
  return count
}

/**
 * 深度优先遍历算法
 * @param {Object} param0 - 包含树的对象
 * @param {TreeNode[]} param0.tree - 要遍历的树
 * @param {(node: TreeNode) => void} cb - 对每个节点执行的回调函数
 */
export function depthFirstEach(
  {
    tree,
    path = [],
    init = false
  }: { tree: TreeNode[]; path?: (string | number)[]; init?: boolean },
  cb: (node: TreeNode) => void | 'break'
): void {
  if (!Array.isArray(tree)) {
    console.warn(
      'The tree in the first argument to function depthFirstEach must be an array'
    )
    return
  }
  if (!tree || tree.length === 0) return
  for (const node of tree) {
    const hasChildren = node.children && node.children.length > 0
    if (init) {
      // 初始化路径path
      node.path = [...path, node.id as string | number]
      // 初始化是否为叶子节点
      node.isLeaf = !hasChildren
    }
    if (cb) {
      const res = cb(node)
      if (res === 'break') return
    }
    if (hasChildren) {
      depthFirstEach(
        { tree: node.children as TreeNode[], path: node.path, init },
        cb
      )
    }
  }
}

/**
 * 将列表转为树形结构
 * @param {TreeNode[]} filterList 过滤后的节点列表
 * @returns {TreeNode[]}  树形结构节点列表
 */
export function listToTree(filterList: TreeNode[]): TreeNode[] {
  if (!Array.isArray(filterList)) {
    console.warn(
      'The parameter filterList to function listToTree must be an array'
    )
    return []
  }
  if (!filterList || filterList.length === 0) return []

  const root: RootNode = {}

  // 定义查找父节点的函数，根据 path
  const parentNode = (root: RootNode, path: (string | number)[]): RootNode => {
    if (!Array.isArray(path)) {
      console.warn('The path should be an array')
      return root
    }
    const _path = path.slice()
    const rootId = _path.shift()
    if (rootId === undefined) {
      return root
    }
    if (!root[rootId]) {
      root[rootId] = { childrenMap: {} } as TreeNode // 确保节点存在并初始化childrenMap
    }
    if (_path.length > 1) {
      if (!root[rootId].childrenMap) {
        root[rootId].childrenMap = {}
      }
      return parentNode(root[rootId].childrenMap as RootNode, _path)
    }
    if (_path.length === 1) {
      if (!root[rootId].childrenMap) {
        root[rootId].childrenMap = {}
      }
      return root[rootId].childrenMap as RootNode
    }
    return root
  }

  // 设置filter后的 children
  const setChildren = (root: RootNode) => {
    const nodes = Object.values(root)
    for (const node of nodes) {
      node.children = Object.values(node.childrenMap as RootNode)
      if (node.children && node.children.length > 0) {
        setChildren(node.childrenMap as RootNode)
      }
    }
  }

  filterList.forEach((node) => {
    node.childrenMap = {}
    if (node.path) {
      parentNode(root, node.path)[node.id as string] = node
    }
  })

  setChildren(root)

  // 初始化路径和叶子结点标识
  depthFirstEach({ tree: Object.values(root), init: true }, () => {})

  return Object.values(root)
}

/**
 * 广度优先遍历算法
 * @param {Object} param0 - 包含树、限制深度和当前深度的对象
 * @param {TreeNode[]} param0.tree - 要遍历的树
 * @param {number} [param0.limitDeep=Number.MAX_SAFE_INTEGER] - 限制遍历的深度
 * @param {number} [param0.deep=0] - 当前深度
 * @param {(node: TreeNode) => void} cb - 对每个节点执行的回调函数
 */
export function breadthFirstEach(
  {
    tree,
    limitDeep = Number.MAX_SAFE_INTEGER,
    deep = 0
  }: { tree: TreeNode[]; limitDeep?: number; deep?: number },
  cb: (node: TreeNode) => void
): void {
  if (!Array.isArray(tree)) {
    console.warn(
      'The tree in the first argument to function breadthFirstEach must be an array'
    )
    return
  }
  if (!tree || tree.length === 0) return

  tree.forEach((node) => {
    if (cb) cb(node)
  })

  const childrenList = tree
    .filter((node) => node.children)
    .map((i) => i.children)
    .flat(1) as TreeNode[]

  if (deep < limitDeep) {
    breadthFirstEach({ tree: childrenList, limitDeep, deep: deep + 1 }, cb)
  }
}

/**
 * 在树中查找子树
 * @param {TreeNode[]} tree 树
 * @param {string} id 节点ID
 * @returns {TreeNode[] | undefined}
 */
export function findSubTree(
  tree: TreeNode[],
  id: string
): TreeNode[] | undefined {
  for (const node of tree) {
    if (node.id === id) {
      // 如果找到匹配节点，返回其子节点
      return node.children || []
    }
    if (node.children) {
      const subTree = findSubTree(node.children, id)
      if (subTree) {
        return subTree
      }
    }
  }
  return undefined
}

/**
 * 广度优先遍历查找节点
 * @param {Array} tree 原始树，数组
 * @param {Number|String} rootId 根节点ID
 * @return {Object} node
 */
export function findNode(
  tree: TreeNode[],
  rootId: number | string
): TreeNode | undefined {
  if (!Array.isArray(tree)) {
    console.warn('The parameter tree to function findNode must be an array')
    return
  }
  if (!tree || tree.length === 0) return
  // 查找根节点
  const item = tree.find((node) => node.id === rootId)
  if (item) return item
  const childrenList = tree
    .filter((node) => node.children)
    .map((i) => i.children)
    .flat(1) as TreeNode[]
  // 递归查找子节点
  return findNode(childrenList, rootId)
}

/**
 * 判断节点是否是亲兄弟
 * @param {TreeNode[]} node1
 * @param {TreeNode[]} node2
 */
export function isBrother(node1: TreeNode, node2: TreeNode): boolean {
  if (!node1 || !node2) return false
  const p1 = String(node1.path?.slice(0, -1))
  const p2 = String(node2.path?.slice(0, -1))
  return p1 === p2
}

// 基本数据类型置 null, 清空内存占用
export const clearAll = function (obj: Record<string, unknown> | null): void {
  if (typeof obj === 'function' || obj === null || typeof obj !== 'object') {
    obj = null
    return
  }
  Object.keys(obj).forEach((key) => {
    clearAll(obj[key] as Record<string, unknown> | null)
    obj[key] = null
  })
}
