<script setup>
import PfTooltip from '@/components/lib/Tooltip/src/Tooltip.vue'
import PfButton from '@/components/lib/Button/src/Button.vue'
</script>
<template>
  <div class="md-4">
    <pf-tooltip trigger="click">
      <pf-button> 复杂 HTML 结构的Tooltip </pf-button>
      <template #content>
        <h3>this is the title</h3>
        <p>this is the content</p>
      </template>
    </pf-tooltip>
  </div>
</template>
