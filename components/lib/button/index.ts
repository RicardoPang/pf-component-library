import type { App } from 'vue'
import Button from './src/Button.vue'

const install = (app: App): void => {
  app.component(Button.name as string, Button)
}

export default {
  install
}
