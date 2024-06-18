<template>
  <el-container>
    <el-aside width="auto">
      <nav-side :collapse="isCollapse" :data="data"></nav-side>
    </el-aside>
    <el-container>
      <el-header>
        <nav-header v-model:collapse="isCollapse"></nav-header>
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, type PropType } from 'vue'
import NavHeader from './NavHeader.vue'
import NavSide from './NavSide.vue'
import type { NavSideProps } from './types'

// 定义组件名
defineOptions({
  name: 'PfContainer'
})

const isCollapse = ref(false)

defineProps({
  data: {
    type: Array as PropType<NavSideProps[]>,
    default: () => []
  }
})
</script>

<style scoped>
.el-header {
  padding: 0;
  border-bottom: 1px solid #eee;
}
.el-main {
  height: 80vh;
  overflow: hidden;
}
</style>
