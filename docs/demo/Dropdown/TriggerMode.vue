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
    <pf-dropdown placement="bottom" :menu-options="options" trigger="click">
      <pf-button type="primary">点击触发下拉菜单</pf-button>
    </pf-dropdown>
  </div>
</template>
