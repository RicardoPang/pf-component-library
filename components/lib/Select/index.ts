import type { App } from 'vue'
import Select from './src/Select.vue'

const install = (app: App): void => {
  app.component(Select.name as string, Select)
}

export default {
  install
}
