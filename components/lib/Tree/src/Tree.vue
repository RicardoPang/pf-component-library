<template>
  <div class="pf-tree">
    <section class="search-bar" v-if="hasInput">
      <slot name="pre-input"></slot>
      <div class="input">
        <pf-input
          icon="magnifying-glass"
          clearable
          :placeholder="placeholder"
          v-model="state.keyword"
          @keyup.enter="init"
          @change="state.debounceInput"
        >
          <template #prefix>
            <pf-icon icon="magnifying-glass" />
          </template>
        </pf-input>
      </div>
      <pf-button type="primary" @click="() => init">搜索</pf-button>
    </section>
    <section
      ref="contentWrapRef"
      class="content-wrap"
      @scroll.passive="handleScroll"
    >
      <!-- 根节点分为tree-phantom和tree-content 绝对定位, 为了在滚动时避免数据的更改回头触发滚动事件 -->
      <div class="tree-phantom" :style="`height: ${phantomHeight}px`"></div>
      <div
        class="tree-content"
        :style="`transform: translateY(${state.startIndex * state.itemHeigth}px)`"
      >
        <template v-for="(item, index) in renderList">
          <section
            v-if="item.path"
            :key="'k' + index"
            :class="[
              'item',
              {
                'is-hidden': item.isHidden,
                'drag-over-above':
                  state.dragOverNode === item && state.dropPosition === 'above',
                'drag-over-below':
                  state.dragOverNode === item && state.dropPosition === 'below',
                'drag-over-inside':
                  state.dragOverNode === item && state.dropPosition === 'inside'
              }
            ]"
            :style="`margin-left: ${(item.path.length - 1) * Number(indent)}px`"
            :draggable="draggable"
            @dragstart="handleDragStart(item, $event)"
            @dragover.prevent="handleDragOver(item, $event)"
            @dragend="handleDragEnd()"
            @drop.prevent="handleDrop($event)"
          >
            <div
              v-if="!item.isLeaf"
              :class="[
                item.isLeaf ? 'leaf-node' : 'expand-node',
                { 'is-expand': item.isExpand }
              ]"
              @click="onExpand(item)"
            >
              <pf-icon icon="angle-right" class="header-angle" />
            </div>
            <pf-tree-node
              v-model="item.checked"
              :indeterminate="item.indeterminate"
              :disabled="item.disabled"
              :isLeaf="item.isLeaf"
              :showCheckboxLeafOnly="showCheckboxLeafOnly"
              :checkedAction="checkedAction"
              :showCheckbox="showCheckbox"
              :checkStriclty="checkStriclty"
              :node="item"
              :class="{ 'is-disabled': item.disabled }"
              @on-checked="onChecked(item)"
              @on-click-label="onClickLabel(item)"
            >
              <div class="label">
                <slot :slot-scope="item">{{ item.label }}</slot>
                <i v-if="!item.isLeaf" class="count">({{ item.leafCount }})</i>
              </div>
              <div v-if="showLine && item.path.length > 2" class="line"></div>
              <div v-if="showLine && item.isLeaf" class="horizontal-line"></div>
            </pf-tree-node>
          </section>
        </template>
      </div>
    </section>
    <section v-if="renderList.length <= 0" class="no-data">
      <p v-if="isLoading || state.isSearching">
        <slot name="loading">loading...</slot>
      </p>
      <p v-else>{{ emptyText }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  watch,
  reactive,
  onUnmounted,
  nextTick
} from 'vue'
import PfInput from '../../Input/src/Input.vue'
import PfIcon from '../../Icon/src/Icon.vue'
import PfButton from '../../Button/src/Button.vue'
import PfTreeNode from './TreeNode.vue'
import type { TreeProps, BigData, TreeNode, TreeEmits } from './types'

import {
  isIncludesKeyword,
  breadthFirstEach,
  clearAll,
  depthFirstEach,
  findNode,
  findSubTree,
  getLeafCount,
  isBrother,
  isCheckedOrIndeterminate,
  listToTree
} from './utils'
import { debounce, throttle } from 'lodash-es'

const ITEMS_TO_ADD = 40
const MIN_START_INDEX = 20
const THROTTLE_DELAY = 80
const DEBOUNCE_DELAY = 300

