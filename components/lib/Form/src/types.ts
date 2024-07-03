import type { InjectionKey } from 'vue'
import type {
  RuleItem,
  ValidateError,
  ValidateFieldsError
} from 'async-validator'

export interface FormItemProps {
  label?: string // 表单项标签
  prop?: string // 表单项对应属性名
}

export interface FormItemRule extends RuleItem {
  trigger?: string // 触发方式
}
export type FormRules = Record<string, FormItemRule[]> // 表单项校验规则

export interface FormProps {
  model: Record<string, any> // 数据模型
  rules?: FormRules // 校验规则
}

export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void // 添加表单项
  removeField: (field: FormItemContext) => void // 移除表单项
}

export interface ValidateStatusProp {
  state: 'init' | 'success' | 'error' // 校验状态
  errorMsg?: string // 错误信息
  loading?: boolean // 加载状态
}

export interface FormItemContext {
  prop: string // 表单项对应属性名
  validate: (trigger?: string) => Promise<any> // 校验
  resetField: () => void // 重置
  clearValidate: () => void // 清空
}

export interface FormValidateFailure {
  errors: ValidateError[] | null // 校验错误数组
  fields: ValidateFieldsError // 校验错误字段
}

export interface FormInstance {
  validate: () => Promise<any> // 校验所有表单项
  resetFields: (props?: string[]) => void // 重置所有表单项
  clearValidate: (props?: string[]) => void // 清空所有表单项
}

export interface FormItemInstance {
  validateStatus: ValidateStatusProp // 校验状态
  validate: (trigger?: string) => Promise<any> // 校验
  resetField: () => void // 重置
  clearValidate: () => void // 清空
}

export const formContextKey: InjectionKey<FormContext> =
  Symbol('formContextKey') // 创建表单上下文注入键
export const formItemContextKey: InjectionKey<FormItemContext> =
  Symbol('formItemContextKey') // 创建表单项上下文注入键
