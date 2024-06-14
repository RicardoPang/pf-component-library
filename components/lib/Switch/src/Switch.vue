<template>
  <div
    class="pf-switch"
    :class="{
      [`pf-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked
    }"
    @click="switchValue"
  >
    <input
      class="pf-switch__input"
      type="checkbox"
      role="switch"
      ref="input"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    />
    <div class="pf-switch__core">
      <div class="pf-switch__core-inner">
        <span class="pf-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="pf-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { SwtichProps, SwtichEmits } from './types'

defineOptions({
  name: 'PfSwitch',
  inheritAttrs: false
})
const props = withDefaults(defineProps<SwtichProps>(), {
  activeValue: true,
  inactiveValue: false
})
const emits = defineEmits<SwtichEmits>()

const innerValue = ref(props.modelValue)
const input = ref<HTMLInputElement | null>(null)

// 是否被选中
const checked = computed(() => innerValue.value === props.activeValue)

// 切换开关
const switchValue = () => {
  if (props.disabled) return
  // 根据当前选中状态设置新的值
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newValue
  // 触发更新事件
  emits('update:modelValue', innerValue.value)
  emits('change', innerValue.value)
}

// 组件挂载后更新input的checked属性
onMounted(() => {
  input.value!.checked = checked.value
})

watch(checked, (val) => {
  input.value!.checked = val
})

watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue
  }
)
</script>