// 定义一个用于存储树形数据的类, 存储大量数据的结构，包括原始树数据、扁平化的树数据、根据关键词过滤后的数据、选中的节点
class PFBigData {
  _data = [] // 原始树tree数据
  list = [] // 扁平化的tree数据
  filterList = [] // 根据关键词过滤后的list
  listMap = {} // list 对应的 map
  filterTree = [] // 根据关键词过滤后的tree数据
  disabledList = [] // 禁用节点列表
  checkedKeys = [] // 选中的节点ID列表
  checkedNodes = [] // 选中的节点列表
  allCheckedList = [] // 所有选中的节点，用于开启开关 isOnlyInCheckedSearch 时, 仅在选中节点里筛选
}

defineOptions({
  name: 'PfTree'
})

const props = withDefaults(defineProps<TreeProps>(), {
  hasInput: false,
  placeholder: '请输入关键字查找',
  indent: 15,
  expandLevel: 'all',
  expandKeys: () => [],
  isLoading: false,
  checkedAction: 'none',
  emptyText: '暂无数据',
  showCheckbox: false,
  showCheckboxLeafOnly: false,
  defaultCheckedKeys: () => [],
  checkStriclty: false,
  showLine: false,
  draggable: false
})
console.log(props.defaultCheckedKeys)

const emits = defineEmits<TreeEmits>()
const state = reactive({
  count: 1, // 用于视图更新
  keyword: '', // 关键词
  isSearching: false, // 搜索中
  itemHeigth: 30, // 每一项的高度
  startIndex: 0, // 渲染的开始区间
  endIndex: 64, // 渲染的结束区间
  throttleSrcoll: () => {}, // 节流
  debounceInput: () => {},
  isOnlyInCheckedSearch: false, // 是否只在选中的节点里进行筛选
  dragNode: null as TreeNode | null, // 拖拽中的节点
  dragOverNode: null as TreeNode | null, // 拖拽目标节点
  dropPosition: null as 'above' | 'below' | 'inside' | null // 拖拽目标位置
})
const big = ref<BigData | null>(null)
const contentWrapRef = ref<HTMLElement | null>(null)

// 过滤掉隐藏的节点
const unHiddenList = computed(() => {
  return state.count
    ? big.value?.filterList.filter((node) => !node.isHidden)
    : []
})
// 虚拟高度，等于所有可见和不可见节点的总高度。可以在滚动时只渲染当前可见的节点，从而提高性能。
const phantomHeight = computed(() => {
  return (unHiddenList.value?.length ?? 0) * state.itemHeigth
})
// 渲染列表
const renderList = computed(() => {
  return unHiddenList.value?.slice(state.startIndex, state.endIndex) ?? []
})

watch(
  () => props.defaultCheckedKeys,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      setCheckedKeys(newValue)
    }
  }
)
watch(
  () => props.expandKeys,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      setExpand(newValue)
    }
  }
)

// 拖拽事件处理函数
const handleDragStart = (node: TreeNode, event: DragEvent) => {
  state.dragNode = node
  event.dataTransfer?.setData('text/plain', node.id ?? '')
}

const handleDragOver = (node: TreeNode, event: DragEvent) => {
  const { clientY } = event
  const targetRect = (event.target as HTMLElement).getBoundingClientRect()
  const targetHeight = targetRect.height
  const targetTop = targetRect.top
  const targetBottom = targetRect.bottom
  if (clientY < targetTop + targetHeight / 3) {
    state.dropPosition = 'above'
  } else if (clientY > targetBottom - targetHeight / 3) {
    state.dropPosition = 'below'
  } else {
    state.dropPosition = 'inside'
  }
  state.dragOverNode = node
}

const handleDragEnd = () => {
  state.dragNode = null
  state.dragOverNode = null
  state.dropPosition = null
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  if (
    state.dragNode &&
    state.dragOverNode &&
    state.dragNode !== state.dragOverNode
  ) {
    // 执行节点移动逻辑
    moveNode(state.dragNode, state.dragOverNode, state.dropPosition)
    state.dragNode = null
    state.dragOverNode = null
    state.dropPosition = null
  }
}

