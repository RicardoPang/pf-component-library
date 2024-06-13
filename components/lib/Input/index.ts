import type { App } from 'vue'
import Input from './src/Input.vue'

const install = (app: App): void => {
  app.component(Input.name as string, Input)
}

export default {
  install
}
