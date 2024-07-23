<script setup>
import PfButton from '@/components/lib/Button/src/Button.vue'
</script>
<template>
  <div class="flex flex-wrap items-center mb-4">
    <pf-button size="large">Large</pf-button>
    <pf-button>Default</pf-button>
    <pf-button size="small">Small</pf-button>
    <pf-button size="large" icon="magnifying-glass">Search</pf-button>
    <pf-button icon="magnifying-glass">Search</pf-button>
    <pf-button size="small" icon="magnifying-glass">Search</pf-button>
  </div>
  <div class="flex flex-wrap items-center mb-4">
    <pf-button size="large" round>Large</pf-button>
    <pf-button round>Default</pf-button>
    <pf-button size="small" round>Small</pf-button>
    <pf-button size="large" icon="magnifying-glass" round>Search</pf-button>
    <pf-button icon="magnifying-glass" round>Search</pf-button>
    <pf-button size="small" icon="magnifying-glass" round>Search</pf-button>
  </div>
  <div class="flex flex-wrap items-center">
    <pf-button icon="magnifying-glass" size="large" circle />
    <pf-button icon="magnifying-glass" circle />
    <pf-button icon="magnifying-glass" size="small" circle />
  </div>
</template>