// 节点移动逻辑
const moveNode = (
  dragNode: TreeNode,
  dropNode: TreeNode,
  position: 'above' | 'below' | 'inside' | null
) => {
  // 从原父节点中移除
  const parentNode = findNode(
    big.value?.filterTree ?? [],
    dragNode.parentId ?? ''
  )
  if (parentNode?.children) {
    parentNode.children = parentNode.children.filter(
      (child) => child.id !== dragNode.id
    )
  }

  if (position === 'inside') {
    // 添加到目标节点的子节点中
    if (!dropNode.children) {
      dropNode.children = []
    }
    dropNode.children.push(dragNode)
    dragNode.parentId = dropNode.id
  } else {
    // 添加到目标节点的兄弟节点中
    const dropParentNode = findNode(
      big.value?.filterTree ?? [],
      dropNode.parentId ?? ''
    )
    if (dropParentNode?.children) {
      const dropIndex = dropParentNode.children.findIndex(
        (child) => child.id === dropNode.id
      )
      if (position === 'above') {
        dropParentNode.children.splice(dropIndex, 0, dragNode)
      } else if (position === 'below') {
        dropParentNode.children.splice(dropIndex + 1, 0, dragNode)
      }
      dragNode.parentId = dropNode.parentId
    }
  }

  // 更新树形结构
  init('init', true)
}

// 设置tree数据
const setData = (data: TreeNode[]) => {
  clear()
  if (big.value) {
    big.value._data = data
  }
  init('init')
}

// 初始化 init restore showCheckedOnly
const init = (op?: string, isMoveNode?: boolean) => {
  if (!big.value || big.value._data.length === 0) return

  if (op === 'init' && big.value) {
    // 清空之前的数据, 防止重复
    big.value.list = []
    big.value.listMap = {}
    big.value.filterList = []

    flatTree(big.value._data)
    big.value.list.forEach((node) => {
      big.value!.listMap[node.id!] = node
    })
  }

  initFilter(op)

  if (op === 'init' || op === 'restore') {
    if (!isMoveNode) {
      initExpand()
    }
    if (big.value?.checkedKeys) {
      setCheckedKeys(big.value?.checkedKeys)
    }
    backToTop()
  }
}

// 拉平树
const flatTree = (data: TreeNode[]) => {
  depthFirstEach({ tree: data, init: true }, (node) => {
    big.value?.list.push(node)
  })
}

// 筛选节点
const initFilter = (op?: string) => {
  setFilterList(op)
  setCount()
  if (big.value && big.value.filterList) {
    // 过滤后的tree, 同时将children挂载到filterList
    big.value.filterTree = listToTree(big.value?.filterList)
    breadthFirstEach({ tree: big.value?.filterTree }, (node) => {
      if (!node.isLeaf) {
        node.leafCount = getLeafCount(big.value!.filterTree, node)
      }
    })
    big.value.disabledList = big.value.filterList.filter(
      (node) => node.disabled
    )
  }
}

// 设置setFilterList
const setFilterList = (op?: string) => {
  if (op === 'showCheckedOnly') {
    if (big.value) {
      big.value.filterList = big.value.list.filter((node) => {
        const is = isCheckedOrIndeterminate(node, big.value?.list ?? [])
        if (is) {
          node.checked = true
          node.indeterminate = false
        }
        return is
      })
    }
    return
  }
  if (
    state.isOnlyInCheckedSearch &&
    big.value &&
    big.value.allCheckedList.length > 0
  ) {
    if (state.keyword.trim() === '') {
      big.value.filterList = big.value?.allCheckedList
      return
    }
    big.value.filterList = big.value?.allCheckedList.filter((node) => {
      return isIncludesKeyword(
        node,
        state.keyword,
        big.value?.allCheckedList ?? []
      )
    })
    return
  }
  if (big.value && state.keyword.trim() === '') {
    big.value.filterList = big.value?.list
    return
  }
  // 根据关键词筛选
  if (big.value) {
    big.value.filterList = big.value?.list.filter((node) => {
      return isIncludesKeyword(node, state.keyword, big.value?.list ?? [])
    })
  }
}

// 回到顶部
const backToTop = () => {
  nextTick(() => {
    contentWrapRef.value!.scrollTop = 0
    setRenderRange()
  })
}

