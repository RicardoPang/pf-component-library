<script setup>
import { createMessage } from '@/components/lib/Message/src/method'
import PfButton from '@/components/lib/Button/src/Button.vue'
const open1 = () => {
  createMessage({ message: 'This is a message.', showClose: true, duration: 0 })
}
const open2 = () => {
  createMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
    showClose: true,
    duration: 0
  })
}
const open3 = () => {
  createMessage({
    message: 'Warning, this is a warning message.',
    type: 'warning',
    showClose: true,
    duration: 0
  })
}
const open4 = () => {
  createMessage({
    message: 'Oops, this is a error message.',
    type: 'danger',
    showClose: true,
    duration: 0
  })
}
</script>
<template>
  <div class="mb-4">
    <pf-button :plain="true" @click="open2">Success</pf-button>
    <pf-button :plain="true" @click="open3">Warning</pf-button>
    <pf-button :plain="true" @click="open1">Message</pf-button>
    <pf-button :plain="true" @click="open4">Error</pf-button>
  </div>
</template>
