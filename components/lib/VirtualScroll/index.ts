import type { App } from 'vue'
import VirtualScroll from './src/VirtualScroll.vue'

const install = (app: App): void => {
  app.component(VirtualScroll.name as string, VirtualScroll)
}

export default {
  install
}