// 初始化处理展开逻辑
const initExpand = () => {
  if (!big.value || big.value._data.length === 0) return
  if (props.expandKeys.length > 0) {
    setExpand(props.expandKeys)
    return
  }
  if (/^\d+$/.test(String(props.expandLevel))) {
    big.value.filterList.forEach((node) => {
      if (node.path) {
        node.isExpand = Boolean(
          node.path.length ?? 0 < Number(props.expandLevel)
        )
        node.isHidden = Boolean(
          node.path.length ?? 0 > Number(props.expandLevel)
        )
        initNode(node)
      }
    })
  } else {
    // 展开全部
    big.value.filterList.forEach((node) => {
      node.isExpand = true
      node.isHidden = false
      initNode(node)
    })
  }
  setCount()
}

// 设置复选框选中状态
const setCheckedKeys = (keys: string[] = []) => {
  if (!Array.isArray(keys)) {
    console.warn('The argument to function setCheckedKeys must be an array')
    return
  }
  clearChecked()
  const nodes = keys.map((id) => big.value?.listMap[id])
  nodes.forEach((node, index) => {
    if (node && node.isLeaf) {
      node.checked = true
      if (!isBrother(node, nodes[index + 1])) handleCheckedChange(node)
    }
  })
  emitChecked()
}

// 清空复选框所有选中
const clearChecked = () => {
  big.value?.list.forEach((node) => {
    node.checked = false
    node.indeterminate = false
  })
}

// 处理选中逻辑
const handleCheckedChange = (node: TreeNode) => {
  // 父子不互相关联
  if (props.checkStriclty) {
    node.indeterminate = node.isLeaf ? false : node.checked
    return
  }
  if (node.checked) node.indeterminate = false
  doChildrenChecked(node)
  doParentChecked(node.parentId ?? '')
  big.value?.disabledList.forEach((node, index) => {
    if (!isBrother(node, big.value?.disabledList[index + 1] ?? {}))
      doParentChecked(node.parentId ?? '')
  })
}

// 处理子孙后代
const doChildrenChecked = (node: TreeNode) => {
  if (!node.children) return
  const checked = node.checked
  depthFirstEach({ tree: node.children }, (node) => {
    if (node.isLeaf && node.disabled) return
    node.indeterminate = false
    node.checked = checked
  })
}

// 处理自己及祖先
const doParentChecked = (parentId: string) => {
  if (parentId === null || parentId === undefined) return
  const allDirectChildren = findSubTree(big.value?.filterTree ?? [], parentId)
  const parentNode = findNode(big.value?.filterTree ?? [], parentId)
  const childrenAllChecked = allDirectChildren?.every((i) => i.checked)
  if (!parentNode) return
  checkParentIndeterminate(parentNode, allDirectChildren ?? [])
  parentNode.checked = childrenAllChecked
  if (childrenAllChecked) parentNode.indeterminate = false
  if (parentNode?.parentId !== null) doParentChecked(parentNode?.parentId ?? '')
}

// 子元素部分选中, 核对祖先是否部分选中
const checkParentIndeterminate = (
  parentNode: TreeNode,
  directChildren: TreeNode[]
) => {
  const hasChecked = directChildren.some((node) => node.checked)
  const hasUnchecked = directChildren.some((node) => !node.checked)
  const partOfChecked = hasChecked && hasUnchecked
  const childrenHasIndeterminate = directChildren.some(
    (node) => node.indeterminate
  )
  const isIndeterminate = partOfChecked || childrenHasIndeterminate
  parentNode.indeterminate = !!isIndeterminate
  directChildren.forEach((node) => {
    if (node.checked) {
      node.indeterminate = false
    }
  })
}

// 发送给父组件选中信息
const emitChecked = () => {
  if (big.value) {
    big.value.checkedNodes = big.value.list.filter(
      (node) => node.checked || node.indeterminate
    )
    big.value.checkedKeys = big.value.checkedNodes.map((node) => node.id ?? '')
    emits('on-change', big.value.checkedKeys, big.value.checkedNodes)
    setCount()
  }
}

// 设置展开
const setExpand = (keys: string[]) => {
  if (keys.length <= 0) return
  if (!big.value || big.value._data.length === 0) return
  const nodes = keys.map((id) => big.value?.listMap[id]).filter((v) => v)
  const ids = Array.from(new Set(nodes.map((node) => node.path).flat(1)))
  big.value.filterList.forEach((node) => {
    if (node.isLeaf) {
      node.isExpand = false
      node.isHidden = Boolean(!ids.includes(node.parentId))
    } else {
      node.isExpand = Boolean(ids.includes(node.id))
      node.isHidden = false
    }
    initNode(node)
  })
  setCount()
}

