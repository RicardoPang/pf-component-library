<template>
  <div :class="computedClass" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="filteredProps" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { omit } from 'lodash-es'
import type { IconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 设置组件选项, 名称和不继续属性, 使用$attrs给外层组件赋值
defineOptions({
  name: 'PfIcon',
  inheritAttrs: false
})

// 组件属性
const props = defineProps<IconProps>()

// 过滤 type 和 color 后的属性, 随props改变而更新
const filteredProps = computed(() => omit(props, ['type', 'color']))

// 自定义样式
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})

// 计算类名, 存在type添加对应类型类名
const computedClass = computed(() => {
  return ['pf-icon', props.type && `pf-icon--${props.type}`]
})
</script>
