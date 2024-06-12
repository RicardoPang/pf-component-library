<script setup>
import PfButton from '@/lib/Button/src/Button.vue'
</script>
<template>
  <div class="mb-4">
    <pf-button>Default</pf-button>
    <pf-button type="primary">Primary</pf-button>
    <pf-button type="success">Success</pf-button>
    <pf-button type="info">Info</pf-button>
    <pf-button type="warning">Warning</pf-button>
    <pf-button type="danger">Danger</pf-button>
  </div>

  <div class="mb-4">
    <pf-button plain>Plain</pf-button>
    <pf-button type="primary" plain>Primary</pf-button>
    <pf-button type="success" plain>Success</pf-button>
    <pf-button type="info" plain>Info</pf-button>
    <pf-button type="warning" plain>Warning</pf-button>
    <pf-button type="danger" plain>Danger</pf-button>
  </div>

  <div class="mb-4">
    <pf-button round>Round</pf-button>
    <pf-button type="primary" round>Primary</pf-button>
    <pf-button type="success" round>Success</pf-button>
    <pf-button type="info" round>Info</pf-button>
    <pf-button type="warning" round>Warning</pf-button>
    <pf-button type="danger" round>Danger</pf-button>
  </div>

  <div>
    <pf-button icon="magnifying-glass" circle />
    <pf-button type="primary" icon="pen-to-square" circle />
    <pf-button type="success" icon="check" circle />
    <pf-button type="info" icon="envelope" circle />
    <pf-button type="warning" icon="star" circle />
    <pf-button type="danger" icon="trash-can" circle />
  </div>
</template>
