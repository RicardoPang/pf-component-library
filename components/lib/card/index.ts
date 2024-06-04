import type { App } from 'vue'
import Card from './src/main.vue'

Card.name = 'PFCard'

const install = (app: App): void => {
  app.component(Card.name as string, Card)
}

export default {
  install
}
