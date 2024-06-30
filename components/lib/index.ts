import type { App, Plugin } from 'vue'
import Button from './Button'
import Collapse from './Collapse'
import Dropdown from './Dropdown'
import Icon from './Icon'
import Message from './Message'
import Tooltip from './Tooltip'
import Input from './Input'
import Switch from './Switch'
import Select from './Select'
import Form from './Form'
import VirtualScroll from './VirtualScroll'
import Tree from './Tree'

// 安裝函式
const installComponents = (
  app: App,
  components: Record<string, Plugin>
): void => {
  for (const key in components) {
    const component = components[key]
    app.use(component)
  }
}

// 安裝所有元件
const install = (app: App): void => {
  installComponents(app, {
    Button,
    Collapse,
    Dropdown,
    Icon,
    Message,
    Tooltip,
    Input,
    Switch,
    Select,
    Form,
    VirtualScroll,
    Tree
  })
}

export default {
  install
}

export { default as Button } from './Button'
export { default as Collapse } from './Collapse'
export { default as Dropdown } from './Dropdown'
export { default as Icon } from './Icon'
export { default as Message } from './Message'
export { default as Tooltip } from './Tooltip'
export { default as Input } from './Input'
export { default as Switch } from './Switch'
export { default as Select } from './Select'
export { default as Form } from './Form'
export { default as VirtualScroll } from './VirtualScroll'
export { default as Tree } from './Tree'

export type * from './Button/src/types'
export type * from './Collapse/src/types'
export type * from './Dropdown/src/types'
export type * from './Icon/src/types'
export type * from './Message/src/types'
export type * from './Tooltip/src/types'
export type * from './Input/src/types'
export type * from './Switch/src/types'
export type * from './Select/src/types'
export type * from './Form/src/types'
export type * from './VirtualScroll/src/types'
export type * from './Tree/src/types'

export * from './hooks/useZIndex'
export * from './hooks/useClickOutside'
export * from './hooks/useEventListener'
export * from './Common/RenderVnode'
export * from './Message/src/method'
