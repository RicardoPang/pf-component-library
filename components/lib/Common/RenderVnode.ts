import { defineComponent } from 'vue'

/**
 * RenderVnode 组件
 *
 * @description
 * 这个组件接收一个 `vNode` 属性，并直接渲染它。
 */
const RenderVnode = defineComponent({
  props: {
    /**
     * 要渲染的虚拟节点
     * @type {string | object}
     */
    vNode: {
      type: [String, Object],
      required: true
    }
  },
  setup(props) {
    // 返回渲染函数，直接返回传入的 vNode
    return () => props.vNode
  }
})

export default RenderVnode
