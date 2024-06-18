import type { App } from 'vue'
import Menu from './src/Menu.vue'
import InfiniteMenu from './src/menu'

const install = (app: App): void => {
  app.component(Menu.name as string, Menu)
  app.component(InfiniteMenu.name as string, InfiniteMenu)
}

export default {
  install
}
