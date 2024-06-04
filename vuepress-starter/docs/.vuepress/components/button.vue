<template>
  <button
    class="p-button"
    :class="[
      `p-button-${type}`,
      {
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled
      }
    ]"
    @click="handleClick"
    :disabled="disabled"
  >
    <i v-if="icon" :class="`one-icon-${icon}`"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script setup lang="ts">
defineProps({
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
</script>

<style scoped lang="less">
@import './button.less';

// markdown样式
:deep(.row-btns) {
  margin: 10px !important;
}

.row-btns > button {
  margin-right: 10px;
}
</style>
