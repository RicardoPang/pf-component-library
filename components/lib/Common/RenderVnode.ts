import { defineComponent } from 'vue'

const RenderVnode = defineComponent({
  props: {
    // 字符串或对象的属性
    vNode: {
      type: [String, Object],
      required: true
    }
  },
  setup(props) {
    // 返回渲染函数
    return () => props.vNode
  }
})

export default RenderVnode
