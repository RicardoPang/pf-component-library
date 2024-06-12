import type { App, Plugin } from 'vue'
import Button from './Button'
import Collapse from './Collapse'
import Dropdown from './Dropdown'
import Icon from './Icon'
import Message from './Message'
import Tooltip from './Tooltip'

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
  installComponents(app, { Button, Collapse, Dropdown, Icon, Message, Tooltip })
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

export type * from './Button/src/types'
export type * from './Collapse/src/types'
export type * from './Dropdown/src/types'
export type * from './Icon/src/types'
export type * from './Message/src/types'
export type * from './Tooltip/src/types'

export * from './hooks/useZIndex'
export * from './hooks/useClickOutside'
export * from './hooks/useEventListener'
export * from './Common/RenderVnode'
export * from './Message/src/method'
