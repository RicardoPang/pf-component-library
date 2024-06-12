<script setup>
import PfIcon from '@/components/lib/Icon/src/Icon.vue'
</script>
<template>
  <div class="mb-4">
    <pf-icon icon="arrow-up" />
    <pf-icon icon="pen-to-square" size="xl" />
    <pf-icon icon="share-nodes" type="primary" />
    <pf-icon icon="trash-can" color="#0e7a0d" />
    <pf-icon icon="magnifying-glass" size="xl" type="success" rotation="90" />
    <pf-icon
      icon="arrow-up-from-bracket"
      size="2x"
      type="danger"
      title="Upload"
    />
    <pf-icon icon="fa-spinner" spin />
  </div>
</template>
<style scoped>
.pf-icon {
  margin-right: 15px;
}
</style>
