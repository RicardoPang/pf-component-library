<script setup>
import { h } from 'vue'
import { createMessage } from '@/components/lib/Message/src/method'
import PfButton from '@/components/lib/Button/src/Button.vue'
const open = () => {
  createMessage({ message: 'This is a message.' })
}

const openVn = () => {
  createMessage({
    message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ])
  })
}
</script>
<template>
  <div class="mb-4">
    <pf-button :plain="true" @click="open">Show message</pf-button>
    <pf-button :plain="true" @click="openVn">VNode</pf-button>
  </div>
</template>
