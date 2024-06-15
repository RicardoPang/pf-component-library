<template>
  <div
    class="pf-select"
    :class="{ 'is-disabled': disabled }"
    @click="toggleDropdown"
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
  >
    <Tooltip
      placement="bottom-start"
      manual
      :popperOptions="popperOptions"
      @click-outside="controlDropdown(false)"
      ref="tooltipRef"
    >
      <Input
        ref="inputRef"
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="filteredPlaceholder"
        :readonly="!filterable || !isDropdownShow"
        @input="onFilter"
        @keydown="handleKeydown"
      >
        <template #suffix>
          <pf-icon
            icon="circle-xmark"
            v-if="showClearIcon"
            class="pf-input__clear"
            @mousedown.prevent="NOOP"
            @click.stop="onClear"
          />
          <pf-icon
            icon="angle-down"
            v-else
            class="header-angle"
            :class="{ 'is-active': isDropdownShow }"
          />
        </template>
      </Input>
      <template #content>
        <div class="pf-select__loading" v-if="states.loading">
          <pf-icon icon="fa-spinner" spin />
        </div>
        <ul class="pf-select__menu">
          <template v-for="(item, index) in filteredOptions" :key="item.value">
            <li
              class="pf-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
                'is-highlighted': states.highlightIndex === index
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <RenderVnode
                :vNode="renderLabel ? renderLabel(item) : item.label"
              />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch, type Ref } from 'vue'
import type {
  SelectProps,
  SelectEmits,
  SelectOption,
  SelectStates
} from './types'
import Tooltip from '../../Tooltip/src/Tooltip.vue'
import Input from '../../Input/src/Input.vue'
import PfIcon from '../../Icon/src/Icon.vue'
import RenderVnode from '../../Common/RenderVnode'
import type { TooltipInstance } from '../../Tooltip/src/types'
import type { InputInstance } from '../../Input/src/types'
import { isFunction, throttle } from 'lodash-es'

const findOption = (value: string) => {
  const option = props.options.find((item) => item.value === value)
  return option ? option : null
}

defineOptions({
  name: 'PfSelect',
  inheritAttrs: false
})

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => []
})
const emits = defineEmits<SelectEmits>()

const tooltipRef = ref() as Ref<TooltipInstance>
const inputRef = ref() as Ref<InputInstance>
const isDropdownShow = ref(false)
const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9]
      }
    },
    {
      name: 'sameWidth',
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`
      },
      phase: 'beforeWrite',
      requires: ['computeStyles']
    }
  ]
}
const filteredOptions = ref(props.options)
watch(
  () => props.options,
  (newOptions) => {
    filteredOptions.value = newOptions
  }
)
const generateFilterOptions = async (searchValue: string) => {
  if (!props.filterable) return
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchValue)
  } else if (
    props.remote &&
    props.remoteMethod &&
    isFunction(props.remoteMethod)
  ) {
    states.loading = true
    try {
      filteredOptions.value = await props.remoteMethod(searchValue)
    } catch (e) {
      console.error(e)
      filteredOptions.value = []
    } finally {
      states.loading = false
    }
  } else {
    filteredOptions.value = props.options.filter((option) =>
      option.label.includes(searchValue)
    )
  }
  states.highlightIndex = -1
}
// 函数节流
const throttledGenerateFilterOptions = throttle(generateFilterOptions, 300)
const onFilter = () => {
  throttledGenerateFilterOptions(states.inputValue)
}
const initialOption = findOption(props.modelValue)
const states = reactive<SelectStates>({
  inputValue: initialOption?.label ?? '',
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightIndex: -1
})
// 当将props的值作为初始值传入给一个响应式对象时,一定要watch原始值的修改,然后更新本地的响应式对象
watch(
  () => props.modelValue,
  (newValue) => {
    if (initialOption) {
      initialOption.value = newValue
    }
  }
)

const filteredPlaceholder = computed(() => {
  return props.filterable && states.selectedOption && isDropdownShow.value
    ? states.selectedOption.label
    : props.placeholder
})

const controlDropdown = (show: boolean) => {
  if (show) {
    // filter模式, 之前有选择过值
    if (props.filterable && states.selectedOption) {
      states.inputValue = ''
    }
    if (props.filterable) {
      throttledGenerateFilterOptions(states.inputValue)
    }
    tooltipRef.value.show()
  } else {
    tooltipRef.value.hide()
    // blur 将之前的值回填到input中
    if (props.filterable) {
      states.inputValue = states.selectedOption
        ? states.selectedOption.label
        : ''
    }
    states.highlightIndex = -1
  }
  isDropdownShow.value = show
  emits('visible-change', show)
}

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
      if (!isDropdownShow.value) {
        controlDropdown(true)
      } else {
        if (
          states.highlightIndex > -1 &&
          filteredOptions.value[states.highlightIndex]
        ) {
          itemSelect(filteredOptions.value[states.highlightIndex])
        } else {
          controlDropdown(false)
        }
      }
      break
    case 'Escape':
      if (isDropdownShow.value) {
        controlDropdown(false)
      }
      break
    case 'ArrowDown':
      e.preventDefault()
      if (filteredOptions.value.length > 0) {
        if (
          states.highlightIndex === -1 ||
          states.highlightIndex === filteredOptions.value.length - 1
        ) {
          states.highlightIndex = 0
        } else {
          // move down
          states.highlightIndex++
        }
      }
      break
    case 'ArrowUp':
      e.preventDefault()
      if (filteredOptions.value.length > 0) {
        if (states.highlightIndex === -1 || states.highlightIndex === 0) {
          states.highlightIndex = filteredOptions.value.length - 1
        } else {
          // move up
          states.highlightIndex--
        }
      }
      break
    default:
      break
  }
}

const showClearIcon = computed(() => {
  // hover, props.clearable为true, 必须要有选择过选项, Input值不为空
  return (
    props.clearable &&
    states.mouseHover &&
    states.selectedOption &&
    states.inputValue.trim() !== ''
  )
})

const onClear = () => {
  states.selectedOption = null
  states.inputValue = ''
  emits('clear')
  emits('change', '')
  emits('update:modelValue', '')
}

const NOOP = () => {}

const toggleDropdown = () => {
  if (props.disabled) return
  if (isDropdownShow.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}

const itemSelect = (e: SelectOption) => {
  if (e.disabled) return
  states.inputValue = e.label
  states.selectedOption = e
  emits('change', e.value)
  // 为了支持 v-model
  emits('update:modelValue', e.value)
  controlDropdown(false)
  inputRef.value.ref.focus()
}
</script>
