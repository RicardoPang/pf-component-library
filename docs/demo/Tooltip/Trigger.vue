<script setup>
import PfTooltip from '@/components/lib/Tooltip/src/Tooltip.vue'
import PfButton from '@/components/lib/Button/src/Button.vue'
</script>
<template>
  <div class="md-4">
    <pf-tooltip content="hello tooltip" trigger="click">
      <pf-button>点击激活 Tooltip</pf-button>
    </pf-tooltip>
  </div>
</template>
