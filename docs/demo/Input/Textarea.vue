<script setup>
import { ref } from 'vue'
import PfInput from '@/components/lib/Input/src/Input.vue'
const text = ref('')
</script>
<template>
  <pf-input v-model="text" placeholder="基础文本框，请输入" type="textarea" />
  <span>{{ text }}</span>
</template>
