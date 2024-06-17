<template>
  <el-menu
    class="pf-menu-vertical-demo"
    :default-active="defaultActive"
    :router="router"
    v-bind="$attrs"
  >
    <template v-for="(item, i) in data" :key="i">
      <el-menu-item
        v-if="!item[children] || !item[children].length"
        :index="item[index]"
      >
        <pf-icon v-if="item[icon]" :icon="item[icon]"></pf-icon>
        <span class="pf-menu-title">{{ item[name] }}</span>
      </el-menu-item>
      <el-sub-menu
        v-if="item[children] && item[children].length"
        :index="item[index]"
      >
        <template #title>
          <pf-icon v-if="item[icon]" :icon="item[icon]"></pf-icon>
          <span class="pf-menu-title">{{ item[name] }}</span>
        </template>
        <el-menu-item
          v-for="(item1, index1) in item[children]"
          :key="index1"
          :index="item1.index"
        >
          <pf-icon v-if="item1[icon]" :icon="item1[icon]"></pf-icon>
          <span class="pf-menu-title">{{ item1[name] }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import PfIcon from '../../Icon/src/Icon.vue'
import type { MenuProps } from './types'

defineOptions({
  name: 'PfMenu'
})

withDefaults(defineProps<MenuProps>(), {
  router: false,
  name: 'name',
  index: 'index',
  icon: 'icon',
  children: 'children'
})
</script>