// 初始化节点所需要的字段
const initNode = (node: TreeNode) => {
  node.checked = node.checked ?? false
  node.indeterminate = node.indeterminate ?? false
  node.disabled = node.disabled ?? false
}

// 根据count触发computed
const setCount = () => {
  state.count = state.count + 1
}

// 设置可见区间: 公共滚动条的位置计算应该取哪些数据
const setRenderRange = () => {
  if (contentWrapRef.value) {
    const visibleCount =
      Math.ceil(contentWrapRef.value.offsetHeight / state.itemHeigth) +
      ITEMS_TO_ADD // 取得可见区域的可见列表项数量
    const startIndex = Math.floor(
      contentWrapRef.value.scrollTop / state.itemHeigth
    ) // 取得可见区域起始数据索引
    state.startIndex =
      startIndex > MIN_START_INDEX ? startIndex - MIN_START_INDEX : 0
    state.endIndex = state.startIndex + visibleCount * 2 // 取得可见区域结束数据数据索引

    setCount()
  }
}

// 监听滚动
const handleScroll = () => {
  state.throttleSrcoll()
}

// 点击展开与收起
const onExpand = (node: TreeNode) => {
  node.isExpand = !node.isExpand
  showOrHiddenChildren(node, !node.isExpand)
}

// 隐藏:子孙后代都要隐藏 展开:仅儿子展开
const showOrHiddenChildren = (node: TreeNode, isHidden?: boolean) => {
  if (node.isLeaf) return
  if (isHidden) {
    depthFirstEach({ tree: node.children ?? [] }, (node) => {
      node.isHidden = isHidden
      node.isExpand = false
    })
  } else {
    node.children?.forEach((child) => {
      child.isHidden = isHidden
      child.isExpand = false
    })
  }
  setCount()
}

// 点击checkbox
const onChecked = (node: TreeNode) => {
  handleCheckedChange(node)
  emitChecked()
  emits('on-click-checkbox', node)
}

// 点击label
const onClickLabel = (node: TreeNode) => {
  emits('on-click-label', node)
}

// 清空数据
const clear = () => {
  state.count = 1
  state.keyword = '' // 关键词
  state.isSearching = false // 是否正在搜索
  state.startIndex = 0 // 渲染的开始区间
  state.endIndex = 64 // 渲染的结束区间
  state.isOnlyInCheckedSearch = false
  if (big.value?.list) {
    clearAll(big.value.list as unknown as Record<string, unknown>)
  }
  if (big.value) {
    big.value._data = [] // 数据tree
    big.value.list = [] // 扁平化tree
    big.value.filterList = [] // 根据关键词筛选后的tree
    big.value.listMap = {} // filterList对应的map
    big.value.filterTree = [] // 根据关键词筛选后的tree
    big.value.disabledList = [] // 禁用的tree
    big.value.checkedKeys = [] // 选中的ids
    big.value.checkedNodes = [] // 选中的nodes
  }
}

// 展示选中项
const showCheckedOnly = (isOnlyChecked = true) => {
  state.keyword = ''
  init('showCheckedOnly')
  state.isOnlyInCheckedSearch = isOnlyChecked
  if (big.value) {
    if (isOnlyChecked) {
      big.value.allCheckedList = big.value.checkedNodes.slice()
    } else {
      big.value.allCheckedList = []
    }
  }
}

const restore = () => {
  state.isOnlyInCheckedSearch = false
  if (big.value) {
    big.value.allCheckedList = []
  }
  init('restore')
}

onMounted(() => {
  big.value = new PFBigData()
  big.value.checkedKeys = JSON.parse(JSON.stringify(props.defaultCheckedKeys))
  state.throttleSrcoll = throttle(setRenderRange, THROTTLE_DELAY)
  state.debounceInput = debounce(init, DEBOUNCE_DELAY)
})

onUnmounted(() => {
  clear()
})

defineExpose({
  ref: contentWrapRef,
  setData,
  clear,
  showCheckedOnly,
  restore
})
</script>
