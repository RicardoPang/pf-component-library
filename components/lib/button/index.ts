import type { App } from 'vue'
import Button from './src/main.vue'

Button.name = 'PFButton'

const install = (app: App): void => {
  app.component(Button.name as string, Button)
}

export default {
  install
}
