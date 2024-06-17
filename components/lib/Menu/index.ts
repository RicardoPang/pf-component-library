import type { App } from 'vue'
import { ElMenu, ElSubMenu, ElMenuItem } from 'element-plus'
import Menu from './src/Menu.vue'
import InfiniteMenu from './src/menu'

const install = (app: App): void => {
  app.use(ElMenu)
  app.use(ElSubMenu)
  app.use(ElMenuItem)
  app.component(Menu.name as string, Menu)
  app.component(InfiniteMenu.name as string, InfiniteMenu)
}

export default {
  install
}
