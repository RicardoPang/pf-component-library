<template>
  <button :class="buttonClasses" @click="handleClick" :disabled="disabled">
    <i v-if="icon" :class="`one-icon-${icon}`"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'default'
  },
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['click'])

const handleClick = (e: MouseEvent) => {
  emits('click', e)
}

const buttonClasses = computed(() => [
  'p-button',
  `p-button-${props.type}`,
  {
    'is-plain': props.plain,
    'is-round': props.round,
    'is-circle': props.circle,
    'is-disabled': props.disabled
  }
])
</script>

<style scoped></style>
