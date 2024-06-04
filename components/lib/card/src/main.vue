<template>
  <div class="p-card" :style="cardStyle">
    <div class="p-card-img" :style="imgStyle">
      <img :src="imgSrc" alt="img" />
    </div>
    <div class="p-card-summary">
      <slot>{{ summary }}</slot>
    </div>
    <div class="p-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  width: {
    type: Number,
    default: 0
  },
  imgSrc: {
    type: String,
    default: '',
    validator: (value) => {
      if (!value) {
        console.error('imgSrc is required')
        return false
      }
      return true
    }
  },
  imgHeight: {
    type: Number,
    default: 0
  },
  summary: {
    type: String,
    default: ''
  }
})

const cardStyle = computed(() => {
  return props.width ? { width: `${props.width}px` } : {}
})

const imgStyle = computed(() => {
  return props.imgHeight ? { height: `${props.imgHeight}px` } : {}
})
</script>

<style scoped></style>
