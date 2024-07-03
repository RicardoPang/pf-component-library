<template>
  <div
    class="pf-input"
    :class="{
      [`pf-input--${type}`]: type,
      [`pf-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocus
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <div v-if="$slots.prepend" class="pf-input__prepend">
        <!-- 前置插槽 -->
        <slot name="prepend" />
      </div>
      <div class="pf-input__wrapper">
        <span v-if="$slots.prefix" class="pf-input__prefix">
          <!-- 前缀插槽 -->
          <slot name="prefix" />
        </span>
        <input
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          class="pf-input__inner"
          ref="inputRef"
          v-bind="attrs"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          v-model="innerValue"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="pf-input__suffix"
          @click="keepFocus"
        >
          <!-- 后缀插槽 -->
          <slot name="suffix" />
          <pf-icon
            icon="circle-xmark"
            v-if="showClear"
            class="pf-input__clear"
            @click="clear"
            @mousedown.prevent="NOOP"
          />
          <pf-icon
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="pf-input__password"
            @click="togglePasswordVisible"
          />
          <pf-icon
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="pf-input__password"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <div v-if="$slots.append" class="pf-input__append">
        <slot name="append" />
      </div>
    </template>
    <!-- input end -->

    <!-- textarea -->
    <template v-else>
      <textarea
        class="pf-textarea__wrapper"
        v-bind="attrs"
        ref="inputRef"
        :disabled="disabled"
        :readonly="readonly"
        :autofocus="autofocus"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :form="form"
        v-model="innerValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />
    </template>
    <!-- textarea end -->
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, watch, inject, type Ref } from 'vue'
import type { InputEmits, InputProps } from './types'
import PfIcon from '../../Icon/src/Icon.vue'
import { formItemContextKey } from '../../Form/src/types'

defineOptions({
  name: 'PfInput',
  inheritAttrs: false
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  autocomplete: 'off'
})

const emits = defineEmits<InputEmits>()

const attrs = useAttrs() // 使用useAttrs获取非prop的attribute,绑定到输入元素上
const innerValue = ref(props.modelValue) // 组件内部使用的值, 用于双向绑定
const isFocus = ref(false) // 是否获得焦点
const passwordVisible = ref(false) // 是否显示密码
const inputRef = ref() as Ref<HTMLInputElement> // 输入元素的引用
const formItemContext = inject(formItemContextKey, null)

// 表单验证
const runValidation = (trigger?: string) => {
  formItemContext?.validate(trigger).catch((err) => console.error(err.errors))
}

// 是否显示清除按钮
const showClear = computed(
  () =>
    props.clearable && !props.disabled && !!innerValue.value && isFocus.value
)
// 是否显示密码切换按钮
const showPasswordArea = computed(
  () => props.showPassword && !props.disabled && !!innerValue.value
)

// 是否显示密码
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}
// 空操作函数
const NOOP = () => {}
// 聚焦
const keepFocus = async () => {
  await nextTick() // 等待下一个tick确保DOM更新
  inputRef.value.focus()
}
// 值变化
const handleInput = () => {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
  runValidation('input')
}
// 修改值并且失去了焦点
const handleChange = () => {
  emits('change', innerValue.value)
  runValidation('change')
}
const handleFocus = (e: FocusEvent) => {
  isFocus.value = true
  emits('focus', e)
}
const handleBlur = (e: FocusEvent) => {
  isFocus.value = false
  emits('blur', e)
  runValidation('blur')
}
// 清楚输入框内容
const clear = () => {
  innerValue.value = ''
  emits('update:modelValue', '')
  emits('clear')
  emits('input', '')
  emits('change', '')
}

// 监听modelValue的变化，更新组件内部的值
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue
  }
)

// 将inputRef暴露给父组件,让父组件可以访问输入元素
defineExpose({
  ref: inputRef
})
</script>
