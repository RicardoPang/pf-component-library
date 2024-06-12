<script setup>
import { ref } from 'vue'
import PfTooltip from '@/components/lib/Tooltip/src/Tooltip.vue'
import PfButton from '@/components/lib/Button/src/Button.vue'
const tooltipRef = ref()
const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}
</script>
<template>
  <div class="md-4">
    <pf-tooltip content="hello tooltip" ref="tooltipRef" manual>
      <pf-button> 手动容器 </pf-button>
    </pf-tooltip>

    <br /><br />
    <pf-button type="primary" @click="open"> 点击手动触发显示 </pf-button>
    <pf-button type="danger" @click="close"> 点击手动触发隐藏 </pf-button>
  </div>
</template>
