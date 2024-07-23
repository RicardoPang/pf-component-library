<script setup>
import { h } from 'vue'
import PfDropdown from '@/components/lib/Dropdown/src/Dropdown.vue'
import PfButton from '@/components/lib/Button/src/Button.vue'
const options = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]
</script>
<template>
  <div class="mb-4">
    <pf-dropdown placement="bottom" :menu-options="options">
      <pf-button type="primary">Hover触发下拉菜单</pf-button>
    </pf-dropdown>
  </div>
</template>
<style>
.vp-doc .vitepress-demo-preview-preview ul,
.vp-doc .vitepress-demo-preview-preview ol {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
