import type { App } from 'vue'
import Switch from './src/Switch.vue'

const install = (app: App): void => {
  app.component(Switch.name as string, Switch)
}

export default {
  install
}
