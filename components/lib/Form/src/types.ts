import type { InjectionKey } from 'vue'
import type {
  RuleItem,
  ValidateError,
  ValidateFieldsError
} from 'async-validator'

/**
 * 表单项属性接口
 * @interface FormItemProps
 */
export interface FormItemProps {
  /**
   * 表单项标签
   * @type {string}
   */
  label?: string

  /**
   * 表单项对应属性名
   * @type {string}
   */
  prop?: string

  /**
   * 表单项标签宽度
   */
  labelWidth?: number

  /**
   * 表单项标签位置
   */
  labelPosition?: 'left' | 'right'
}

/**
 * 表单项校验规则接口
 * @interface FormItemRule
 * @extends RuleItem
 */
export interface FormItemRule extends RuleItem {
  /**
   * 触发方式
   * @type {string}
   */
  trigger?: string
}

/**
 * 表单项校验规则类型
 * @typedef {Record<string, FormItemRule[]>} FormRules
 */
export type FormRules = Record<string, FormItemRule[]>

/**
 * 表单属性接口
 * @interface FormProps
 */
export interface FormProps {
  /**
   * 数据模型
   * @type {Record<string, any>}
   */
  model: Record<string, any>

  /**
   * 校验规则
   * @type {FormRules}
   */
  rules?: FormRules

  /**
   * 表单项标签宽度
   */
  labelWidth?: number

  /**
   * 表单项标签位置
   */
  labelPosition?: 'top' | 'left' | 'right'
}

/**
 * 表单上下文接口
 * @interface FormContext
 * @extends FormProps
 */
export interface FormContext extends FormProps {
  /**
   * 添加表单项
   * @param {FormItemContext} field 表单项上下文
   */
  addField: (field: FormItemContext) => void

  /**
   * 移除表单项
   * @param {FormItemContext} field 表单项上下文
   */
  removeField: (field: FormItemContext) => void
}

/**
 * 校验状态属性接口
 * @interface ValidateStatusProp
 */
export interface ValidateStatusProp {
  /**
   * 校验状态
   * @type {'init' | 'success' | 'error'}
   */
  state: 'init' | 'success' | 'error'

  /**
   * 错误信息
   * @type {string}
   */
  errorMsg?: string

  /**
   * 加载状态
   * @type {boolean}
   */
  loading?: boolean
}

/**
 * 表单项上下文接口
 * @interface FormItemContext
 */
export interface FormItemContext {
  /**
   * 表单项对应属性名
   * @type {string}
   */
  prop: string

  /**
   * 校验
   * @param {string} [trigger] 触发方式
   * @returns {Promise<any>} 校验结果的 Promise
   */
  validate: (trigger?: string) => Promise<any>

  /**
   * 重置
   */
  resetField: () => void

  /**
   * 清空
   */
  clearValidate: () => void
}

/**
 * 表单校验失败接口
 * @interface FormValidateFailure
 */
export interface FormValidateFailure {
  /**
   * 校验错误数组
   * @type {ValidateError[] | null}
   */
  errors: ValidateError[] | null

  /**
   * 校验错误字段
   * @type {ValidateFieldsError}
   */
  fields: ValidateFieldsError
}

/**
 * 表单实例接口
 * @interface FormInstance
 */
export interface FormInstance {
  /**
   * 校验所有表单项
   * @returns {Promise<any>} 校验结果的 Promise
   */
  validate: () => Promise<any>

  /**
   * 重置所有表单项
   * @param {string[]} [props] 要重置的属性名数组
   */
  resetFields: (props?: string[]) => void

  /**
   * 清空所有表单项
   * @param {string[]} [props] 要清空的属性名数组
   */
  clearValidate: (props?: string[]) => void
}

/**
 * 表单项实例接口
 * @interface FormItemInstance
 */
export interface FormItemInstance {
  /**
   * 校验状态
   * @type {ValidateStatusProp}
   */
  validateStatus: ValidateStatusProp

  /**
   * 校验
   * @param {string} [trigger] 触发方式
   * @returns {Promise<any>} 校验结果的 Promise
   */
  validate: (trigger?: string) => Promise<any>

  /**
   * 重置
   */
  resetField: () => void

  /**
   * 清空
   */
  clearValidate: () => void
}

/**
 * 表单上下文注入键
 * @type {InjectionKey<FormContext>}
 */
export const formContextKey: InjectionKey<FormContext> =
  Symbol('formContextKey')

/**
 * 表单项上下文注入键
 * @type {InjectionKey<FormItemContext>}
 */
export const formItemContextKey: InjectionKey<FormItemContext> =
  Symbol('formItemContextKey')
