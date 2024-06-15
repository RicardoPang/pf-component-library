<script setup>
import { ref } from 'vue'
import PfSwitch from '@/components/lib/Switch/src/Switch.vue'
const isOn = ref(false)
</script>
<template>
  <pf-switch v-model="isOn" />
  <pf-switch v-model="isOn" disabled />
</template>
