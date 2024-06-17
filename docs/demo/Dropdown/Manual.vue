<script setup>
import { h, ref } from 'vue'
import PfDropdown from '@/components/lib/Dropdown/src/Dropdown.vue'
import PfButton from '@/components/lib/Button/src/Button.vue'
const options = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]
const tooltipRef = ref()
const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}
</script>
<template>
  <div class="mb-4">
    <pf-dropdown
      placement="bottom"
      :menu-options="options"
      trigger="click"
      manual
      ref="tooltipRef"
    >
      <pf-button>菜单</pf-button>
    </pf-dropdown>
    <br />
    <br />
    <pf-button type="primary" @click="open">点击手动触发显示</pf-button>
    <pf-button type="danger" @click="close">点击手动触发隐藏</pf-button>
  </div>
</template>
<style>
.vp-doc .vitepress-demo-preview-preview ul,
.vp-doc .vitepress-demo-preview-preview ol {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.pf-dropdown {
  margin-right: 10px;
}
</style>
