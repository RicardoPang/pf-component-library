<script setup>
import PfButton from '@/components/lib/Button/src/Button.vue'
</script>
<template>
  <div class="mb-4">
    <pf-button disabled>Default</pf-button>
    <pf-button type="primary" disabled>Primary</pf-button>
    <pf-button type="success" disabled>Success</pf-button>
    <pf-button type="info" disabled>Info</pf-button>
    <pf-button type="warning" disabled>Warning</pf-button>
    <pf-button type="danger" disabled>Danger</pf-button>
  </div>

  <div>
    <pf-button plain disabled>Plain</pf-button>
    <pf-button type="primary" plain disabled>Primary</pf-button>
    <pf-button type="success" plain disabled>Success</pf-button>
    <pf-button type="info" plain disabled>Info</pf-button>
    <pf-button type="warning" plain disabled>Warning</pf-button>
    <pf-button type="danger" plain disabled>Danger</pf-button>
  </div>
</template>
