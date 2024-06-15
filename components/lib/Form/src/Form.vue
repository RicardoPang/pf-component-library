<template>
  <form class="pf-form">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import type {
  FormContext,
  FormItemContext,
  FormProps,
  FormValidateFailure,
  FormInstance
} from './types'
import { formContextKey } from './types'
import type { ValidateFieldsError } from 'async-validator'

defineOptions({
  name: 'PfForm' // 组件名
})

const props = defineProps<FormProps>()
const fields: FormItemContext[] = [] // 存储注册的表单项

// 添加表单项
const addField: FormContext['addField'] = (field) => {
  fields.push(field)
}
// 移除表单项
const removeField: FormContext['removeField'] = (field) => {
  if (field.prop) {
    const index = fields.indexOf(field)
    if (index !== -1) fields.splice(index, 1) // 如果找到则移除
  }
}

// 对表单项执行操作的通用函数
const operateOnFields = (
  keys: string[],
  operation: (field: FormItemContext) => void
) => {
  fields
    .filter((field) => !keys.length || keys.includes(field.prop))
    .forEach(operation)
}
// 分别用于重置和清除表单项的验证状态
const resetFields = (keys: string[] = []) =>
  operateOnFields(keys, (field) => field.resetField())
const clearValidate = (keys: string[] = []) =>
  operateOnFields(keys, (field) => field.clearValidate())

// 异步验证所有表单项, 如果验证失败, 收集并返回所有验证错误
const validate = async () => {
  let validationErros: ValidateFieldsError = {}
  for (const field of fields) {
    try {
      await field.validate('')
    } catch (e) {
      const error = e as FormValidateFailure
      validationErros = { ...validationErros, ...error.fields }
    }
  }
  if (Object.keys(validationErros).length > 0) {
    return Promise.reject(validationErros)
  }
  return true
}

// 暴露给子组件
provide(formContextKey, {
  ...props,
  addField,
  removeField
})

// 暴露给父组件
defineExpose<FormInstance>({ validate, resetFields, clearValidate })
</script>
