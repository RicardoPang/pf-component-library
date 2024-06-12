import type { App } from 'vue'
import Collapse from './src/Collapse.vue'
import collapseItem from './src/CollapseItem.vue'

const install = (app: App): void => {
  app.component(Collapse.name as string, Collapse)
  app.component(collapseItem.name as string, collapseItem)
}

export default {
  install
}
