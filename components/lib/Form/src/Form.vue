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

/**
 * 提供model属性接收对象, 对象每个属性跟表单内el-form-item组件中的v-model双向绑定
 * 不提供元素监听事件, 为表单提交和重置提供更多控制能力
 * <pf-button @click.prevent="submit" type="primary">Submit</pf-button>
 * <pf-button @click.prevent="reset">Reset</pf-button>
 */
const props = withDefaults(defineProps<FormProps>(), {
  labelWidth: 80,
  labelPosition: 'right'
})

const fields: FormItemContext[] = [] // 存储注册的表单项

/**
 * 添加表单项
 * @param {FormItemContext} field - 表单项上下文
 */
const addField: FormContext['addField'] = (field) => {
  fields.push(field)
}

/**
 * 移除表单项
 * @param {FormItemContext} field - 表单项上下文
 */
const removeField: FormContext['removeField'] = (field) => {
  if (field.prop) {
    const index = fields.indexOf(field)
    if (index !== -1) fields.splice(index, 1) // 如果找到则移除
  }
}

/**
 * 对表单项执行操作的通用函数
 * @param {string[]} keys - 表单项的键
 * @param {function} operation - 操作函数
 */
const operateOnFields = (
  keys: string[],
  operation: (field: FormItemContext) => void
) => {
  fields
    .filter((field) => !keys.length || keys.includes(field.prop))
    .forEach(operation)
}

/**
 * 重置表单项
 * @param {string[]} [keys=[]] - 需要重置的表单项的键
 */
const resetFields = (keys: string[] = []) =>
  operateOnFields(keys, (field) => field.resetField())

/**
 * 清除表单项的验证状态
 * @param {string[]} [keys=[]] - 需要清除验证状态的表单项的键
 */
const clearValidate = (keys: string[] = []) =>
  operateOnFields(keys, (field) => field.clearValidate())

/**
 * 异步验证所有表单项
 * @returns {Promise<boolean | ValidateFieldsError>} - 验证通过返回 true, 否则返回错误信息
 */
const validate = async (trigger?: string) => {
  let validationErros: ValidateFieldsError = {}
  for (const field of fields) {
    try {
      await field.validate(trigger)
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
