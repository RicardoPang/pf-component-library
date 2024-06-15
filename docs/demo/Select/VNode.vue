<script setup>
import { ref, h } from 'vue'
import PfSelect from '@/components/lib/Select/src/Select.vue'
const test = ref('')
const customRender = (option) => {
  return h('div', { className: 'xyz' }, [
    h('b', option.label),
    h('span', option.value)
  ])
}
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
    :customRender="customRender"
  />
</template>

<style local>
.pf-select__menu-item,
.xyz {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
