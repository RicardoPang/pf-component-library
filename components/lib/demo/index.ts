import type { App } from 'vue'
import Demo from './src/main.vue'

Demo.name = 'PFDemo'

const install = (app: App): void => {
  app.component(Demo.name as string, Demo)
}

export default {
  install
}
