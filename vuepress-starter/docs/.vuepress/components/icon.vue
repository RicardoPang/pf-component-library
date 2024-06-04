<template>
  <i
    :class="`one-icon-${name}`"
    :style="{ fontSize: `${size}px`, color: color }"
  ></i>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    default: '',
    validator: (value) => {
      if (!value) {
        console.error('name is required')
        return false
      }
      return true
    }
  },
  size: {
    type: [String, Number],
    default: ''
  },
  color: {
    type: String,
    default: ''
  }
})
</script>

<style scoped></style>
