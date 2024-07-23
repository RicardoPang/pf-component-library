<script setup>
import { createMessage } from '@/components/lib/Message/src/method'
import PfButton from '@/components/lib/Button/src/Button.vue'
const open1 = () => {
  createMessage({ message: 'This is a message.' })
}
const open2 = () => {
  createMessage({
    message: 'Congrats, this is a success message.',
    type: 'success'
  })
}
const open3 = () => {
  createMessage({
    message: 'Warning, this is a warning message.',
    type: 'warning'
  })
}
const open4 = () => {
  createMessage({
    message: 'Oops, this is a error message.',
    type: 'danger'
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
