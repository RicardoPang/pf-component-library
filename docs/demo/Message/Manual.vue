<script setup>
import { createMessage, closeAll } from '@/components/lib/Message/src/method'
import PfButton from '@/components/lib/Button/src/Button.vue'
const open = () => {
  createMessage({ message: 'This is a message.' })
}

const close = () => {
  closeAll()
}
</script>
<template>
  <div class="mb-4">
    <pf-button :plain="true" @click="open">Show message</pf-button>
    <pf-button :plain="true" @click="close">Close all</pf-button>
  </div>
</template>
