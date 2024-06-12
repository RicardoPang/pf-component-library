import type { App } from 'vue'
import Tooltip from './src/Tooltip.vue'

const install = (app: App): void => {
  app.component(Tooltip.name as string, Tooltip)
}

export default {
  install
}
