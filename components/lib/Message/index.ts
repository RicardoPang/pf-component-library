import type { App } from 'vue'
import Message from './src/Message.vue'

const install = (app: App): void => {
  app.component(Message.name as string, Message)
}

export default {
  install
}
