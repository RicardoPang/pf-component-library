<script setup>
import { ref } from 'vue'
import PfSelect from '@/components/lib/Select/src/Select.vue'
const test = ref('')
const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
]
const remoteFilter = (query) => {
  return new Promise((resolve) => {
    if (query) {
      setTimeout(() => {
        const options = states
          .filter((item) => {
            return item.toLowerCase().includes(query.toLowerCase())
          })
          .map((label) => {
            return { label, value: label }
          })
        resolve(options)
      }, 500)
    } else {
      resolve([])
    }
  })
}
</script>
<template>
  <pf-select
    v-model="test"
    placeholder="基础选择器，请选择"
    :options="options"
    clearable
    filterable
    remote
    :remote-method="remoteFilter"
  />
</template>
