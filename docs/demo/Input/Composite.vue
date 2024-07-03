<script setup>
import { ref } from 'vue'
import PfInput from '@/components/lib/Input/src/Input.vue'
import PfIcon from '@/components/lib/Icon/src/Icon.vue'
const text = ref('')
</script>
<template>
  <pf-input v-model="text" placeholder="基础文本框，请输入">
    <template #prepend>https://</template>
    <template #append>.com</template>
  </pf-input>
  <br />
  <br />
  <pf-input v-model="text" placeholder="基础文本框，请输入">
    <template #prefix>
      <pf-icon icon="fa-user" />
    </template>
    <template #suffix>
      <pf-icon icon="fa-user" />
    </template>
  </pf-input>
  <span>{{ text }}</span>
</template>
