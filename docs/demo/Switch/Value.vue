<script setup>
import { ref } from 'vue'
import PfSwitch from '@/components/lib/Switch/src/Switch.vue'
const isOn = ref('right')
</script>
<template>
  <pf-switch v-model="isOn" activeValue="right" inactiveValue="wrong" />
  <h4>model-value: {{ isOn }}</h4>
</template>
