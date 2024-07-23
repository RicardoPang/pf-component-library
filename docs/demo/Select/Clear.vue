<script setup>
import { ref } from 'vue'
import PfSelect from '@/components/lib/Select/src/Select.vue'
const test = ref('')
const options = [
  { label: 'hello', value: '1' },
  { label: 'xyz', value: '2' },
  { label: 'testing', value: '3' },
  { label: 'check', value: '4', disabled: true }
]
</script>
<template>
  <pf-select
    v-model="test"
    placeholder="基础选择器，请选择"
    :options="options"
    clearable
  />
</template>
