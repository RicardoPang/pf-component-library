import type { App } from 'vue'
import Dropdown from './src/Dropdown.vue'

const install = (app: App): void => {
  app.component(Dropdown.name as string, Dropdown)
}

export default {
  install
}
