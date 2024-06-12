import { onMounted, onUnmounted, type Ref } from 'vue'

const useClickOutside = (
  elementRef: Ref<HTMLElement | undefined>,
  callback: (e: MouseEvent) => void
) => {
  // 定义点击事件处理函数
  const handler = (e: MouseEvent) => {
    if (elementRef.value && e.target) {
      const target = e.target as HTMLElement
      // 检查点击模板是否在引用的元素之外
      if (!elementRef.value.contains(target)) {
        callback(e)
      }
    }
  }
  // 组件挂载时添加事件监听
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  // 组件卸载时移除事件监听
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}

export default useClickOutside
