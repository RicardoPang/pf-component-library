<template>
  <div class="header">
    <span @click="toggle">
      <el-icon-expand v-if="collapse"></el-icon-expand>
      <el-icon-fold v-else></el-icon-fold>
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { NavHeaderEmits } from './types'

let props = defineProps<{
  collapse: boolean
}>()
let emits = defineEmits<NavHeaderEmits>()
let toggle = () => {
  // 需要修改父组件的数据
  emits('update:collapse', !props.collapse)
}
</script>

<style scoped>
.header {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
svg {
  width: 1em;
  height: 1em;
}
</style>
