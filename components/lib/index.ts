import type { App, Plugin } from 'vue'
import Card from './card'
import Demo from './demo'
import Button from './button'
import Icon from './icon'

export { default as Demo } from './demo'
export { default as Card } from './card'
export { default as Button } from './button'
export { default as Icon } from './icon'

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
  installComponents(app, { Card, Demo, Button, Icon })
}

export default {
  install
}
